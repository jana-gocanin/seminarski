import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchNaciniOtpreme } from "../store/reducers/nacinOtpremeSlice";
import "./KreirajNacinOtpreme.css";

const KreirajNacinOtpreme = () => {
  const dispatch = useDispatch();
  const [brojNacinaOtpreme, setBrojNacinaOtpreme] = useState("");
  const [nazivNacinaOtpreme, setNazivNacinaOtpreme] = useState("");

  const handleSacuvajNacinOtpreme = () => {
    // const nacinOtpreme = {
    //   broj: brojNacinaOtpreme,
    //   naziv: nazivNacinaOtpreme,
    // };
    // dispatch(sacuvajNacinOtpreme(nacinOtpreme));
    // setNazivNacinaOtpreme("");
  };

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
          <input
            type="text"
            value={nazivNacinaOtpreme}
            onChange={(e) => setNazivNacinaOtpreme(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleSacuvajNacinOtpreme}>
          Sačuvaj
        </button>
      </form>
    </div>
  );
};

export default KreirajNacinOtpreme;
