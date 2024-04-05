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


function ListPage() {
  const [deletablePhones, setDeletablePhones] = useState<number[]>([]);
  const {removePhone} = useStore();
  const deleteData = async (id: number) => {
    await Axios.delete(`http://localhost:3000/${id}`);
    removePhone(id);
  };

  // const getData = async () => {
  //   const response = await Axios.get("http://localhost:3000/");
  //   setPhones(response.data);
  // };
  const notifyBulkDelete = (message: string) => {
    toast.info(message);
  };
  const handleBulkDelete =() => {
    if(deletablePhones.length === 0){
      notifyBulkDelete("No items selected!");
    }else{
      try {
        for (let i = 0; i < deletablePhones.length; i++) {
            deleteData(deletablePhones[i]);
        }
        notifyBulkDelete("Items deleted!");
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
        <Link to="/add-page">
          <AddPageButton />
        </Link>
        <PhonesList
          deletablePhones={deletablePhones}
          setDeletablePhones={setDeletablePhones}
        />
      </div>
    </div>
  );
}

export default ListPage;
