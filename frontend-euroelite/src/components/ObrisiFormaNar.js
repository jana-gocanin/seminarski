import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteNarudzbenica } from "../store/reducers/narudzbenicaSlice";
import "./ObrisiFormaNar.css";

const ObrisiFormaNar = () => {
  const dispatch = useDispatch();
  const [brojNarudzbenice, setBrojNarudzbenice] = useState("");
  const [datumNarudzbenice, setDatumNarudzbenice] = useState("");
  const [ziroRacun, setZiroRacun] = useState("");
  const [nacinOtpreme, setNacinOtpreme] = useState("");
  const [rokIsporuke, setRokIsporuke] = useState("");
  const [dobavljac, setDobavljac] = useState("");
  const [pretraziBroj, setPretraziBroj] = useState("");
  const [ukupnoZaUplatu, setUkupnoZaUplatu] = useState("");
  const [stavke, setStavke] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the deleteNarudzbenica action
    dispatch(deleteNarudzbenica());
    // Reset form fields and stavke narudzbenice
    setBrojNarudzbenice("");
    setDatumNarudzbenice("");
    setZiroRacun("");
    setNacinOtpreme("");
    setRokIsporuke("");
    setDobavljac("");
    setPretraziBroj("");
    setUkupnoZaUplatu("");
    setStavke([]);
  };

  return (
    <form onSubmit={handleSubmit} className="obrisi-forma">
      <h2>Brisanje narudzbenice</h2>
      <div className="form-row">
        <div className="form-group">
          <label>Pretrazi po broju:</label>
          <input
            type="text"
            value={pretraziBroj}
            onChange={(e) => setPretraziBroj(e.target.value)}
          />
        </div>
        <button type="button" className="pretrazi-button">
          Pretraži
        </button>
        <div className="form-group">
          <label>Datum:</label>
          <input
            type="date"
            value={datumNarudzbenice}
            className="readonly-input"
            readOnly
            onChange={(e) => setDatumNarudzbenice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Žiro račun:</label>
          <input
            type="text"
            value={ziroRacun}
            readOnly
            className="readonly-input"
            onChange={(e) => setZiroRacun(e.target.value)}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Nacin otpreme:</label>
          <select
            value={nacinOtpreme}
            readOnly
            className="readonly-input"
            onChange={(e) => setNacinOtpreme(e.target.value)}
          >
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
            readOnly
            className="readonly-input"
            onChange={(e) => setRokIsporuke(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Dobavljac:</label>
          <input
            type="text"
            value={dobavljac}
            onChange={(e) => setDobavljac(e.target.value)}
            readOnly
            className="readonly-input"
          />
        </div>
        <div className="form-group">
          <label>Za uplatu:</label>
          <input
            type="text"
            value={ukupnoZaUplatu}
            onChange={(e) => setUkupnoZaUplatu(e.target.value)}
            readOnly
            className="readonly-input"
          />
        </div>
      </div>
      <div className="stavke-table-container">
        <table className="stavke-table">
          <thead>
            <tr>
              <th>Broj</th>
              <th>Naziv</th>
              <th>Količina</th>
              <th>Vrednost</th>
              <th>Jedinica mere</th>
            </tr>
          </thead>
          <tbody>
            {stavke.map((stavka, index) => (
              <tr key={index}>
                <td>{stavka.broj}</td>
                <td>{stavka.naziv}</td>
                <td>{stavka.kolicina}</td>
                <td>{stavka.vrednost}</td>
                <td>{stavka.jedinicaMere}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button type="submit" className="obrisi-button">
        Obriši Narudžbenicu
      </button>
    </form>
  );
};

export default ObrisiFormaNar;
