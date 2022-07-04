import React, { useState } from 'react';
import { Grid, Button,TextField } from '@mui/material';
import './Login.css';
import { useNavigate } from "react-router-dom";
import { Container } from '@mui/system';


export default function Login(props) {
  const [user,setUser] = useState('');
  const [password,setPassword] = useState('');  
  let navigate = useNavigate();
  const validar = ()=>{
    const resultado = props.datos.find((validacion)=>(validacion.name === user.value || validacion.username === user.value) && validacion.address.zipcode === password.value);
    if(resultado){
      console.log("bienvenido"+ resultado.name);
      navigate("/home/"+resultado.username+"");
    }else{
      console.log("no se encuentra")
    }
  };
  
  return (
        <Container maxWidth="xl">
          <Grid container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
          >
            <TextField id="outlined-basic" onChange={event=> setUser(event.target)}  label="Username or email" variant="outlined" margin="dense" /><br/>
            <TextField id="outlined-basic" onChange={event=> setPassword(event.target)} label="Password" variant="outlined" margin="dense"/><br/>
            <Button onClick={validar} variant="contained">Contained</Button>
          </Grid>            
        </Container>
  )
}

