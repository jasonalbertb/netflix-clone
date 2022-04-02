import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../constants/routes";
import {getShowsByType} from "../services/firebase";
//context
import {BrowseContext} from "../context/BrowseContext";
import {useGlobalContext} from "../context/globalContext";
//components
import {Spinner} from "../components/loading/Spinner";
import {BrowseRows} from "../components/BrowseRows"; 
export const BrowseTab = () => {
  const {tabOpen} = useContext(BrowseContext);
  const {setIsError} = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);
  const [shows, setShows] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    (async()=>{
      try {
        const data = await getShowsByType(tabOpen);
        setShows(data);
        setIsLoading(false);
      } catch (error) {
        setIsError(error);
        navigate(ROUTES.ERR);
      }
    })()
  }, [tabOpen, navigate, setIsError])
  if (isLoading) {
    return <Spinner />
  }
  return (
    <div className='bg-gray-dark text-white '>
      <div className='bg-transparent translate-y-[-3rem]'>
        {[...new Set(shows.map(show=>show.genre))].map((genre, i)=>{
          return  <BrowseRows key={i} genre={genre} list={shows.filter(show=> show.genre === genre)}/>
        })}
      </div>
    </div>
  )
}
