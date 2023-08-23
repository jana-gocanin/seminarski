import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNaciniOtpreme,
  setBrojNacinaOtpreme,
} from "../store/reducers/nacinOtpremeSlice";
import "./KreirajNacinOtpreme.css";
import { setNacinOtpreme } from "../store/reducers/nacinOtpremeSlice";
import { BASE_URL } from "../config/apiConfig";

const KreirajNacinOtpreme = () => {
  const dispatch = useDispatch();
  const brojNacinaOtpreme = useSelector(
    (state) => state.nacinOtpreme.brojNacinaOtpreme
  );
  const nazivNacinaOtpreme = useSelector(
    (state) => state.nacinOtpreme.nacinOtpreme
  );
  const handleChangeNaziv = (e) => {
    setNazivNacina(e.target.value);
  };

  const handleSacuvajNacinOtpreme = async () => {
    try {
      const response = await fetch(`${BASE_URL}/nacin/kreirajNacin`, {
        method: "POST",
        body: JSON.stringify({ naziv: nazivNacina }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.ok) {
        console.log("Uspesno kreiran način otpreme.");
      } else {
        console.error(
          "Greška pri kreiranju načina otpreme. Status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Greška prilikom komunikacije sa serverom:", error);
    }

    dispatch(setNacinOtpreme(""));
    dispatch(setBrojNacinaOtpreme(brojNacinaOtpreme + 1));
  };

  const [nazivNacina, setNazivNacina] = useState("");
  return (
    <div className="container-otprema">
      <h2>Kreiraj Način Otpreme</h2>
      <form>
        <div className="form-group">
          <label>Broj načina otpreme:</label>
          <input
            type="text"
            value={brojNacinaOtpreme}
            readOnly
            className="readonly-input"
          />
        </div>
        <div className="form-group">
          <label>Naziv načina otpreme:</label>
          <input type="text" value={nazivNacina} onChange={handleChangeNaziv} />
        </div>
        <button type="button" onClick={handleSacuvajNacinOtpreme}>
          Sačuvaj
        </button>
      </form>
    </div>
  );
};

export default KreirajNacinOtpreme;
