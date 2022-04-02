import React from 'react'
import {useGlobalContext} from "../context/globalContext";
const Error = () => {
  const {isError} = useGlobalContext();
  return (
    <div>{(isError && isError.message) || "Something went wrong"}</div>
  )
}

export default Error