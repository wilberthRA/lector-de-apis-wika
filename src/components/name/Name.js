import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

export default function Name() {
  const [info,setInfo] = useState([]);
  const {id}  = useParams();
useEffect(()=> {
  axios.get('https://jsonplaceholder.typicode.com/users')
  .then(res =>{
    const data = res.data.find((filtro)=> filtro.id == id);
    setInfo(data);
  });
},[])
  return (
    <div>Bienvenido {info.name}</div>
  )
}
