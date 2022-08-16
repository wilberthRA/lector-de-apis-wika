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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
//Dialog
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CreateAlbumDialog from "./CreateAlbumDialog";

export default function AlbumList(props) {
  const { id } = useParams();
  const [albums, setAlbums] = useState([]);
  const [filterAlbum, setFilterALbum] = useState("");
  const [open, setOpen] = React.useState(false);
  const [currentId, setCurrentId] = useState("");
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState("");
  const [user, setUser] = useState("");

  const navigate = useNavigate();

  const handleClick = (albumId) => {
    navigate(`/home/${id}/${albumId}`);
  };
  useEffect(() => {
    const userId = "62db5911cfb5d8a60fc3a74d";
    setUser(userId);
    axios.get(`http://localhost:3010/album/user/${userId}`).then((res) => {
      let data = [];
      res.data.data.map((filtro) => {
        data.push(filtro);
      });
      setAlbums(data);
    });
  }, []);

  const deleteAlbum = () => {
    const albumId = currentId;
    axios.delete(`http://localhost:3010/album/${albumId}`).then((res) => {
      if (res.status === 200) {
        const newAlbums = albums.filter((v) => v._id !== albumId);
        setAlbums(newAlbums);
        handleClose();
      }
    });
  };

  const reloadAlbums = (newAlbum) => {
    const filteredAlbum = albums.filter((album) => album._id !== newAlbum._id);
    setAlbums([...filteredAlbum, newAlbum]);
  };

  const handleClickOpen = (albumId) => {
    setCurrentId(albumId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openCreateDialog = () => {
    setSelectedAlbum({ userId: user });
    setOpenCreateModal(true);
  };

  const closeCreateDialog = () => {
    setOpenCreateModal(false);
  };

  const openEditDialog = (id, name, description, userId) => {
    setSelectedAlbum({ id, name, description, userId });
    setOpenEditModal(true);
  };

  const closeEditDialog = () => {
    setOpenEditModal(false);
  };

  const CreateModal = openCreateModal ? (
    <CreateAlbumDialog
      open={openCreateModal}
      close={closeCreateDialog}
      title="New Album"
      button="Create"
      album={selectedAlbum}
      reload = {reloadAlbums}
    />
  ) : (
    ""
  );
  const EditModal = openEditModal ? (
    <CreateAlbumDialog
      open={openEditModal}
      close={closeEditDialog}
      title="Edit Album"
      button="Edit"
      album={selectedAlbum}
      reload = {reloadAlbums}
    />
  ) : (
    ""
  );

  const paperStyle = {
    padding: 20,
    height: "auto",
    width: "80%",
    margin: "25px auto",
  };
  const createButton = {
    display: "flex",
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Typography variant="h4" component="h4">
            My Albums
          </Typography>
          <div style={createButton}>
            <Button variant="contained" onClick={openCreateDialog}>
              Create Album
            </Button>
          </div>
          <Searcher
            label="Album"
            items={albums}
            setFilter={setFilterALbum}
          ></Searcher>
          <nav aria-label="secondary mailbox folders">
            <List>
              {albums.map(
                (album) =>
                  (!filterAlbum || album?.name.startsWith(filterAlbum)) && (
                    <ListItem disablePadding key={album._id}>
                      <ListItemButton>
                        <ListItemText
                          primary={album.name}
                          secondary={
                            <React.Fragment>{album.description}</React.Fragment>
                          }
                        />
                        <ListItemIcon onClick={() => handleClick(album._id)}>
                          <ImageSearchIcon />
                        </ListItemIcon>
                        <ListItemIcon>
                          <EditIcon
                            onClick={() =>
                              openEditDialog(
                                album._id,
                                album.name,
                                album.description,
                                album.userId
                              )
                            }
                          />
                        </ListItemIcon>
                        <ListItemIcon
                          onClick={() => handleClickOpen(album._id)}
                        >
                          <DeleteIcon />
                        </ListItemIcon>
                      </ListItemButton>
                    </ListItem>
                  )
              )}
            </List>
          </nav>
        </Grid>
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText>
            are you sure do want delete it?{" "}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={deleteAlbum}>Delete</Button>
        </DialogActions>
      </Dialog>
      {CreateModal}
      {EditModal}
    </Grid>
  );
}
