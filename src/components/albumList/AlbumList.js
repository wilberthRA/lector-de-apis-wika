import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";
import Searcher from "../commons/Searcher";

export default function AlbumList() {
  const [albums, setAlbums] = useState([]);
  const [filterAlbum, setFilterALbum] = useState("");

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/albums ").then((res) => {
      const data = res.data;
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
      <nav aria-label="secondary mailbox folders">
        <List>
          {albums.map(
            (album) =>
              (!filterAlbum || album?.title.startsWith(filterAlbum)) && (
                <ListItem disablePadding key={album.id}>
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
