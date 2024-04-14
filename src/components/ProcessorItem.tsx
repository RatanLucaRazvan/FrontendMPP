import React, { useState } from 'react'
import { Processor } from '../model/Processor'
import ConfirmBox from './ConfirmBox';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';


interface Props{
    processor: Processor
}
function ProcessorItem({processor}: Props) {
    const [open, setOpen] = useState(false);

    function openDelete() {
        setOpen(true);
      }
  return (
    <div>
        <div className="item">
          <div className="details">
            <p className="name">
              Name:
              <br /> {processor.name}
            </p>
            <p className="prop">Price: {processor.prodYear}</p>
            <p className="prop">Year: {processor.speed}</p>
          </div>
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
        <ConfirmBox open={open} setOpen={setOpen} id={processor.id} />
      </div>
    </div>
  )
}

export default ProcessorItem