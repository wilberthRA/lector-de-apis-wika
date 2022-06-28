import React, { useState } from 'react';

import { Button,TextField } from '@mui/material';
import './Login.css';


export default function Login(props) {
  const [user,setUser] = useState('');
  const [password,setPassword] = useState('');  
  const validar = ()=>{
    const resultado = props.datos.find((validacion)=>validacion.name === user.value || validacion.username === user.value && validacion.address.zipcode === password.value);
    if(resultado){
      console.log("bienvenido");
    }else{
      console.log("no se encuentra")
    }
  };
  
  return (
    <div>
        <div className='container'>
        <TextField id="outlined-basic" onChange={event=> setUser(event.target)}  label="Username or email" variant="outlined" margin="dense" /><br/>
        <TextField id="outlined-basic" onChange={event=> setPassword(event.target)} label="Password" variant="outlined" margin="dense"/><br/>
        <Button onClick={validar} variant="contained">Contained</Button>
        </div>
    </div>
  )
}

