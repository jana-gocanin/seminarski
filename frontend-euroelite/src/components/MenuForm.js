import React from "react";
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

  const handleOptionChange = (option) => {
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
    <div>
      <div className="sidebar">
        <div className="sidebar-content">
          <div className="sidebar-buttons">
            <button onClick={() => handleOptionChange("kreiraj")}>
              Kreiraj narudžbenicu
            </button>
            <button onClick={() => handleOptionChange("izmeni")}>
              Izmeni narudžbenicu
            </button>
            <button onClick={() => handleOptionChange("obrisi")}>
              Obriši narudžbenicu
            </button>
            <button onClick={() => handleOptionChange("kreirajOtpremu")}>
              Kreiraj način otpreme
            </button>
            <button onClick={() => handleOptionChange("izmeniOtpremu")}>
              Izmeni način otpreme
            </button>
          </div>
        </div>
      </div>
      <div className="form-container">{renderForm()}</div>
    </div>
  );
};

export default MenuForm;
