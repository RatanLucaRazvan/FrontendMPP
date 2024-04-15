import { useState } from "react";
import AddPageButton from "../components/AddPageButton";
import PhonesList from "../components/PhonesList";
import { Link } from "react-router-dom";
import "../styles/list_page.css";
import ExportButton from "../components/ExportButton";
import Axios, { AxiosError } from "axios";
import axios from "axios";
import { ErrorResponse } from "../errors/error";
import { toast } from "react-toastify";
import useStore from "../global_state/phoneState";
import ProcessorsList from "../components/ProcessorsList";


function ListPage() {
  const [deletablePhones, setDeletablePhones] = useState<string[]>([]);
  const {removePhone} = useStore();
  const notifyBulkDelete = (message: string) => {
    toast.info(message);
  };
  let toastSent: boolean = false;
  const deleteData = async (id: string) => {
    await axios.delete(`http://localhost:3000/phones/${id}`)
    .then((response) => {
      removePhone(id);
      if(toastSent === false){
        notifyBulkDelete("Items deleted!");
        toastSent = true;
      }
    })
    .catch((error) => {
      if(error.message == "Network Error"){
        if(toastSent === false){
          notifyBulkDelete("Network Error! Backend is down!");
          toastSent = true;
        }
      } else{
        console.log(error);
        notifyBulkDelete("Backend not responding!");
      }
    })
  };

  // const getData = async () => {
  //   const response = await Axios.get("http://localhost:3000/");
  //   setPhones(response.data);
  // };
  const handleBulkDelete =() => {
    if(deletablePhones.length === 0){
      notifyBulkDelete("No items selected!");
    }else{
      try {
        for (let i = 0; i < deletablePhones.length; i++) {
            deleteData(deletablePhones[i]);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorResponse>;
          if (axiosError.response && axiosError.response.status === 404) {
            notifyBulkDelete(axiosError.response.data.message);
          } else {
            notifyBulkDelete("An unexpected error occurred.");
          }
        } else {
          notifyBulkDelete("An unexpected error occurred.");
        }
      }
   }
  };
  return (
    <div className="home_list">
      <h1 className="heading_list">Phone List Administration</h1>
        <div className="home_list">
          <button
            type="button"
            className="btn btn-primary add_button"
            onClick={() => handleBulkDelete()}
          >
            Bulk delete
          </button>
          <ExportButton/>
          {/* <Link to="/add-page">
            <AddPageButton text="Add new phone"/>
          </Link> */}
          <PhonesList
            deletablePhones={deletablePhones}
            setDeletablePhones={setDeletablePhones}
          />
        </div>
    </div>
  );
}

export default ListPage;
