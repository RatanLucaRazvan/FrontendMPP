import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useProcessorStore from '../global_state/processorState';
import InputForm from '../components/InputForm';
import axios from 'axios';
import { toast } from 'react-toastify';
import useStore from '../global_state/phoneState';
import useFrontStore from '../global_state/frontPhoneState';
import { FrontPhone } from '../model/FrontPhone';
import { v4 } from 'uuid';
import { Phone } from '../model/Phone';

function ProcessorDetailPage() {
  const { id } = useParams<{ id: string }>();
  const {processors} = useProcessorStore();
  const processor = id ? processors.find((p) => p.id === id) : undefined;
  const {addPhone} = useStore();
  const {addFrontPhone, setFrontPhones} = useFrontStore();
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [prodYear, setProdYear] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const navigate = useNavigate();
  const [numberOfPhonesForProcessor, setNumberOfPhonesForProcessor] = useState<string>("Waiting for statistic!");
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
      let newFrontPhone: FrontPhone = {id: v4(),
        processorId: processor!.id,
        price: parseInt(price),
        name: name,
        prodYear: parseInt(prodYear),
        description: description,
        deleted: false,
        updated: false}
      addFrontPhone(newFrontPhone)
      let newPhone: Phone = {id: newFrontPhone.id,
        processorId: processor!.id,
        price: parseInt(price),
        name: name,
        prodYear: parseInt(prodYear),
        description: description}
      addPhone(newPhone)
      notifyAdd('Phone added in front!');
      setName("");
      setPrice("");
      setProdYear("");
      setDescription("");
      navigate("/");
      // if(error.message == "Network Error"){
      //   notifyAdd("Network Error! Backend is down!");
      // } else{
      //   console.log(error);
      //   notifyAdd("Backend not responding!");
      // }
    })
    // setPhones(response.data);
  };

  const getNumberOfPhones = async () => {
    console.log("Sunt aici");
    await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/numberofphones`, {
      params: {
        processorId: processor!.id
      }
    })
    .then((response) =>{
      setNumberOfPhonesForProcessor(response.data.count);
    })
    .catch((error) => {
      console.log(error!)
    })
  }

  useEffect(() => {
    getNumberOfPhones();
  }, [])

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
            <p className="detail"> Phones with processor: {numberOfPhonesForProcessor}</p>
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