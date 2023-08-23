import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./ObrisiFormaNar.css";
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
  deleteNarudzbenica,
  setStavke,
} from "../store/reducers/narudzbenicaSlice";
import { deleteStavke } from "../store/reducers/stavkaNarudzbeniceSlice";

const ObrisiFormaNar = () => {
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
    // deleteNarudzbenica,
  } = useSelector((state) => state.narudzbenica);
  const { ukupanIznos } = useSelector((state) => state.narudzbenica);
  const [searchInput, setSearchInput] = useState("");
  const [showSelectionMessage, setShowSelectionMessage] = useState(false);

  const [searchError, setSearchError] = useState("");

  // Function to reset the error message
  const resetSearchError = () => {
    setSearchError("");
  };

  useEffect(() => {
    if (showSelectionMessage) {
      setShowSelectionMessage(true);
      const timer = setTimeout(() => {
        setShowSelectionMessage(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSelectionMessage]);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    // Reset the form by dispatching necessary actions
    // dispatch(setBrojNarudzbenice(""));
    // dispatch(setDatumNarudzbenice(""));
    // dispatch(setZiroRacun(""));
    // dispatch(setNacinOtpreme(""));
    // dispatch(setRokIsporuke(""));
    // dispatch(setUnosDobavljaca(""));
    // dispatch(setDobavljac(""));
    // dispatch(setDobavljaci([]));
    dispatch(deleteNarudzbenica());
    dispatch(deleteStavke());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.delete(
        `http://localhost:8000/api/narudzbenice/obrisi-narudzbenicu`,
        { data: { brojNarudzbenice: searchInput } }
      );

      setShowSelectionMessage(true);
      setSearchInput("");
      dispatch(deleteNarudzbenica());
      dispatch(deleteStavke());
    } catch (error) {
      console.error("Error deleting narudzbenica:", error);
    }
  };

  const handleSearchNarudzbenice = async () => {
    try {
      resetSearchError();

      const response = await axios.post(
        `http://localhost:8000/api/narudzbenice/pronadji`,
        { brojNarudzbenice: searchInput }
      );

      const searchedNarudzbenica = response.data;

      if (searchedNarudzbenica) {
        dispatch(setBrojNarudzbenice(searchedNarudzbenica.id));
        dispatch(setDatumNarudzbenice(searchedNarudzbenica.datum));
        dispatch(setZiroRacun(searchedNarudzbenica.ziro_racun));
        dispatch(
          setNacinOtpreme(searchedNarudzbenica.nacin_otpreme.naziv_nacina)
        );
        dispatch(setRokIsporuke(searchedNarudzbenica.rok));
        dispatch(setUnosDobavljaca(""));
        dispatch(setDobavljac(searchedNarudzbenica.dobavljac.naziv_dobavljaca));
        dispatch(setDobavljaci([]));

        if (
          searchedNarudzbenica.stavke &&
          searchedNarudzbenica.stavke.length > 0
        ) {
          dispatch(
            setStavke(
              searchedNarudzbenica.stavke
            )
          );
        }
      } else {
        setSearchError("Narudžbenica sa datim brojem nije pronađena.");
      }
    } catch (error) {
      setSearchError("Narudzbenica ne postoji!", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="obrisi-forma">
      <h2>Brisanje narudzbenice</h2>
      <div className="form-row">
        <div className="form-group">
          <label>Pretrazi po broju:</label>
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
        </div>
        <button
          type="button"
          className="pretrazi-button"
          onClick={handleSearchNarudzbenice}
        >
          Pretraži
        </button>
        <div className="form-group">
          <label>Datum:</label>
          <input
            type="date"
            value={datumNarudzbenice}
            className="readonly-input"
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Žiro račun:</label>
          <input
            type="text"
            value={ziroRacun}
            readOnly
            className="readonly-input"
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Nacin otpreme:</label>
          <input
            type="text"
            value={nacinOtpreme}
            readOnly
            className="readonly-input"
          />
        </div>
        <div className="form-group">
          <label>Rok isporuke:</label>
          <input
            type="date"
            value={rokIsporuke}
            readOnly
            className="readonly-input"
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
            value={ukupanIznos}
            readOnly
            className="readonly-input"
          />
        </div>
      </div>
      {searchError && <p className="error-message">{searchError}</p>}
      <div className="stavke-table-container">
        <table className="stavke-table">
          <thead>
            <tr>
              <th>Broj</th>
              <th>Naziv</th>
              <th>Količina</th>
              <th>Vrednost</th>
            </tr>
          </thead>
          <tbody>
            {stavke.map((stavka, index) => (
              <tr key={index}>
                <td>{stavka.id}</td>
                <td>{stavka.proizvod.naziv_proizvoda}</td>
                <td>{stavka.kolicina}</td>
                <td>{stavka.iznos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="submit"
        className="obrisi-button"
        // onClick={handleDeleteNarudzbenica}
      >
        Obriši Narudžbenicu
      </button>
      {showSelectionMessage && (
        <p className="selection-message">Narudzbenica je obrisana!</p>
      )}
    </form>
  );
};

export default ObrisiFormaNar;
