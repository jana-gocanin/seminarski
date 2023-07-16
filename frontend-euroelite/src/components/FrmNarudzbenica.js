import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import KreirajFormaNar from "./KreirajFormaNar";
import IzmeniFormaNar from "./IzmeniFormaNar";
import ObrisiFormaNar from "./ObrisiFormaNar";
import { selectOption } from "../store/reducers/menuSlice";

const FormaNarudzbenica = () => {
  const selectedOptionRedux = useSelector((state) => state.menu.selectedOption);
  const [selectedOption, setSelectedOption] = useState(null);

  const renderForm = () => {
    switch (selectedOption) {
      case "kreiraj":
        return <KreirajFormaNar />;
      case "izmeni":
        return <IzmeniFormaNar />;
      case "obrisi":
        return <ObrisiFormaNar />;
      default:
        return null;
    }
  };

  useEffect(() => {
    renderForm();
  }, [selectedOption]);

  return <div>{renderForm()}</div>;
};

export default FormaNarudzbenica;
