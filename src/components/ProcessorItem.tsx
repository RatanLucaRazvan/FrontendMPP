import { useState } from 'react'
import { Processor } from '../model/Processor'
import ConfirmBox from './ConfirmBox';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '../errors/error';
import useProcessorStore from '../global_state/processorState';
import { toast } from 'react-toastify';
import useStore from '../global_state/phoneState';
import { FrontProcessor } from '../model/FrontProcessor';
import useFrontProcessorStore from '../global_state/frontProcessorsStore';
import useFrontStore from '../global_state/frontPhoneState';
import { FrontPhone } from '../model/FrontPhone';


interface Props{
    processor: Processor
}
function ProcessorItem({processor}: Props) {
    const {removeProcessor} = useProcessorStore();
    const {removePhoneByProcessor, phones} = useStore();
    const {removeFrontProcessor, frontProcessors, addFrontProcessor, updateFrontProcessor} = useFrontProcessorStore();
    const {removeFrontPhoneByProcessor, frontPhones, addFrontPhone, removeFrontPhone, updateFrontPhone} = useFrontStore();
    const [open, setOpen] = useState(false);

    function openDelete() {
        setOpen(true);
      }

      const notifyDelete = (message: string) => {
        toast.info(message);
      };
    
      const deleteData = async () => {
        await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/processors/${processor.id}`)
        .then(() =>{
          removeProcessor(processor.id);
          removePhoneByProcessor(processor.id);
          notifyDelete("Item deleted!");
        })
        .catch((error) => {
          let newFrontProcessor: FrontProcessor = {id: processor.id,
            name: processor.name,
            prodYear: processor.prodYear,
            speed: processor.speed,
            deleted: true,
            updated: false}
          let found = false;
          let updated = false;
          for(let i = 0; i < frontProcessors.length; i++){
            if(frontProcessors[i].id == newFrontProcessor.id){
              if(frontProcessors[i].updated === false){
                found = true;
                removeFrontProcessor(newFrontProcessor.id);
              } else{
                updated = true;
              }
            }
          }
          if(!found){
            if(updated === false){
              addFrontProcessor(newFrontProcessor)
            } else{
              newFrontProcessor.updated = true;
              updateFrontProcessor(newFrontProcessor.id, newFrontProcessor)
            }
          }
          for(let i = 0; i < phones.length; i++){
            if(phones[i].processorId == processor.id){
                // console.log(phones[i])
                // console.log(frontPhones)
                const currPhoneId = phones[i].id
                // const phone = frontPhones.find((p) => {p.id === currPhoneId});
                var phone = undefined;
                for(let j = 0; j < frontPhones.length; j++){
                  console.log(frontPhones[j].id)
                  console.log(currPhoneId)
                  if(frontPhones[j].id == currPhoneId){
                    phone = frontPhones[j];
                    break;
                  }
                }
                let frontPhone: FrontPhone = {id: phones[i].id,
                    processorId: processor.id,
                    price: phones[i].price,
                    name: phones[i].name,
                    prodYear: phones[i].prodYear,
                    description: phones[i].description,
                    deleted: true,
                    updated: false
                }
                console.log(phone)
                if(!phone){
                    addFrontPhone(frontPhone)
                } else{
                    if(phone.updated = false){
                        removeFrontPhone(phone.id)
                    }
                    else{
                        updateFrontPhone(phone.id, frontPhone)
                    }

                }
            }
          }
          removeProcessor(processor.id);
          // removeFrontPhoneByProcessor(processor.id)
          removePhoneByProcessor(processor.id);
          notifyDelete("Processor deleted in front");
          // if(error.message == "Network Error"){
          //   notifyDelete("Network Error! Backend is down!");
          // } else{
          //   console.log(error);
          //   notifyDelete("Backend not responding!");
          // }
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
        <ConfirmBox open={open} setOpen={setOpen} handleDelete={handleDelete} message="Are you sure you want to delete this processor?" />
      </div>
    </div>
  )
}

export default ProcessorItem