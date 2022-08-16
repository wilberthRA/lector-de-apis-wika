import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";
import Searcher from "../commons/Searcher";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Container, Grid, Paper } from "@mui/material";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";

export default function AlbumList(props) {
  const [albums, setAlbums] = useState([]);
  const [filterAlbum, setFilterALbum] = useState("");
  const navigate = useNavigate();

  const handleClick = (albumId) => {
    navigate(`/home/`);
  };
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/albums ").then((res) => {
      const data = [];
      res.data.map((filtro) => {
        if (filtro.userId == 0) {
          data.push(filtro);
        }
      });
      setAlbums(data);
    });
  }, []);

  const paperStyle = {
    padding: 20,
    height: "auto",
    width: "80%",
    margin: "25px auto",
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Typography variant="h4" component="h4">
            My Albums
          </Typography>
          <Searcher
            label="Album"
            items={albums}
            setFilter={setFilterALbum}
          ></Searcher>
          <nav aria-label="secondary mailbox folders">
            <List>
              {albums.map(
                (album) =>
                  (!filterAlbum || album?.title.startsWith(filterAlbum)) && (
                    <ListItem disablePadding key={album.id}>
                      <ListItemButton onClick={() => handleClick(album.id)}>
                        <ListItemIcon>
                          <ImageSearchIcon />
                        </ListItemIcon>
                        <ListItemText primary={album.title} />
                      </ListItemButton>
                    </ListItem>
                  )
              )}
            </List>
          </nav>
        </Grid>
      </Paper>
    </Grid>
  );
}
