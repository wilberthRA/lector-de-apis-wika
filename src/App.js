import * as React from 'react';
import { useEffect,useState } from 'react';
import axios from 'axios';
import './App.css';
import Login from './components/login/Login';

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
    <div className="App">
      <Login datos={info} ></Login>
    </div>
  );
}

export default App;
