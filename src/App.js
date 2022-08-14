import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Login from "./components/login/Login";
import Cookies from 'universal-cookie';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/home/Home";
import Register from "./components/register/Register";
import AlbumDetails from "./components/albumDetails/AlbumDetails";
import Update from "./components/update/Update";

function App() {
  const cookies = new Cookies();
  const token = cookies.get("User");
  const [info, setInfo] = useState([]);
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    
    axios.get("http://localhost:3010/User/user").then((res) => {
      const data = res.data;
      setInfo(data);
    });
  }, []);

  

  const ProtectedRoute = ({ user, children }) => {
    if(token){
      setLogged(true);
      <Navigate to="home/" />
    }else{
      <Navigate to="/" replace />;
    };
    return children;
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Login datos={info} setLogged={setLogged} />}
          />

          <Route
            path="home/"
            element={
              <ProtectedRoute user={logged}>
                <Home />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/signup"
            element={
                <Register />
            }
          />
          <Route
            path="/home/:album"
            element={
              <ProtectedRoute user={logged}>
                <AlbumDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home/Update"
            element={
              <ProtectedRoute user={logged}>
                <Update/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
