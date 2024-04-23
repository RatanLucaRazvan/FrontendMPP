import React, { useRef, useState } from 'react'
import {useNavigate, useParams } from 'react-router-dom';
import useProcessorStore from '../global_state/processorState';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '../errors/error';
import { FrontProcessor } from '../model/FrontProcessor';
import useFrontProcessorStore from '../global_state/frontProcessorsStore';
import { Processor } from '../model/Processor';

function UpdatePageProcessor() {
    const {processors, updateProcessor} = useProcessorStore();
    const {frontProcessors, updateFrontProcessor, addFrontProcessor} = useFrontProcessorStore();
    const { id } = useParams<{ id: string }>();
    const processor = id ? processors.find((p) => p.id === id) : undefined;
    const refName = useRef<HTMLInputElement>(null);
    const refProdYear = useRef<HTMLInputElement>(null);
    const refSpeed = useRef<HTMLInputElement>(null);
  
    const [editName, setEditName] = useState<string>(processor!.name);
    const [editProdYear, setEditProdYear] = useState<number>(processor!.prodYear);
    const [editSpeed, setEditSpeed] = useState<string>(
      processor!.speed
    );
    const notifyUpdate = (message: string) => {
      toast.info(message);
    };
    const navigate = useNavigate();
    const patchData = async () => {
      const data = {
        name: editName,
        prodYear: editProdYear,
        speed: editSpeed,
      };
  
      await axios.patch(`${import.meta.env.VITE_REACT_APP_API_URL}/processors/${id}`, data)
      .then((response) => {
        updateProcessor(id!, response.data);
        notifyUpdate("Item updated");
      })
      .catch((error) => {
        let newFrontProcessor: FrontProcessor = {id: processor!.id,
          name: editName,
          prodYear: editProdYear,
          speed: editSpeed,
          deleted: false,
          updated: false}
        let found = false;
        for(let i = 0; i < frontProcessors.length; i++){
          if(frontProcessors[i].id == newFrontProcessor.id){
            found = true;
            updateFrontProcessor(newFrontProcessor.id, newFrontProcessor);
          }
        }
        if(found == false)
        {
          newFrontProcessor.updated = true;
          addFrontProcessor(newFrontProcessor)
        }
        let newProcessor: Processor = {id: processor!.id,
          name: editName,
          prodYear: editProdYear,
          speed: editSpeed}
        updateProcessor(id!, newProcessor)
        // if(error.message == "Network Error"){
        //   notifyUpdate("Network Error! Backend is down!");
        // } else{
        //   console.log(error);
        //   notifyUpdate("Backend not responding!");
        // }
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
              {/* <input
                type="number"
                className="new"
                ref={refPrice}
                value={editPrice}
                onChange={(e) => setEditPrice(parseInt(e.target.value))}
              /> */}
              <input
                type="number"
                className="new"
                ref={refProdYear}
                value={editProdYear}
                onChange={(e) => setEditProdYear(parseInt(e.target.value))}
              />
              <input
                className="new"
                ref={refSpeed}
                value={editSpeed}
                onChange={(e) => setEditSpeed(e.target.value)}
              />
            </div>
            <button type={"submit"} className="confirm_add_button">
              Update processor
            </button>
          </div>
        </form>
      </div>
    );
}

export default UpdatePageProcessor