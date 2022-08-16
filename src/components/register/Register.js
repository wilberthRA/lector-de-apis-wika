import { Grid, Paper, TextField, Link, Radio, RadioGroup,
         FormControlLabel, Button, Stack, FormControl, InputLabel,
         OutlinedInput, InputAdornment, IconButton } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import React, {useState} from 'react'

export default function Register() {

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({password: "", showPassword: false,});
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setPassword({ ...password, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setPassword({
      ...password,
      showPassword: !password.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const register = ()=>{
    axios.post("http://localhost:3010/User/signup",
    {name: name, lastName: lastName, email: email, password: password.password, dateOfBirth: dateOfBirth, gender: gender})
    .then(
      res =>{
        const message = res.data;
          if(message){
            navigate("/");
          }
        

      }
    )  
  }
  return (
    <Grid>
        <Paper elevation={20} sx={{padding:"30px 20px", width:300, margin:"20px auto"}}>
          <Grid align="center">
          <h1>Sign Up</h1>

          </Grid>
          <Stack spacing={3}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            onChange={(event)=> {setName(event.target.value)}}
            label="Name"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="lastName"
            onChange={(event)=> {setLastName(event.target.value)}}
            label="Last name"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            onChange={(event)=> {setEmail(event.target.value)}}
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            />
            <FormControl  sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
              
                id="outlined-adornment-password"
                type={password.showPassword ? 'text' : 'password'}
                value={password.password}
                onChange={handleChange('password')}
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
                label="Password"
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
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
            <Button type='submit' onClick={register} variant="contained" fullWidth color="primary">Sing Up</Button>
            </Stack>
          <p >you have an account? <Link  component="button"
            fontSize={18}
            onClick={() => {
              navigate("/")
            }}>Sign in</Link></p>
          
        </Paper>
    </Grid>
  )
}
