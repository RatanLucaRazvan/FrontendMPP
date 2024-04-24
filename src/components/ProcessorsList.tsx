import useProcessorStore from '../global_state/processorState'
import ProcessorItem from './ProcessorItem';
import "../styles/list_page.css"
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';


function ProcessorsList() {
    const {processors, addMoreProcessors} = useProcessorStore();
    const [page, setPage] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const listRef = useRef<HTMLDivElement>(null);
  
    const fetchMoreProcessors = async () => {
      setLoading(true);
      // Simulate API call or fetch more data
      await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/processors`, {
        params: {
          page: page * 50 - 1,
          count: 50
        }
      })
      .then((response) => {
        addMoreProcessors(response.data)
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
        // fetchMoreProcessors();
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
        fetchMoreProcessors();
      }
    }, [page]);
  return (
    <div className="list" ref={listRef}>
        {processors.map((processor) => (<ProcessorItem processor={processor} />))}
        {/* {loading && <p>Loading...</p>} */}
        </div>
  )
}

export default ProcessorsList