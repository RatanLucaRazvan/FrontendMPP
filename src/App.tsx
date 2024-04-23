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
import axiosRetry from "axios-retry";
import useFrontStore from "./global_state/frontPhoneState";
import useFrontProcessorStore from "./global_state/frontProcessorsStore";
import { FrontPhone } from "./model/FrontPhone";
import { FrontProcessor } from "./model/FrontProcessor";

function App() {

  // Second entity - processors(Snapdragon, MediaTek, Apple)
  const { phones, setPhones, addPhone} = useStore();
  const {setFrontPhones, frontPhones, getFrontPhones} = useFrontStore();
  const {frontProcessors, setFrontProcessors, getFrontProcessors} = useFrontProcessorStore();
  const {processors, setProcessors, addProcessor} = useProcessorStore();
  let triedPhones: boolean = false;
  let triedProcessors: boolean = false;
  var interval;
  const notifyBackendDown = (message: string) => {
    toast.info(message);
  };

  const notifyCronJobAdded = (message: string) => {
    toast.info(message);
  }
  // const axiosInstance = axios.create({
  //   baseURL: `${import.meta.env.VITE_REACT_APP_API_URL}`, // Your API base URL
  // });

  // axiosRetry(axiosInstance, {
  //   retries: 3, // Number of retry attempts
  //   retryDelay: () => {
  //     // Exponential backoff retry delay (increase with each retry)
  //     return 1000; // Retry delay in milliseconds
  //   },
  // });
  
  const tryRestore = async () =>{
    // console.log("E pornit backend-ul dar am intrat")
    const frontPhonesCopy = getFrontPhones();
    const frontProcessorsCopy = getFrontProcessors(); 
    console.log(frontPhonesCopy)
    console.log(frontProcessorsCopy)
    const processorData = {
      listProcessors: frontProcessorsCopy,
      listPhones: frontPhonesCopy
    };

    await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/restoreprocessors`, processorData)
    .then((response) =>{
      // setProcessors(response.data);
      console.log(processorData);
      window.location.reload();
      setFrontPhones([]);
      setFrontProcessors([]);
      // clearInterval(interval!);
    })
    .catch((error) => {
      if(error.message == "Network Error"){
        console.log("Backend still down! Processors");
      } else{
        console.log(error);
      }
    })

      // const phoneData = {
      //   list: frontPhones
      // };
      
      // await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/restorephones`, phoneData)
      // .then((response) =>{
      //   console.log(phoneData);
      //   setFrontPhones([]);
      //   setFrontProcessors([]);
      //   // setPhones(response.data);
      // })
      // .catch((error) => {
      //   if(error.message == "Network Error"){
      //     console.log("Backend still down! Phones");
      //   } else{
      //     console.log(error);
      //   }
      // })


  }
  const getData = async () => {
    // setFrontPhones([])
    // setFrontProcessors([])
      await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/phones`, {
        params: {
          page: 0,
          count: 50
        }
      })
      .then((response) => {
        if(triedPhones == true){
          notifyBackendDown("Backend is back up! Phones restored");
          triedPhones = false;
        }
        setPhones(response.data);
      })
      .catch((error) => {
        console.log("Eroare");
        if(error.message == "Network Error"){
          if(triedPhones == false){
            notifyBackendDown("Network error! Could not take phones! Backend is down!Continue using the app, and we will sync it with our server whenever possbile!");
          }
        }
        else{
          if(triedPhones == false){
            notifyBackendDown("Backend not responding!");
          }
        }
        triedPhones = true;
      })

      await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/processors`, {
        params: {
          page: 0,
          count: 50
        }
      })
      .then(response => {
        if(triedProcessors == true){
          notifyBackendDown("Backend is back up! Processors restored");
          triedProcessors = false;
        }
        setProcessors(response.data);
        // console.log(processors);
      })
      .catch((error) => {
        interval = setInterval(() => tryRestore(), 10000);
        console.log(error);
        if(error.message == "Network Error"){
          if(triedProcessors === false){
            notifyBackendDown("Network error! Could not take processors! Backend is down! Continue using the app, and we will sync it with our server whenever possbile!");
          }
        }
        else{
          if(triedProcessors === false){
            notifyBackendDown("Backend not responding!");
          }
        }
        triedProcessors = true;
      })
  };
//   const getProcessorData = async () => {
//     await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/processors?speed=ASC`)
//     .then(response => {
//       setProcessors(response.data);
//       console.log(processors);
//     })
//     .catch((error) => {
//       console.log(error);
//       if(error.message == "Network Error"){
//         notifyBackendDown("Network error! Could not take processors! Backend is down! Continue using the app, and we will sync it with our server whenever possbile!");
//       }
//       else{
//         notifyBackendDown("Backend not responding!");
//       }
//     })
// };

  // useEffect(() => {
  //     // setFrontPhones([]);
  //     tryRestore()
  //     // getProcessorData();
  // }, [frontPhones, frontProcessors]);

  useEffect(() => {
    getData();
  }, [])


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
