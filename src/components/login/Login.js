import React, { useState } from "react";
import {
  Grid,
  Button,
  TextField,
  dividerClasses,
  Avatar,
  Link,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import Cookies from "universal-cookie";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";

import Box from "@mui/material/Box";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { CookieSharp } from "@mui/icons-material";

export default function Login({ datos, setLogged }) {
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(true);
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSignUp = () => {
    navigate("/signup");
  };

  const navigate = useNavigate();

  const newPassword = () => {
    axios
      .post("http://localhost:3010/User/sendmail", { email: email.value })
      .then((res) => {
        const message = res.data;
        if (message) {
          setValid(true);
          handleClose();
        } else {
          setValid(false);
        }
      });
  };

  const validate = () => {
    const cookies = new Cookies();
    axios
      .post("http://localhost:3010/User/login", {
        email: email.value,
        password: password.value,
      })
      .then((res) => {
        const datos = res.data;
        if (datos.data) {
          setValid(true);
          cookies.set("User", datos.data, { path: "/" });
          navigate("/home/");
        } else {
          setValid(false);
        }
        setLogged(valid);
      });
  };

  const paperStyle = {
    padding: 20,
    height: "43vh",
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
    <Grid align="center">
      <Paper elevation={10} style={paperStyle}>
        <Grid>
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Log In </h2>
        </Grid>
        <TextField
          style={inputStyle}
          id="outlined-basic"
          onChange={(event) => setEmail(event.target)}
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
        <Button
          onClick={validate}
          variant="contained"
          fullWidth
          color="primary"
        >
          Login
        </Button>
        <p fontSize={18}>
          Don't have an account?{" "}
          <Link
            component="button"
            fontSize={18}
            onClick={() => {
              handleSignUp();
            }}
          >
            Sign Up
          </Link>
        </p>
        <Link
          component="button"
          fontSize={18}
          onClick={() => {
            handleClickOpen();
          }}
        >
          Forgot your password?
        </Link>
      </Paper>

      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        sx={{ Width: 900, Height: 600, font: 15 }}
      >
        <DialogTitle>¿Forgot password?</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Put your email to get the new password
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="email"
            onChange={(event) => setEmail(event.target)}
            label="email"
            type="email"
            fullWidth
            error={!valid}
            helperText={!valid ? "Wrong data" : " "}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={newPassword}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
