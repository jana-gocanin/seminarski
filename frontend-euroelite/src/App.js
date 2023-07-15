import React from "react";
import MenuForm from "./components/MenuForm";
import FrmNarudzbenica from "./components/FrmNarudzbenica";

const App = () => {
  // const [showForm, setShowForm] = useState(false);

  // const handleOptionChange = () => {
  //   setShowForm(true);
  // };

  return (
    <div>
      <MenuForm />

      <FrmNarudzbenica />
    </div>
  );
};

export default App;
