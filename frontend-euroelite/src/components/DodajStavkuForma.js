import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addStavka } from "../store/reducers/narudzbenicaSlice";
import "./DodajStavkuForma.css";

const DodajStavkuForma = () => {
  const dispatch = useDispatch();
  const [proizvod, setProizvod] = useState("");
  const [kolicina, setKolicina] = useState("");

  const proizvodi = [
    { sifra: 1, naziv: "Proizvod 1" },
    { sifra: 2, naziv: "Proizvod 2" },
    { sifra: 3, naziv: "Proizvod 3" },
  ];

  const handleProizvodChange = (e) => {
    setProizvod(e.target.value);
  };

  const handleKolicinaChange = (e) => {
    setKolicina(e.target.value);
  };

  const handleDodajStavku = () => {
    const novaStavka = {
      proizvod: proizvod,
      kolicina: kolicina,
    };
    dispatch(addStavka(novaStavka));
    setProizvod("");
    setKolicina("");
  };

  const handleIzaberiProizvod = (proizvod) => {
    // Logic for handling the selection of a product
  };

  return (
    <div className="stavke-container">
      <h2>Dodavanje stavki</h2>
      <div className="form-row">
        <div className="form-group">
          <label>Proizvod:</label>
          <input type="text" value={proizvod} onChange={handleProizvodChange} />
        </div>
        <div className="form-group">
          <label>Količina:</label>
          <input type="text" value={kolicina} onChange={handleKolicinaChange} />
        </div>
      </div>
      {proizvodi.length > 0 && (
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
              {proizvodi.map((proizvod) => (
                <tr key={proizvod.sifra}>
                  <td>{proizvod.sifra}</td>
                  <td>{proizvod.naziv}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleIzaberiProizvod(proizvod)}
                    >
                      Izaberi
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div>
        <button type="button" onClick={handleDodajStavku}>
          Dodaj stavku
        </button>
      </div>
    </div>
  );
};

export default DodajStavkuForma;
