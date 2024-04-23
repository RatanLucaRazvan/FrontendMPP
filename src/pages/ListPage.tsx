import { useState } from "react";
import PhonesList from "../components/PhonesList";
import "../styles/list_page.css";
import ExportButton from "../components/ExportButton";
import { AxiosError } from "axios";
import axios from "axios";
import { ErrorResponse } from "../errors/error";
import { toast } from "react-toastify";
import useStore from "../global_state/phoneState";
import { Link } from "react-router-dom";
import useFrontStore from "../global_state/frontPhoneState";


function ListPage() {
  const [deletablePhones, setDeletablePhones] = useState<string[]>([]);
  const {phones, removePhone} = useStore();
  const {frontPhones, removeFrontPhone, addFrontPhone, updateFrontPhone} = useFrontStore();
  const notifyBulkDelete = (message: string) => {
    toast.info(message);
  };
  let toastSent: boolean = false;
  const deleteData = async (id: string) => {
    await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/phones/${id}`)
    .then(() => {
      removePhone(id);
      if(toastSent === false){
        notifyBulkDelete("Items deleted!");
        toastSent = true;
      }
    })
    .catch((error) => {
      const phone = id ? phones.find((p) => p.id === id) : undefined;
      let newFrontPhone = {id: phone!.id,
        processorId: phone!.processorId,
        price: phone!.price,
        name: phone!.name,
        prodYear: phone!.prodYear,
        description: phone!.description,
        deleted: true,
        updated: false}
      let found = false;
      let updated = false
      for(let i = 0; i < frontPhones.length; i++){
        if(frontPhones[i].id == newFrontPhone.id){
          if(frontPhones[i].updated == false){
            found = true;
            removeFrontPhone(newFrontPhone.id);
          } else{
            updated = true;
          }
        }
      }
      if(!found){
        if(updated == false){
          addFrontPhone(newFrontPhone)
        } else{
          newFrontPhone.updated = true;
          updateFrontPhone(newFrontPhone.id, newFrontPhone)
        }
      }
      removePhone(id);
      notifyBulkDelete("Phones deleted in front")
      // if(error.message == "Network Error"){
      //   if(toastSent === false){
      //     notifyBulkDelete("Network Error! Backend is down!");
      //     toastSent = true;
      //   }
      // } else{
      //   console.log(error);
      //   notifyBulkDelete("Backend not responding!");
      // }
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
          <Link to="/">
            <button
              type="button"
              className="btn btn-primary add_button"
            >
              Go back to processors
            </button>
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
