import React, { useEffect, useState } from "react";
import InputForm from "../components/InputForm";
import "../styles/add_page.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import useStore from "../global_state/phoneState";

// interface Props {
//   phones: Phone[];
//   setPhones: React.Dispatch<React.SetStateAction<Phone[]>>;
// }

function AddPage() {
  const {addPhone} = useStore();
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [prodYear, setProdYear] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const navigate = useNavigate();
  const notifyAdd = (message: string) => {
    toast.info(message);
  };
  const notifyEmpty = () => {
    toast.info('You need to fill in the details!');
  };
  const postData = async () => {
    const data = {
      name: name,
      price: price,
      prodYear: prodYear,
      description: description
    };

    const response = await axios.post("http://localhost:3000/phones", data)
    .then((response) =>{
      addPhone(response.data);
      notifyAdd('Item added!');
    })
    .catch((error) => {
      if(error.message == "Network Error"){
        notifyAdd("Network Error! Backend is down!");
      } else{
        console.log(error);
        notifyAdd("Backend not responding!");
      }
    })
    // setPhones(response.data);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name && price && prodYear && description) {
      postData();
      setName("");
      setPrice("");
      setProdYear("");
      setDescription("");
      navigate("/");
    } else{
      notifyEmpty();
    }
  };
  return (
    <div className="home_add">
      <h1 className="heading_add">Add Phone specific to this processor</h1>
      <InputForm
        name={name}
        setName={setName}
        price={price}
        setPrice={setPrice}
        prodYear={prodYear}
        setProdYear={setProdYear}
        description={description}
        setDescription={setDescription}
        handleAdd={handleAdd}
      ></InputForm>
    </div>
  );
}

export default AddPage;
