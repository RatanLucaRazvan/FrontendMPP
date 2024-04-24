import React, { useEffect, useRef, useState } from 'react'
import PhoneItem from './PhoneItem'
import "../styles/list_page.css"
import useStore from '../global_state/phoneState';
import useFrontStore from '../global_state/frontPhoneState';
import axios from 'axios';

interface Props{
    deletablePhones: string[],
    setDeletablePhones: React.Dispatch<React.SetStateAction<string[]>>;
}

function PhonesList({deletablePhones, setDeletablePhones}: Props) {
  const {phones, addMorePhones} = useStore();
  const {frontPhones} = useFrontStore();
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  
    const fetchMorePhones = async () => {
      setLoading(true);
      // Simulate API call or fetch more data
      await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/phones`, {
        params: {
          page: page * 50 - 1,
          count: 50
        }
      })
      .then((response) => {
        addMorePhones(response.data)
      })
      .catch((error) => {
        if(error.message == "Network Error"){
          console.log("Backend is down!")
        }
        else{
            console.log("Backend not responding!");
        }
      })
  
      // setTimeout(() => {
      //   // Update your phones array with new data
      //   // Example: phones.push(newData);
      //   setLoading(false);
      // }, 1000); // Simulating a delay of 1 second
    };
  
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = listRef.current!;
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        setPage(page + 1); // Increment page number
      }
      // console.log("End of scroll");
    };
  
    // Attach scroll event listener when component mounts
    useEffect(() => {
      if (listRef.current) {
        listRef.current.addEventListener('scroll', handleScroll);
      };
      // return () => {
      //   window.removeEventListener('scroll', handleScroll);
      // };
    }, [page]);
  
    useEffect(() => {
      if(page != 0){
        fetchMorePhones();
      }
    }, [page]);

  return (
    <div className="list" ref={listRef}>
        {phones.map((phone) => (<PhoneItem phone={phone} deletablePhones={deletablePhones} setDeletablePhones={setDeletablePhones}/>))}
    </div>
  )
}

export default PhonesList