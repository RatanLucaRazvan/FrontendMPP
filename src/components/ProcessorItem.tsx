import React, { useState } from 'react'
import { Processor } from '../model/Processor'
import ConfirmBox from './ConfirmBox';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '../errors/error';
import useProcessorStore from '../global_state/processorState';
import { toast } from 'react-toastify';
import useStore from '../global_state/phoneState';


interface Props{
    processor: Processor
}
function ProcessorItem({processor}: Props) {
    const {removeProcessor} = useProcessorStore();
    const {removePhoneByProcessor} = useStore();
    const [open, setOpen] = useState(false);

    function openDelete() {
        setOpen(true);
      }

      const notifyDelete = (message: string) => {
        toast.info(message);
      };
    
      const deleteData = async () => {
        await axios.delete(`http://localhost:3000/processors/${processor.id}`)
        .then((response) =>{
          removeProcessor(processor.id);
          removePhoneByProcessor(processor.id);
          notifyDelete("Item deleted!");
        })
        .catch((error) => {
          if(error.message == "Network Error"){
            notifyDelete("Network Error! Backend is down!");
          } else{
            console.log(error);
            notifyDelete("Backend not responding!");
          }
        })
      };
    
    
      const handleDelete = () => {
        try {
          deleteData();
          setOpen(false);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ErrorResponse>;
            if (axiosError.response && axiosError.response.status === 404) {
              notifyDelete(axiosError.response.data.message);
            } else {
              notifyDelete("An unexpected error occurred.");
            }
          } else {
            notifyDelete("An unexpected error occurred.");
          }
          setOpen(false);
        }
      };
  return (
    <div>
        <div className="item">
        <Link
          to={`/processor-detail-page/${processor.id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="details">
            <p className="name">
              Name:
              <br /> {processor.name}
            </p>
            <p className="prop">Prod Year: {processor.prodYear}</p>
            <p className="prop">Speed: {processor.speed}</p>
          </div>
        </Link>
        <div className="options">
          <Link to={`/update-page-processor/${processor.id}`}>
            <AiFillEdit size={30} />
          </Link>
          <span onClick={() => openDelete()}>
            <AiFillDelete size={30} />
          </span>
          {/* <input
            type="checkbox"
            checked={checked}
            onChange={() => {
              setChecked(!checked);
              setCheck();
            }}
          /> */}
        </div>
        <ConfirmBox open={open} setOpen={setOpen} id={processor.id} handleDelete={handleDelete} message="Are you sure you want to delete this processor?" />
      </div>
    </div>
  )
}

export default ProcessorItem