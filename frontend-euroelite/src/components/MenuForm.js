import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectOption } from "../store/reducers/menuSlice";
import KreirajNarudzbenicuForm from "./KreirajFormaNar";
import IzmeniNarudzbenicuForm from "./IzmeniFormaNar";
import ObrisiNarudzbenicuForm from "./ObrisiFormaNar";
import "./MenuForm.css";
import KreirajNacinOtpreme from "./KreirajNacinOtpreme";
import IzmeniNacinOtpreme from "./IzmeniNacinOtpreme";

const MenuForm = () => {
  const dispatch = useDispatch();
  const selectedOption = useSelector((state) => state.menu.selectedOption);

  const handleOptionChange = async (option) => {
    if (option === "kreiraj") {
      try {
        // Pozivamo API za kreiranje narudžbenice
        const response = await fetch("PUTANJA_DO_APIJA", {
          method: "POST",
          // Dodajte ostale potrebne opcije za zahtev (npr. telo zahteva)
        });
        const data = await response.json();

        // Ako je odgovor uspešan, keširamo brojNarudzbenice
        if (response.ok) {
          localStorage.setItem(
            "brojNarudzbenice",
            JSON.stringify(data.brojNarudzbenice)
          );
        } else {
          // Ako je odgovor sa greškom, možete obraditi grešku ili prikazati neku poruku korisniku
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
