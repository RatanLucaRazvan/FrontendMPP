import React, { useEffect, useState } from 'react'
import "../styles/detail_page.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AccountPage() {

    const [mail, setMail] = useState<string>("");
    const [firstname, setFirstname] = useState<string>("");
    const [lastname, setLastname] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [birth, setBirth] = useState<string>("");
    const navigator = useNavigate();
    const getInfo = async () => {
        const token = localStorage.getItem('token');
        console.log(token);
        await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/accountdetails`, {headers:
            {"authorization" : `Bearer ${token}`}
        })
        .then(response => {
            setMail(response.data.mail)
            setFirstname(response.data.firstname)
            setLastname(response.data.lastname)
            setPhone(response.data.phone)
            setBirth(response.data.birth)
        })
        .catch(error =>{
            navigator("/");
        })
    }
    useEffect(() => {
        if(localStorage.getItem("token")){
            getInfo();
        }
    }, []);
  return (
    <div className="home_detail">
    <h1 className="heading_detail">Account Info</h1>
    <div className="details_box">
      <p className="detail">Mail: {mail}</p>
      <p className="detail">Firstname: {firstname}</p>
      <p className="detail">Lastname: {lastname}</p>
      <p className="detail"> Birth: {birth.substring(0,10)}</p>
      <p className="detail"> Phone: {phone}</p>
    </div>
  </div>
  )
}

export default AccountPage