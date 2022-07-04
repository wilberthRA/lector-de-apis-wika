import * as React from 'react';
import { useEffect,useState } from 'react';
import axios from 'axios';
import './App.css';
import Login from './components/login/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/home/Home';
import Error from './components/Error/ErrorPage';
import AlbumDetails from './components/albumDetails/AlbumDetails';

function App() {
  const [info,setInfo] = useState([]);
  useEffect(()=> {
    /* document.title = `You clicked ${count} times` */
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res =>{
      const data = res.data;
      console.log(data);
      setInfo(data);
    });
  },[])
  return (
    <div>
      <Router> 
        <Routes>
          <Route path="/home/:username" element={<Home/>}/>
          <Route path="/" element={<Login datos={info} />}/>
          <Route path="/home/:username/:album" element={ <AlbumDetails/> }/>
          <Route path="*" element={<Error/>}/>
        </Routes> 
    </Router>
    </div>
  );
}

export default App;
