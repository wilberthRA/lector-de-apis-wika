import React, { useState } from "react";
import { Grid, Button, TextField, dividerClasses, Avatar } from "@mui/material";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";

import Box from "@mui/material/Box";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function Login({ datos, setLogged }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(true);
  const navigate = useNavigate();

  const validar = () => {
    const resultado = datos.find(
      (validacion) =>
        (validacion.email === user.value ||
          validacion.username === user.value) &&
        validacion.address.zipcode === password.value
    );
    if (resultado) {
      setValid(true);
      navigate("/home/" + resultado.id + "");
    } else {
      setValid(false);
    }
    setLogged(valid);
  };

  const paperStyle = {
    padding: 20,
    height: "35vh",
    width: 280,
    margin: "250px auto",
  };

  const avatarStyle = {
    backgroundColor: "#1bbd7e",
  };

  const inputStyle = {
    marginBottom: 15,
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Log In </h2>
        </Grid>
        <TextField
          style={inputStyle}
          id="outlined-basic"
          onChange={(event) => setUser(event.target)}
          label="Username or Email"
          variant="outlined"
          fullWidth
          required
          error={!valid}
          helperText={!valid ? "Wrong data" : " "}
        />
        <TextField
          style={inputStyle}
          id="outlined-basic"
          onChange={(event) => setPassword(event.target)}
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          required
          error={!valid}
          helperText={!valid ? "Wrong data" : " "}
        />
        <Button onClick={validar} variant="contained" fullWidth color="primary">
          Login
        </Button>
      </Paper>
    </Grid>
  );
}
