import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BASE_URL } from "../config/apiConfig";
import DodajStavkuForma from "./DodajStavkuForma";
import {
  setBrojNarudzbenice,
  setDatumNarudzbenice,
  setZiroRacun,
  // setNacinOtpreme,
  setRokIsporuke,
  setUnosDobavljaca,
  setDobavljac,
  setDobavljaci,
  addStavka,
  removeStavka,
  updateStavka,
  setEditedStavka,
  updateStavkaKolicina,
} from "../store/reducers/narudzbenicaSlice";
import "./KreirajFormaNar.css";
import {
  setNacinOtpreme,
  fetchNaciniOtpreme,
} from "../store/reducers/nacinOtpremeSlice";

const KreirajFormaNar = () => {
  const dispatch = useDispatch();
  const {
    brojNarudzbenice,
    datumNarudzbenice,
    ziroRacun,
    // nacinOtpreme,
    rokIsporuke,
    unosDobavljaca,
    dobavljac,
    dobavljaci,
    stavke,
    deleteNarudzbenica,
  } = useSelector((state) => state.narudzbenica);
  const { ukupanIznos } = useSelector((state) => state.narudzbenica);

  const { naciniOtpreme, nacinOtpreme } = useSelector(
    (state) => state.nacinOtpreme
  );
  const [searchResult, setSearchResult] = useState([]);
  const [selectedDobavljac, setSelectedDobavljac] = useState(null);
  const [editedQuantity, setEditedQuantity] = useState("");
  const [editedStavkaIndex, setEditedStavkaIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Dohvati sve načine otpreme kada se komponenta montira
    dispatch(fetchNaciniOtpreme());
  }, [dispatch]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Prompt the user with a confirmation dialog before leaving the page
      event.preventDefault();
      event.returnValue = ""; // This is required for Chrome compatibility
      dispatch(deleteNarudzbenica());
    };

    // Add the event listener when the component mounts
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);

      // If the user confirms leaving (by closing the tab/window),
      // then delete the order.
      handleDeleteOrder();
    };
  }, [brojNarudzbenice]);

  const handleDeleteOrder = async () => {
    try {
      // Make the API call to delete the order
      const response = await fetch(
        `${BASE_URL}/narudzbenice/obrisi-narudzbenicu`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            brojNarudzbenice, // Assuming brojNarudzbenice is the identifier for the order
          }),
        }
      );

      if (!response.ok) {
        console.error("Error:", response.statusText);
        // Handle error if needed
        return;
      }

      // Handle the success response or any other necessary actions
      console.log("Order deleted successfully!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const isFormValid = () => {
    if (
      !brojNarudzbenice ||
      !datumNarudzbenice ||
      !ziroRacun ||
      !nacinOtpreme ||
      !rokIsporuke ||
      !dobavljac
    ) {
      return false;
    }

    if (stavke.length === 0) {
      return false;
    }

    return true;
  };

  const handleDatumNarudzbeniceChange = async (e) => {
    const newDatumNarudzbenice = e.target.value;
    dispatch(setDatumNarudzbenice(newDatumNarudzbenice));

    // Make the API call to postaviDatumNar
    try {
      const response = await fetch(`${BASE_URL}/postaviDatumNar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          datumNarudzbenice: newDatumNarudzbenice,
          brojNarudzbenice: brojNarudzbenice,
        }),
      });

      if (!response.ok) {
        // Handle the error if needed
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      // Handle any network or fetch errors
      console.error("Error:", error);
    }
  };

  const handleZiroRacunChange = (e) => {
    dispatch(setZiroRacun(e.target.value));
  };

  const handleZiroRacunChangeBlur = async (e) => {
    const racun = e.target.value;
    dispatch(setZiroRacun(racun));

    // Make the API call to postaviDatumNar
    try {
      const response = await fetch(`${BASE_URL}/postaviZiroRacun`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ziroRacun: racun,
          brojNarudzbenice: brojNarudzbenice,
        }),
      });

      if (!response.ok) {
        // Handle the error if needed
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      // Handle any network or fetch errors
      console.error("Error:", error);
    }
  };

  const handleNacinOtpremeChange = async (e) => {
    const nacin = e.target.value;
    dispatch(setNacinOtpreme(nacin));

    try {
      const response = await fetch(`${BASE_URL}/postaviNacinOtpreme`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nacinOtpreme: nacin,
          brojNarudzbenice: brojNarudzbenice,
        }),
      });

      if (!response.ok) {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRokIsporukeChange = async (e) => {
    const newRok = e.target.value;
    dispatch(setRokIsporuke(newRok));

    try {
      const response = await fetch(`${BASE_URL}/postaviRokIsporuke`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rokIsporuke: newRok,
          brojNarudzbenice: brojNarudzbenice,
        }),
      });

      if (!response.ok) {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUnosDobavljacaChange = (e) => {
    dispatch(setUnosDobavljaca(e.target.value));
  };

  const handleIzaberiDobavljacaTableClick = async (dobavljac) => {
    setSelectedDobavljac(dobavljac);

    // try {
    //   const response = await fetch(
    //     `${BASE_URL}/dobavljaci/izaberi/${dobavljac.id}`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );

    //   if (!response.ok) {
    //     console.error("Error:", response.statusText);
    //     return;
    //   }
    //   const data = await response.json();
    //   return data;

    //   // Ažurirajemo stanje Reduxa sa izabranim dobavljačem
    //   // dispatch(setDobavljac(dobavljac));
    // } catch (error) {
    //   console.error("Error:", error);
    // }
    dispatch(setDobavljac(dobavljac));
  };

  const handleIzaberiDobavljaca = async (dobavljac) => {
    try {
      const response = await fetch(`${BASE_URL}/dobavljaci/postavi`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dobavljacId: dobavljac.id,
          brojNarudzbenice: brojNarudzbenice,
        }),
      });

      if (!response.ok) {
        console.error("Error:", response.statusText);
        return;
      }

      // Ažurirajemo stanje Reduxa sa izabranim dobavljačem
      dispatch(setDobavljac(dobavljac));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePronadjiDobavljace = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/dobavljaci/pronadji/${unosDobavljaca}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error("Error:", response.statusText);
        return;
      }

      const data = await response.json();
      setSearchResult(data); // Postavi rezultat pretrage u stanje
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleObrisiStavku = async (stavkaId) => {
    try {
      const response = await fetch(`${BASE_URL}/stavka/obrisi`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: stavkaId,
          brojNarudzbenice: brojNarudzbenice,
        }),
      });

      if (!response.ok) {
        console.error("Error:", response.statusText);
        return;
      }

      // If the stavka is successfully deleted, update the state in Redux
      dispatch(removeStavka(stavkaId));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleIzmeniStavku = (stavka, index) => {
    setEditedQuantity(stavka.kolicina);
    setEditedStavkaIndex(index);

    // Dispatch Redux action to set the editing state
    dispatch(setEditedStavka({ index, isEditing: true }));
  };

  const handleOtkaziIzmenu = () => {
    setEditedStavkaIndex(null);
    setEditedQuantity("");
  };

  const handlePotvrdiIzmenu = async () => {
    if (editedStavkaIndex === null) return;

    try {
      const stavka = stavke[editedStavkaIndex];
      const response = await fetch(`${BASE_URL}/stavka/izmeni`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: stavka.id,
          brojNarudzbenice: brojNarudzbenice,
          novaKolicina: editedQuantity,
        }),
      });

      if (!response.ok) {
        console.error("Error:", response.statusText);
        return;
      }

      const data = await response.json();
      console.log(data.message); // Poruka sa servera, možete je koristiti ako je potrebno

      // Ažurirajte stavku sa novom količinom
      const updatedStavke = [...stavke];
      updatedStavke[editedStavkaIndex] = {
        ...stavka,
        kolicina: editedQuantity,
        iznos: data.iznos, // Novi iznos koji ste dobili sa servera
      };
      dispatch(
        updateStavka({
          index: editedStavkaIndex,
          stavka: updatedStavke[editedStavkaIndex],
        })
      );

      // Resetujte stanje uređivanja
      setEditedStavkaIndex(null);
      setEditedQuantity("");
      setIsEditing(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      // Show an error message or take appropriate action for invalid form
      console.error("Form is not valid. Please fill in all required fields.");
      return;
    }

    try {
      // Call the API route http://localhost:8000/api/narudzbenice/zapamtiUnos
      const response = await fetch(`${BASE_URL}/narudzbenice/zapamtiUnos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          brojNarudzbenice,
          datumNarudzbenice,
          ziroRacun,
          nacinOtpreme,
          rokIsporuke,
          dobavljac,
          stavke,
        }),
      });

      if (!response.ok) {
        console.error("Error:", response.statusText);
        return;
      }

      // Handle the success response or any other necessary actions
      console.log("Form data saved successfully!");

      // Reset the form by dispatching necessary actions
      dispatch(setBrojNarudzbenice(""));
      dispatch(setDatumNarudzbenice(""));
      dispatch(setZiroRacun(""));
      dispatch(setNacinOtpreme(""));
      dispatch(setRokIsporuke(""));
      dispatch(setUnosDobavljaca(""));
      dispatch(setDobavljac(null));
      dispatch(setDobavljaci([]));
      dispatch(updateStavkaKolicina(null)); // Reset edited stavka index and quantity
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Kreiranje narudzbenice</h2>
      <div className="form-row">
        <div className="form-group">
          <label>Broj narudžbenice:</label>
          <input
            type="text"
            value={brojNarudzbenice}
            readOnly
            className="readonly-input"
          />
        </div>
        <div className="form-group">
          <label>Datum narudžbenice:</label>
          <input
            type="date"
            value={datumNarudzbenice}
            onChange={handleDatumNarudzbeniceChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Žiro račun:</label>
          <input
            type="text"
            value={ziroRacun}
            onBlur={handleZiroRacunChangeBlur}
            onChange={handleZiroRacunChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Nacin otpreme:</label>
          <select value={nacinOtpreme} onChange={handleNacinOtpremeChange}>
            <option value="">Odaberite nacin otpreme</option>
            {naciniOtpreme.map((nacin) => (
              <option key={nacin.id} value={nacin.id}>
                {nacin.naziv_nacina}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Rok isporuke:</label>
          <input
            type="date"
            value={rokIsporuke}
            onChange={handleRokIsporukeChange}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>Unos dobavljaca:</label>
        <input
          type="text"
          value={unosDobavljaca}
          onChange={handleUnosDobavljacaChange}
        />
        <button
          type="button"
          onClick={handlePronadjiDobavljace}
          //   className="pronadji-dobavljaca-button"
        >
          Pronadji dobavljaca
        </button>
      </div>
      {dobavljac && (
        <div>
          <p>
            Izabrani dobavljac: {dobavljac.naziv_dobavljaca}{" "}
            {dobavljac.email_dobavljaca}
          </p>
          {/* Ovdje možete prikazati dodatne informacije o dobavljacu */}
        </div>
      )}
      {searchResult.length > 0 && (
        <div className="dobavljac-table-container">
          <table className="dobavljac-table">
            <thead>
              <tr>
                <th>Naziv</th>
                <th>OIB</th>
              </tr>
            </thead>
            <tbody>
              {searchResult.map((dobavljac) => (
                <tr
                  key={dobavljac.id}
                  onClick={() => handleIzaberiDobavljacaTableClick(dobavljac)}
                  className={selectedDobavljac === dobavljac ? "selected" : ""}
                >
                  <td>{dobavljac.naziv_dobavljaca}</td>
                  <td>{dobavljac.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            onClick={() => handleIzaberiDobavljaca(dobavljac)}
            className="izaberi-dobavljaca-button"
          >
            Izaberi dobavljaca
          </button>
        </div>
      )}
      <DodajStavkuForma />
      {stavke.length > 0 && (
        <div className="stavke-table-container">
          <h2>Stavke narudžbenice</h2>
          <table className="stavke-table">
            <thead>
              <tr>
                <th>Proizvod</th>
                <th>Količina</th>
                <th>Iznos</th>
                <th>Akcije</th>
              </tr>
            </thead>
            <tbody>
              {stavke.map((stavka, index) => (
                <tr key={index}>
                  <td>{stavka.proizvod.naziv_proizvoda}</td>
                  {editedStavkaIndex === index ? (
                    // Polje za unos izmenjene količine
                    <td>
                      <input
                        type="number"
                        value={editedQuantity}
                        onChange={(e) => setEditedQuantity(e.target.value)}
                      />
                    </td>
                  ) : (
                    // Prikaz postojeće količine ako nije u toku izmena
                    <td>{stavka.kolicina}</td>
                  )}
                  <td>{stavka.iznos}</td>
                  <td>
                    {editedStavkaIndex === index ? (
                      // Dugmad za potvrdu i otkazivanje izmene
                      <>
                        <button type="button" onClick={handlePotvrdiIzmenu}>
                          Potvrdi
                        </button>
                        <button type="button" onClick={handleOtkaziIzmenu}>
                          Otkazi
                        </button>
                      </>
                    ) : (
                      // Dugme za početak izmene
                      <button
                        type="button"
                        onClick={() => handleIzmeniStavku(stavka, index)}
                      >
                        Izmeni
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleObrisiStavku(stavka.id)}
                    >
                      Obriši
                    </button>
                  </td>
                </tr>
              ))}
              {stavke.length > 0 && (
                <div className="ukupan-iznos-container">
                  <p>Ukupan iznos narudžbenice: {ukupanIznos}</p>
                </div>
              )}
            </tbody>
          </table>
        </div>
      )}
      <button type="submit" className="potvrdi-button">
        Potvrdi
      </button>
    </form>
  );
};
export default KreirajFormaNar;
