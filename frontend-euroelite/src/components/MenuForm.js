import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectOption } from "../store/reducers/menuSlice";
import KreirajNarudzbenicuForm from "./KreirajFormaNar";
import IzmeniNarudzbenicuForm from "./IzmeniFormaNar";
import ObrisiNarudzbenicuForm from "./ObrisiFormaNar";
import "./MenuForm.css";
import KreirajNacinOtpreme from "./KreirajNacinOtpreme";
import IzmeniNacinOtpreme from "./IzmeniNacinOtpreme";
import { setBrojNarudzbenice } from "../store/reducers/narudzbenicaSlice";

import { BASE_URL } from "../config/apiConfig";

const MenuForm = () => {
  const dispatch = useDispatch();
  const selectedOption = useSelector((state) => state.menu.selectedOption);

  const handleOptionChange = async (option) => {
    if (option === "kreiraj") {
      try {
        // Pozivamo API za kreiranje narudžbenice
        const response = await fetch(`${BASE_URL}/kreirajNarudzbenicu`, {
          method: "GET",
        });
        const data = await response.json();

        // Ako je odgovor uspešan, keširamo brojNarudzbenice
        if (response.ok) {
          // localStorage.setItem(
          //   "brojNarudzbenice",
          //   JSON.stringify(data.brojNarudzbenice)
          // );
          const brojNarudzbenice = data.brojNarudzbenice;
          localStorage.setItem(
            "brojNarudzbenice",
            JSON.stringify(brojNarudzbenice)
          );

          // Dispatch the action to update the Redux state with the new brojNarudzbenice
          dispatch(setBrojNarudzbenice(brojNarudzbenice));
        } else {
          console.error("Request was not successful. Status:", response.status);
        }
      } catch (error) {
        // Obrada grešaka prilikom komunikacije sa serverom
        console.error("Greška prilikom komunikacije sa serverom:", error);
      }
    }

    dispatch(selectOption(option));
    console.log(option);
  };

  const renderForm = () => {
    switch (selectedOption) {
      case "kreiraj":
        return <KreirajNarudzbenicuForm />;
      case "izmeni":
        return <IzmeniNarudzbenicuForm />;
      case "obrisi":
        return <ObrisiNarudzbenicuForm />;
      case "kreirajOtpremu":
        return <KreirajNacinOtpreme />;
      case "izmeniOtpremu":
        return <IzmeniNacinOtpreme />;
      default:
        return null;
    }
  };

  return (
    <div className="menu-container">
      <div className="sidebar">
        <div className="sidebar-content">
          <ul className="sidebar-buttons">
            <li>
              <button onClick={() => handleOptionChange("kreiraj")}>
                Kreiraj narudžbenicu
              </button>
            </li>
            <li>
              <button onClick={() => handleOptionChange("izmeni")}>
                Izmeni narudžbenicu
              </button>
            </li>
            <li>
              <button onClick={() => handleOptionChange("obrisi")}>
                Obriši narudžbenicu
              </button>
            </li>
            <li>
              <button onClick={() => handleOptionChange("kreirajOtpremu")}>
                Kreiraj način otpreme
              </button>
            </li>
            <li>
              <button onClick={() => handleOptionChange("izmeniOtpremu")}>
                Izmeni način otpreme
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="form-container">{renderForm()}</div>
    </div>
  );
};

export default MenuForm;
