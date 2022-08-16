import React, { useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  Link,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";

export default function Update() {
  const cookies = new Cookies();
  const token = jwt_decode(cookies.get("User"));
  const [name, setName] = useState(token.name);
  const [lastName, setLastName] = useState(token.lastName);
  const [email, setEmail] = useState(token.email);
  const [password, setPassword] = useState({
    password: "",
    showPassword: false,
  });
  const [confPassword, setConfPassword] = useState({
    password: "",
    showPassword: false,
  });
  const [dateOfBirth, setDateOfBirth] = useState(token.dateOfBirth);
  const [gender, setGender] = useState(token.gender);
  const navigate = useNavigate();

  const update = () => {
    if (password.password === confPassword.password) {
      axios
        .put("http://localhost:3010/User/update/" + token._id + "", {
          name: name,
          lastName: lastName,
          email: email,
          password: password.password ? password.password : token.password,
          dateOfBirth: dateOfBirth,
          gender: gender,
        })
        .then((res) => {
          const token = res.data;
          if (token) {
            cookies.set("User", token.data, { path: "/" });
            navigate("/home/");
          }
        });
    }
  };

  const handleNavHome = () => {
    navigate("/home");
  };
  const handleChange = (prop) => (event) => {
    setPassword({ ...password, [prop]: event.target.value });
  };
  const handleChangeConf = (prop) => (event) => {
    setConfPassword({ ...password, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setPassword({
      ...password,
      showPassword: !password.showPassword,
    });
  };
  const handleClickShowConfPassword = () => {
    setConfPassword({
      ...confPassword,
      showPassword: !password.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Grid>
      <Paper
        elevation={20}
        sx={{ padding: "30px 20px", width: 300, margin: "20px auto" }}
      >
        <Grid align="center">
          <h1>Account</h1>
        </Grid>
        <Stack spacing={3}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            label="Name"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="lastName"
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
            label="Last name"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            label="Email"
            type="email"
            fullWidth
            variant="standard"
          />
          <FormControl sx={{ m: 1 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              {" "}
              New password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={password.showPassword ? "text" : "password"}
              value={password.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {password.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="New password"
            />
          </FormControl>
          <FormControl sx={{ m: 1 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Confirm password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={confPassword.showPassword ? "text" : "password"}
              value={confPassword.password}
              onChange={handleChangeConf("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {confPassword.showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="confirm password"
            />
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              id="dateOfBirth"
              label="date of birth"
              inputFormat="dd/MM/yyyy"
              value={dateOfBirth}
              onChange={(newValue) => {
                setDateOfBirth(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <h3>Gender</h3>
          <RadioGroup
            aria-labelledby="Radio button"
            label="Gender"
            name="Radio button"
            value={gender}
            onChange={(event) => {
              setGender(event.target.value);
            }}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
          <Button
            variant="contained"
            onClick={update}
            fullWidth
            color="primary"
          >
            Update
          </Button>
          <Button
            variant="contained"
            onClick={handleNavHome}
            fullWidth
            color="primary"
          >
            Cancel
          </Button>
        </Stack>
      </Paper>
    </Grid>
  );
}
