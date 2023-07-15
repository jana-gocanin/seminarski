import React from "react";
import { useSelector } from "react-redux";
import KreirajFormaNar from "./KreirajFormaNar";
import IzmeniFormaNar from "./IzmeniFormaNar";
import ObrisiFormaNar from "./ObrisiFormaNar";
import { selectOrderCase } from "../store/reducers/orderCaseSlice";

const FormaNarudzbenica = () => {
  const selectedOption = useSelector(selectOrderCase);

  return (
    <div>
      {selectedOption === "kreiraj" && <KreirajFormaNar />}
      {selectedOption === "izmeni" && <IzmeniFormaNar />}
      {selectedOption === "obrisi" && <ObrisiFormaNar />}
    </div>
  );
};

export default FormaNarudzbenica;
