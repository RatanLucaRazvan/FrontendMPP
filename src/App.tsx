import { useEffect, useRef } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./pages/AddPage";
import UpdatePage from "./pages/UpdatePage";
import DetailPage from "./pages/DetailPage";
import { ToastContainer, toast } from "react-toastify";
import useStore from "./global_state/phoneState";
import axios from "axios";
import UpdatePageProcessor from "./pages/UpdatePageProcessor";
import ProcessorsListPage from "./pages/ProcessorsListPage";
import AddPageProcessor from "./pages/AddPageProcessor";
import useProcessorStore from "./global_state/processorState";
import ProcessorDetailPage from "./pages/ProcessorDetailPage";
import ListPage from "./pages/ListPage";
import { Socket, io } from "socket.io-client";

function App() {

  // Second entity - processors(Snapdragon, MediaTek, Apple)
  const { phones, setPhones, addPhone} = useStore();
  const {processors, setProcessors, addProcessor} = useProcessorStore();
  const notifyBackendDown = (message: string) => {
    toast.info(message);
  };

  const notifyCronJobAdded = (message: string) => {
    toast.info(message);
  }
  const getPhoneData = async () => {
      await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/phones?price=DESC`)
      .then(response => {
        setPhones(response.data);
      })
      .catch((error) => {
        console.log(error);
        if(error.message == "Network Error"){
          notifyBackendDown("Network error! Could not take phones! Backend is down!");
        }
        else{
          notifyBackendDown("Backend not responding!");
        }
      })
  };

  const getProcessorData = async () => {
    await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/processors?speed=ASC`)
    .then(response => {
      setProcessors(response.data);
      console.log(processors);
    })
    .catch((error) => {
      console.log(error);
      if(error.message == "Network Error"){
        notifyBackendDown("Network error! Could not take processors! Backend is down!");
      }
      else{
        notifyBackendDown("Backend not responding!");
      }
    })
};

  useEffect(() => {
      getPhoneData();
      getProcessorData();
  }, []);


  // let socket = useRef<Socket>();
  // useEffect(() => {
  //     let ignore = false;
  //     const socket = io("http://localhost:3000/");
  //     socket.on("phone", (phone) => {
  //       const phoneObject = JSON.parse(phone);
  //       // console.log(phoneObject);
  //       addPhone(phoneObject);
  //       notifyCronJobAdded("Cron job added phone!");
  //     });
  //     socket.on("processor", (processor) => {
  //       const processorObject = JSON.parse(processor);
  //       // console.log(phoneObject);
  //       addProcessor(processorObject);
  //       notifyCronJobAdded("Cron job added processor!");
  //     });
  //     return () => { 
  //       ignore = true; 
  //       socket.disconnect();
  //     }
  //   }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProcessorsListPage />} />
          <Route path="/phones-list-page" element={<ListPage/>}/>
          {/* <Route path="/add-page" element={<AddPage />} /> */}
          <Route path="/update-page/:id" element={<UpdatePage></UpdatePage>} />
          <Route
            path="/detail-page/:id"
            element={<DetailPage phones={phones} />}
          />
          <Route
            path="/processor-detail-page/:id"
            element={<ProcessorDetailPage />}
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
