import React from 'react'
import PhoneItem from './PhoneItem'
import "../styles/list_page.css"
import useStore from '../global_state/phoneState';

interface Props{
    deletablePhones: number[],
    setDeletablePhones: React.Dispatch<React.SetStateAction<number[]>>;
}

function PhonesList({deletablePhones, setDeletablePhones}: Props) {
  const {phones} = useStore();
  return (
    <div className="list">
        {phones.map((phone) => (<PhoneItem phone={phone} deletablePhones={deletablePhones} setDeletablePhones={setDeletablePhones}/>))}
    </div>
  )
}

export default PhonesList