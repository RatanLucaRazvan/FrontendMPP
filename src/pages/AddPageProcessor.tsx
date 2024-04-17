import React, { useState } from 'react'
import useProcessorStore from '../global_state/processorState';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import InputFormProcessor from '../components/InputFormProcessor';

function AddPageProcessor() {
    const {addProcessor} = useProcessorStore();
    const [name, setName] = useState<string>("");
    const [prodYear, setProdYear] = useState<string>("");
    const [speed, setSpeed] = useState<string>("");
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
        prodYear: prodYear,
        speed: speed
      };
  
      await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/processors`, data)
      .then((response) =>{
        addProcessor(response.data);
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
  
      if (name && prodYear && speed) {
        postData();
        setName("");
        setProdYear("");
        setSpeed("");
        navigate("/");
      } else{
        notifyEmpty();
      }
    };
    return (
      <div className="home_add">
        <h1 className="heading_add">Add Page</h1>
        <InputFormProcessor
          name={name}
          setName={setName}
          prodYear={prodYear}
          setProdYear={setProdYear}
          speed={speed}
          setSpeed={setSpeed}
          handleAdd={handleAdd}
        ></InputFormProcessor>
      </div>
    );
}

export default AddPageProcessor