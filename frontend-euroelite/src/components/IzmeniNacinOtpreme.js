import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sacuvajNacinOtpreme } from "../store/reducers/nacinOtpremeSlice";

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

  const handleSacuvajIzmenu = () => {
    if (izmenaNacinaOtpreme.trim() === "") {
      return;
    }
    const izmenjenNacinOtpreme = {
      ...izabraniNacinOtpreme,
      naziv: izmenaNacinaOtpreme,
    };
    dispatch(sacuvajNacinOtpreme(izmenjenNacinOtpreme));
    setIzmenaNacinaOtpreme("");
    setIzabraniNacinOtpreme(null);
  };

  const handleObrisiNacinOtpreme = (nacinOtpreme) => {
    // Implement logic to delete the selected nacinOtpreme
  };

  return (
    <div>
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
            <tr key={nacinOtpreme.broj}>
              <td>{nacinOtpreme.broj}</td>
              <td>
                {izabraniNacinOtpreme &&
                izabraniNacinOtpreme.broj === nacinOtpreme.broj ? (
                  <input
                    type="text"
                    value={izmenaNacinaOtpreme}
                    onChange={(e) => setIzmenaNacinaOtpreme(e.target.value)}
                  />
                ) : (
                  nacinOtpreme.naziv
                )}
              </td>
              <td>
                {izabraniNacinOtpreme &&
                izabraniNacinOtpreme.broj === nacinOtpreme.broj ? (
                  <button onClick={handleSacuvajIzmenu}>Sačuvaj</button>
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
