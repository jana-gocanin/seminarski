import React, { useState, useEffect } from "react";
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
  const [error, setError] = useState(null);
  const [showSelectionMessage, setShowSelectionMessage] = useState(false);

  useEffect(() => {
    // Show the selection message for 2 seconds after izabraniProizvod changes
    if (showSelectionMessage) {
      setShowSelectionMessage(true);
      const timer = setTimeout(() => {
        setShowSelectionMessage(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSelectionMessage]);

  const handleProizvodChange = (e) => {
    dispatch(setProizvod(e.target.value));
    setError(null);
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

      const { stavka, proizvod } = responseData;

      dispatch(addStavka(stavka));

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
        `${BASE_URL}/proizvodi/pronadji/${proizvod}`,
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
      if (data.length === 0) {
        setError("Nije pronadjen proizvod");
        return;
      }
      setSearchResult(data); // Postavi rezultat pretrage u stanje
    } catch (error) {
      setError("Error:", error);
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
                <th>Šifra</th>
                <th>Naziv</th>
                <th>Cena</th>
              </tr>
            </thead>
            <tbody>
              {searchResult.map((proizvod) => (
                <tr
                  key={proizvod.id}
                  onClick={() => {
                    handleIzaberiProizvod(proizvod);
                  }}
                  className={proizvod === izabraniProizvod ? "selected" : ""} 
                >
                  <td>{proizvod.id}</td>
                  <td>{proizvod.naziv_proizvoda}</td>
                  <td>{proizvod.nabavna_cena}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {izabraniProizvod && (
        <>
          <div className="izabrani-proizvod-container">
            <h3>Detalji izabranog proizvoda:</h3>
            <p>Šifra: {izabraniProizvod.id}</p>
            <p>Naziv: {izabraniProizvod.naziv_proizvoda}</p>
            <p>Opis: {izabraniProizvod.opis}</p>
            <p>Cena: {izabraniProizvod.nabavna_cena} dinara</p>
          </div>
          <button
            type="button"
            onClick={() => {
              handleIzaberiProizvodDetalji(izabraniProizvod);
              setShowSelectionMessage(true); 
            }}
          >
            Izaberi proizvod
          </button>
        </>
      )}
      {showSelectionMessage && (
        <p className="selection-message">Proizvod je uspešno izabran!</p>
      )}
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
