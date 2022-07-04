import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";
import Searcher from "../commons/Searcher";
import { useParams, useNavigate } from "react-router-dom";

export default function AlbumList(props) {
  let {id}  = useParams();
  const [albums, setAlbums] = useState([]);
  const [filterAlbum, setFilterALbum] = useState("");
  let navigate = useNavigate();

  useEffect(()=>{
    if(filterAlbum){
      navigate("/home/Leanne Graham/"+filterAlbum+"")
    }
  });
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/albums ").then((res) => {
      const data = [];
      const busqueda = res.data.map((filtro)=>{
        if(filtro.userId == id){
          data.push(filtro);
        } 
      } );
      setAlbums(data);
    });
  }, []);

  return (
    <div>
      <Searcher
        label="Album"
        items={albums}
        setFilter={setFilterALbum}
      ></Searcher>
      <div sx="backgroundColor:red">hola {filterAlbum}</div>
      {console.log(albums)}
      <nav aria-label="secondary mailbox folders">
        <List>
          {albums.map(
            (album) =>
              (!filterAlbum || album?.title.startsWith(filterAlbum)) && (
                <ListItem disablePadding key={album.id} >
                  <ListItemButton>
                    <ListItemText primary={album.title} /> 
                  </ListItemButton>
                </ListItem>
              )
          )}
        </List>
      </nav>
    </div>
  );
}
