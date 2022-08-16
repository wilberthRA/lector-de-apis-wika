import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Login from "./components/login/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/home/Home";
import AlbumDetails from "./components/albumDetails/AlbumDetails";

function App() {
  const [info, setInfo] = useState([]);
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      const data = res.data;
      setInfo(data);
    });
  }, []);

  const ProtectedRoute = ({ user, children }) => {
    if (!user) {
      return <Navigate to="/" replace />;
    }
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
            path="home/:id"
            element={
              <Home />
              // <ProtectedRoute user={logged}>
              //   <Home />
              // </ProtectedRoute>
            }
          />

          <Route
            path="/home/:id/:album"
            element={
              <AlbumDetails />
              // <ProtectedRoute user={logged}>
              //   <AlbumDetails />
              // </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
