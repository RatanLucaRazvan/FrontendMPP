import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useProcessorStore from '../global_state/processorState';
import InputForm from '../components/InputForm';
import axios from 'axios';
import { toast } from 'react-toastify';
import useStore from '../global_state/phoneState';

function ProcessorDetailPage() {
  const { id } = useParams<{ id: string }>();
  const {processors} = useProcessorStore();
  const processor = id ? processors.find((p) => p.id === id) : undefined;
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
      description: description,
      processorId: processor!.id
    };

    await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/phones`, data)
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
  }
  return (
    <div>
        <div className="home_detail">
        <h1 className="heading_detail">Details Page</h1>
        <div className="details_box">
            <p className="detail">Name: {processor!.name}</p>
            <p className="detail">Production Year: {processor!.prodYear}</p>
            <p className="detail"> Speed: {processor!.speed}</p>
        </div>
        </div>
        
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
    </div>
  );
}

export default ProcessorDetailPage