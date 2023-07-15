import React, { useState } from "react";
import KreirajNarudzbenicuForm from "./KreirajFormaNar";
import IzmeniNarudzbenicuForm from "./IzmeniFormaNar";
import ObrisiNarudzbenicuForm from "./ObrisiFormaNar";
import "./MenuForm.css";

const MenuForm = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const renderForm = () => {
    switch (selectedOption) {
      case "kreiraj":
        return <KreirajNarudzbenicuForm />;
      case "izmeni":
        return <IzmeniNarudzbenicuForm />;
      case "obrisi":
        return <ObrisiNarudzbenicuForm />;
      default:
        return null;
    }
  };

  return (
    <div className="omot">
      <p className="heading">Izaberite jednu od opcija:</p>
      <div>
        <button onClick={() => handleOptionChange("kreiraj")}>
          Kreiraj narudžbenicu
        </button>
      </div>
      <div>
        <button onClick={() => handleOptionChange("izmeni")}>
          Izmeni narudžbenicu
        </button>
      </div>
      <div>
        <button onClick={() => handleOptionChange("obrisi")}>
          Obriši narudžbenicu
        </button>
      </div>
      {renderForm()}
    </div>
  );
};

export default MenuForm;
