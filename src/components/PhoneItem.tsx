import React, { useEffect, useState } from "react";
import { Phone } from "../model";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import ConfirmBox from "./ConfirmBox";
import "../styles/item.css";
import useStore from "../global_state/phoneState";

interface Props {
  phone: Phone;
  deletablePhones: string[],
  setDeletablePhones: React.Dispatch<React.SetStateAction<string[]>>,
}

function PhoneItem({ phone, deletablePhones, setDeletablePhones}: Props) {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const {phones} = useStore();
  // const router = createBrowserRouter(
  //     createRoutesFromElements(
  //       <Route
  //         element={<UpdatePage phone={phone} phones={phones} setPhones={setPhones} />}
  //         path="/update-page"/>
  //     )
  //   );

  // const[checked, setChecked] =useState(false);

  useEffect(() => {
    setChecked(false);
  }, [phones]);

  function openDelete() {
    setOpen(true);
  }

  const setCheck = () => {
    if(checked == false){
      setDeletablePhones([
        ...deletablePhones,
        phone.id
      ]);
    } else{
      setDeletablePhones(deletablePhones.filter((currId) => currId !== phone.id));
    }
  }
  return (
    <div>
      <div className="item">
        <Link
          to={`/detail-page/${phone.id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="details">
            <p className="name">
              Name:
              <br /> {phone.name}
            </p>
            <p className="prop">Price: {phone.price}</p>
            <p className="prop">Year: {phone.prodYear}</p>
          </div>
        </Link>
        <div className="options">
            <Link to={`/update-page/${phone.id}`}>
              <AiFillEdit size={30} />
            </Link>
            <span onClick={() => openDelete()}>
              <AiFillDelete size={30} />
            </span>
            <input type="checkbox" checked={checked} onChange={() => {setChecked(!checked); setCheck();}}/>
        </div>
        <ConfirmBox
          open={open}
          setOpen={setOpen}
          id={phone.id}
        />
      </div>
    </div>
  );
}

export default PhoneItem;
