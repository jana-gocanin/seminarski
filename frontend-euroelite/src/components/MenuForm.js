import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setOrderCase,
  createOrder,
  editOrder,
  deleteOrder,
  selectOrderCase,
} from "../store/reducers/orderCaseSlice";
import "./MenuForm.css";

const MenuForm = () => {
  const dispatch = useDispatch();
  const order = useSelector(selectOrderCase);

  const handleCreateClick = () => {
    dispatch(setOrderCase("create"));
    dispatch(createOrder());
  };

  const handleEditClick = () => {
    dispatch(setOrderCase("edit"));
    dispatch(editOrder());
  };

  const handleDeleteClick = () => {
    dispatch(setOrderCase("delete"));
    dispatch(deleteOrder());
  };

  useEffect(() => {
    console.log("Trenutni orderCase:", order);
  }, [order]);

  return (
    <div className="omot">
      <p className="heading">Izaberite jednu od opcija:</p>
      <div>
        <button onClick={handleCreateClick}>Kreiraj narudžbenicu</button>
      </div>
      <div>
        <button onClick={handleEditClick}>Izmeni narudžbenicu</button>
      </div>
      <div>
        <button onClick={handleDeleteClick}>Obriši narudžbenicu</button>
      </div>
    </div>
  );
};

export default MenuForm;
