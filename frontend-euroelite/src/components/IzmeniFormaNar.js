import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import DodajStavkuForma from "./DodajStavkuForma";
import {
  setBrojNarudzbenice,
  setDatumNarudzbenice,
  setZiroRacun,
  setNacinOtpreme,
  setRokIsporuke,
  setUnosDobavljaca,
  setDobavljac,
  setDobavljaci,
  addStavka,
  removeStavka,
  updateStavka,
} from "../store/reducers/narudzbenicaSlice";
import "./KreirajFormaNar.css";

const KreirajFormaNar = () => {
  const dispatch = useDispatch();
  const {
    brojNarudzbenice,
    datumNarudzbenice,
    ziroRacun,
    nacinOtpreme,
    rokIsporuke,
    unosDobavljaca,
    dobavljac,
    dobavljaci,
    stavke,
  } = useSelector((state) => state.narudzbenica);

  const handleBrojNarudzbeniceChange = (e) => {
    dispatch(setBrojNarudzbenice(e.target.value));
  };

  const handleDatumNarudzbeniceChange = (e) => {
    dispatch(setDatumNarudzbenice(e.target.value));
  };

  const handleZiroRacunChange = (e) => {
    dispatch(setZiroRacun(e.target.value));
  };

  const handleNacinOtpremeChange = (e) => {
    dispatch(setNacinOtpreme(e.target.value));
  };

  const handleRokIsporukeChange = (e) => {
    dispatch(setRokIsporuke(e.target.value));
  };

  const handleUnosDobavljacaChange = (e) => {
    dispatch(setUnosDobavljaca(e.target.value));
  };

  const handleIzaberiDobavljacaClick = () => {
    // Logika za pronalaženje i postavljanje dobavljača
    const selectedDobavljac = {}; // Dobavljač koji je odabran
    dispatch(setDobavljac(selectedDobavljac));
  };

  const handleIzaberiDobavljacaTableClick = (dobavljac) => {
    dispatch(setDobavljac(dobavljac));
  };

  const handleObrisiStavku = (index) => {
    dispatch(removeStavka(index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logika za slanje podataka na server
    // Resetovanje polja forme
    dispatch(setBrojNarudzbenice(""));
    dispatch(setDatumNarudzbenice(""));
    dispatch(setZiroRacun(""));
    dispatch(setNacinOtpreme(""));
    dispatch(setRokIsporuke(""));
    dispatch(setUnosDobavljaca(""));
    dispatch(setDobavljac(null));
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Izmena narudzbenice</h2>
      <div className="form-row">
        <div className="form-group">
          <label>Broj narudžbenice:</label>
          <input
            type="text"
            value={brojNarudzbenice}
            onChange={handleBrojNarudzbeniceChange}
          />
        </div>
        <div className="form-group">
          <label>Datum narudžbenice:</label>
          <input
            type="date"
            value={datumNarudzbenice}
            onChange={handleDatumNarudzbeniceChange}
          />
        </div>
        <div className="form-group">
          <label>Žiro račun:</label>
          <input
            type="text"
            value={ziroRacun}
            onChange={handleZiroRacunChange}
          />
        </div>
        <div className="form-group">
          <label>Nacin otpreme:</label>
          <select value={nacinOtpreme} onChange={handleNacinOtpremeChange}>
            <option value="">Odaberite nacin otpreme</option>
            <option value="opcija1">Opcija 1</option>
            <option value="opcija2">Opcija 2</option>
            <option value="opcija3">Opcija 3</option>
          </select>
        </div>
        <div className="form-group">
          <label>Rok isporuke:</label>
          <input
            type="date"
            value={rokIsporuke}
            onChange={handleRokIsporukeChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Unos dobavljaca:</label>
        <input
          type="text"
          value={unosDobavljaca}
          onChange={handleUnosDobavljacaChange}
        />
        <button
          type="button"
          onClick={handleIzaberiDobavljacaClick}
          //   className="pronadji-dobavljaca-button"
        >
          Pronadji dobavljaca
        </button>
      </div>
      {dobavljac && (
        <div>
          <p>Izabrani dobavljac: {dobavljac.naziv}</p>
          {/* Ovdje možete prikazati dodatne informacije o dobavljacu */}
        </div>
      )}
      {dobavljaci.length > 0 && (
        <div className="dobavljac-table-container">
          <table className="dobavljac-table">
            <thead>
              <tr>
                <th>Naziv</th>
                <th>OIB</th>
              </tr>
            </thead>
            <tbody>
              {dobavljaci.map((dobavljac) => (
                <tr
                  key={dobavljac.id}
                  onClick={() => handleIzaberiDobavljacaTableClick(dobavljac)}
                  className={dobavljac === dobavljac ? "selected" : ""}
                >
                  <td>{dobavljac.naziv}</td>
                  <td>{dobavljac.oib}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            onClick={() => handleIzaberiDobavljacaTableClick(dobavljac)}
            className="izaberi-dobavljaca-button"
          >
            Izaberi dobavljaca
          </button>
        </div>
      )}
      <DodajStavkuForma />
      {stavke.length > 0 && (
        <div className="stavke-table-container">
          <h2>Stavke narudžbenice</h2>
          <table className="stavke-table">
            <thead>
              <tr>
                <th>Proizvod</th>
                <th>Količina</th>
                <th>Akcije</th>
              </tr>
            </thead>
            <tbody>
              {stavke.map((stavka, index) => (
                <tr key={index}>
                  <td>{stavka.proizvod}</td>
                  <td>{stavka.kolicina}</td>
                  <td>
                    <button type="button">Izmeni</button>
                    <button
                      type="button"
                      onClick={() => handleObrisiStavku(index)}
                    >
                      Obriši
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button type="submit" className="potvrdi-button">
        Potvrdi
      </button>
    </form>
  );
};

export default KreirajFormaNar;
