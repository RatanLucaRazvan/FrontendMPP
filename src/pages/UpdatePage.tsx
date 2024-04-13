import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/update_page.css";
import "../styles/form_style.css";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ErrorResponse } from "../errors/error";
import useStore from "../global_state/phoneState";
// interface Props {
//   phones: Phone[];
//   setPhones: React.Dispatch<React.SetStateAction<Phone[]>>;
// }

function UpdatePage() {
  const {phones, updatePhone} = useStore();
  const { id } = useParams<{ id: string }>();
  const phone = id ? phones.find((p) => p.id === id) : undefined;
  const refName = useRef<HTMLInputElement>(null);
  const refPrice = useRef<HTMLInputElement>(null);
  const refProdYear = useRef<HTMLInputElement>(null);
  const refDescription = useRef<HTMLInputElement>(null);

  const [editName, setEditName] = useState<string>(phone!.name);
  const [editPrice, setEditPrice] = useState<number>(phone!.price);
  const [editProdYear, setEditProdYear] = useState<number>(phone!.prodYear);
  const [editDescription, setEditDescription] = useState<string>(
    phone!.description
  );
  const notifyUpdate = (message: string) => {
    toast.info(message);
  };
  const navigate = useNavigate();
  const patchData = async () => {
    const data = {
      name: editName,
      price: editPrice,
      prodYear: editProdYear,
      description: editDescription,
    };

    const response = await axios.patch(`http://localhost:3000/${id}`, data)
    .then((response) => {
      updatePhone(id!, response.data);
      notifyUpdate("Item updated");
    })
    .catch((error) => {
      if(error.message == "Network Error"){
        notifyUpdate("Network Error! Backend is down!");
      } else{
        console.log(error);
        notifyUpdate("Backend not responding!");
      }
    })
    // setPhones(response.data);
  };

  const handleEdit = (e: React.FormEvent) => {
    try {
      e.preventDefault();
      patchData();
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response && axiosError.response.status === 404) {
          notifyUpdate(axiosError.response.data.message);
        }else{
          notifyUpdate("An unexpected error occurred.");
        }
      } else {
        notifyUpdate("An unexpected error occurred.");
      }
    }
  };
  return (
    <div className="home_update">
      <h1 className="heading_update">Update Page</h1>
      <form className="form" onSubmit={(e) => handleEdit(e)}>
        <div>
          <div className="edit_fields">
            <input
              className="new"
              ref={refName}
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <input
              type="number"
              className="new"
              ref={refPrice}
              value={editPrice}
              onChange={(e) => setEditPrice(parseInt(e.target.value))}
            />
            <input
              type="number"
              className="new"
              ref={refProdYear}
              value={editProdYear}
              onChange={(e) => setEditProdYear(parseInt(e.target.value))}
            />
            <input
              className="new"
              ref={refDescription}
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
          </div>
          <button type={"submit"} className="confirm_add_button">
            Update phone
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdatePage;
