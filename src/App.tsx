import { useEffect, useRef } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./pages/AddPage";
import AddPage from "./pages/AddPage";
import ListPage from "./pages/ListPage";
import UpdatePage from "./pages/UpdatePage";
import DetailPage from "./pages/DetailPage";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import useStore from "./global_state/phoneState";
import axios from "axios";
import { Socket, io } from "socket.io-client";
import { v4 } from "uuid";
import UpdatePageProcessor from "./pages/UpdatePageProcessor";

function App() {

  // Second entity - processors(Snapdragon, MediaTek, Apple)
  const { phones, setPhones, addPhone} = useStore();
  const notifyBackendDown = (message: string) => {
    toast.info(message);
  };

  const notifyCronJobAdded = (message: string) => {
    toast.info(message);
  }
  const getData = async () => {
      const response = await axios.get("http://localhost:3000/")
      .then(response => {
        setPhones(response.data);
      })
      .catch((error) => {
        console.log(error);
        if(error.message == "Network Error"){
          notifyBackendDown("Network error! Backend is down!");
        }
        else{
          notifyBackendDown("Backend not responding!");
        }
      })
  };

  useEffect(() => {
      getData();
  }, []);


  let socket = useRef<Socket>();
  useEffect(() => {
      let ignore = false;
      const socket = io("http://localhost:3000/phones");
      socket.on("phone", (phone) => {
        const phoneObject = JSON.parse(phone);
        // console.log(phoneObject);
        addPhone(phoneObject);
        notifyCronJobAdded("Cron job added phone!");
      });
      return () => { 
        ignore = true; 
        socket.disconnect();
      }
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
          <Route 
            path="/update-page-processor/:id"
            element={<UpdatePageProcessor />}
          />
          <Route
            path="/add-page-processor"
            element={<AddPageProcessor />}
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
