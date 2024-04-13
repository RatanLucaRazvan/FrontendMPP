import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./pages/AddPage";
import AddPage from "./pages/AddPage";
import ListPage from "./pages/ListPage";
import UpdatePage from "./pages/UpdatePage";
import DetailPage from "./pages/DetailPage";
import Axios from "axios";
import { ToastContainer } from "react-toastify";
import useStore from "./global_state/phoneState";

function App() {
  const { phones, setPhones } = useStore();
  //change made for test commit
  const getData = async () => {
    const response = await Axios.get("http://localhost:3000/");
    console.log("Hello");
    setPhones(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/add-page" element={<AddPage />} />
          <Route path="/update-page/:id" element={<UpdatePage></UpdatePage>} />
          <Route
            path="/detail-page/:id"
            element={<DetailPage phones={phones} />}
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
