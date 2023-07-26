import React, { useState } from "react";
import { BASE_URL } from "../config/apiConfig";
import { useDispatch, useSelector } from "react-redux";
import { addStavka } from "../store/reducers/narudzbenicaSlice";
import "./DodajStavkuForma.css";
import {
  setProizvod,
  setKolicina,
  setIzabraniProizvod,
} from "../store/reducers/stavkaNarudzbeniceSlice";

const DodajStavkuForma = () => {
  const dispatch = useDispatch();
  const { proizvod, kolicina, izabraniProizvod } = useSelector(
    (state) => state.stavkaNarudzbenice
  );
  const proizvodi = useSelector((state) => state.narudzbenica.proizvodi);
  const brojNarudzbenice = useSelector(
    (state) => state.narudzbenica.brojNarudzbenice
  );

  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState("");

  const handleProizvodChange = (e) => {
    dispatch(setProizvod(e.target.value));
  };

  const handleKolicinaChange = (e) => {
    dispatch(setKolicina(e.target.value));
  };

  // const handleDodajStavku = () => {
  //   const novaStavka = {
  //     proizvod: proizvod,
  //     kolicina: kolicina,
  //   };
  //   dispatch(addStavka(novaStavka));
  //   dispatch(setIzabraniProizvod(null)); //resetujem
  //   setProizvod("");
  //   setKolicina("");
  // };
  const handleDodajStavku = async () => {
    if (!izabraniProizvod || !kolicina) {
      setError("Molimo unesite proizvod i količinu.");
      return;
    }

    try {
      const novaStavka = {
        proizvod_id: izabraniProizvod.id,
        kolicina: kolicina,
        brojNarudzbenice: brojNarudzbenice,
      };

      const response = await fetch(`${BASE_URL}/proizvodi/dodaj-stavku`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novaStavka),
      });

      if (!response.ok) {
        console.error("Error:", response.statusText);
        return;
      }

      const responseData = await response.json();

      // Extract the stavka and proizvod data from the response
      const { stavka, proizvod } = responseData;

      // Dispatch the action to add stavka to the Redux store
      dispatch(addStavka(stavka));

      // Set izabraniProizvod to null in Redux store
      dispatch(setIzabraniProizvod(null));
      setProizvod(proizvod);
      setKolicina("");
      setError("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleIzaberiProizvod = (proizvod) => {
    dispatch(setIzabraniProizvod(proizvod));
  };

  const handlePronadjiProizvode = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/proizvodi/pronadji/${proizvod}`, // Zamijenite BASE_URL sa stvarnom baznom URL adresom vaše API rute
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error("Error:", response.statusText);
        return;
      }

      const data = await response.json();
      setSearchResult(data); // Postavi rezultat pretrage u stanje
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleIzaberiProizvodDetalji = async (proizvod) => {
    try {
      const response = await fetch(
        `${BASE_URL}/proizvodi/izaberi/${proizvod.id}`
      );
      if (!response.ok) {
        console.error("Error:", response.statusText);
        return;
      }

      const detaljiProizvoda = await response.json();
      dispatch(setIzabraniProizvod(detaljiProizvoda));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="stavke-container">
      <h2>Dodavanje stavki</h2>
      <div className="form-row">
        <div className="form-group">
          <label>Proizvod:</label>
          <input type="text" value={proizvod} onChange={handleProizvodChange} />
        </div>
        <button type="button" onClick={handlePronadjiProizvode}>
          Pronadji proizvod
        </button>
        <div className="form-group">
          <label>Količina:</label>
          <input type="text" value={kolicina} onChange={handleKolicinaChange} />
        </div>
      </div>
      {searchResult.length > 0 && (
        <div className="proizvodi-table-container">
          <h3>Odaberite proizvod:</h3>
          <table className="proizvodi-table">
            <thead>
              <tr>
                <th>Šifra proizvoda</th>
                <th>Naziv proizvoda</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {searchResult.map((proizvod) => (
                <tr
                  key={proizvod.id}
                  onClick={() => handleIzaberiProizvod(proizvod)}
                  className={proizvod === izabraniProizvod ? "selected" : ""} // Ovde proveravamo da li je trenutni proizvod izabran
                >
                  <td>{proizvod.id}</td>
                  <td>{proizvod.naziv_proizvoda}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {izabraniProizvod && ( // Ako postoji izabrani proizvod, prikazujemo detalje
          <div className="izabrani-proizvod-container">
            <h3>Detalji izabranog proizvoda:</h3>
            <p>Šifra: {izabraniProizvod.id}</p>
            <p>Naziv: {izabraniProizvod.naziv_proizvoda}</p>
            <p>Opis: {izabraniProizvod.opis}</p>
          </div>
        ) && (
          <button
            type="button"
            onClick={() => handleIzaberiProizvodDetalji(izabraniProizvod)}
          >
            Izaberi proizvod
          </button>
        )}
      {error && <p className="error-message">{error}</p>}
      {error && <p className="error-message">{error}</p>}
      <div>
        <button type="button" onClick={handleDodajStavku}>
          Dodaj stavku
        </button>
      </div>
    </div>
  );
};

export default DodajStavkuForma;
