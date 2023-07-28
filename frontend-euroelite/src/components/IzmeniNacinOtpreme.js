import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchNaciniOtpreme,
  setNacinOtpreme,
  removeNacinOtpreme,
} from "../store/reducers/nacinOtpremeSlice";
import "./IzmeniNacinOtpreme.css";
import { BASE_URL } from "../config/apiConfig";

const IzmeniNacinOtpreme = () => {
  const [izmenaNacinaOtpreme, setIzmenaNacinaOtpreme] = useState("");
  const [izabraniNacinOtpreme, setIzabraniNacinOtpreme] = useState(null);
  const naciniOtpreme = useSelector(
    (state) => state.nacinOtpreme.naciniOtpreme
  );
  const dispatch = useDispatch();

  const handleIzmenaNacinaOtpreme = (nacinOtpreme) => {
    setIzmenaNacinaOtpreme(nacinOtpreme.naziv);
    setIzabraniNacinOtpreme(nacinOtpreme);
  };

  useEffect(() => {
    dispatch(fetchNaciniOtpreme());
  }, [dispatch]);

  const handleSacuvajIzmenu = async () => {
    if (izmenaNacinaOtpreme.trim() === "") {
      return;
    }
    const updatedNacinOtpreme = {
      ...izabraniNacinOtpreme,
      naziv_nacina: izmenaNacinaOtpreme,
    };

    try {
      const response = await fetch(`${BASE_URL}/nacin/izmeni`, {
        method: "PUT",
        body: JSON.stringify({
          naziv: updatedNacinOtpreme.naziv_nacina,
          id: updatedNacinOtpreme.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Dispatch the action to update the Redux state
        dispatch(setNacinOtpreme(updatedNacinOtpreme));
        setIzmenaNacinaOtpreme("");
        setIzabraniNacinOtpreme(null);
        console.log("Uspešno izmenjen način otpreme.");
      } else {
        console.error(
          "Greška pri izmeni načina otpreme. Status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Greška prilikom komunikacije sa serverom:", error);
    }
  };

  const handleOdustaniIzmena = () => {
    setIzmenaNacinaOtpreme("");
    setIzabraniNacinOtpreme(null);
  };

  const handleObrisiNacinOtpreme = async (nacinOtpreme) => {
    try {
      const response = await fetch(`${BASE_URL}/nacin/obrisi`, {
        method: "DELETE",
        body: JSON.stringify({ id: nacinOtpreme.id }), // Assuming your API expects the "id" of the "nacinOtpreme" to be passed in the request body
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Dispatch the action to update the Redux state
        dispatch(removeNacinOtpreme(nacinOtpreme.id));
        console.log("Uspešno obrisan način otpreme.");
      } else {
        console.error(
          "Greška pri brisanju načina otpreme. Status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Greška prilikom komunikacije sa serverom:", error);
    }
  };

  return (
    <div className="izmena-container">
      <h2>Izmena načina otpreme</h2>
      <table>
        <thead>
          <tr>
            <th>Broj načina otpreme</th>
            <th>Naziv načina otpreme</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {naciniOtpreme.map((nacinOtpreme) => (
            <tr key={nacinOtpreme.id}>
              <td>{nacinOtpreme.id}</td>
              <td>
                {nacinOtpreme === izabraniNacinOtpreme ? (
                  <input
                    type="text"
                    value={izmenaNacinaOtpreme}
                    onChange={(e) => setIzmenaNacinaOtpreme(e.target.value)}
                  />
                ) : (
                  nacinOtpreme.naziv_nacina
                )}
              </td>
              <td>
                {nacinOtpreme === izabraniNacinOtpreme ? (
                  <div>
                    <button onClick={handleSacuvajIzmenu}>Sačuvaj</button>
                    <button onClick={handleOdustaniIzmena}>Odustani</button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleIzmenaNacinaOtpreme(nacinOtpreme)}
                  >
                    Izmeni
                  </button>
                )}
              </td>
              <td>
                <button onClick={() => handleObrisiNacinOtpreme(nacinOtpreme)}>
                  Obriši
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IzmeniNacinOtpreme;
