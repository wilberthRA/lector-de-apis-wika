import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
//photoList
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
//Dialog show photo
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import Searcher from "../commons/Searcher";
import Navigation from "../navigation/Navigation";
import { autocompleteClasses, Grid, Paper } from "@mui/material";
import { width } from "@mui/system";
import AddPhotoDialog from "./AddPhotoDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogContentText from "@mui/material/DialogContentText";
import EditIcon from "@mui/icons-material/Edit";


export default function AlbumDetails() {
  const { album } = useParams();
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState([]);
  const [photo, setPhoto] = useState([]);
  const [filterPhoto, setFilterPhoto] = useState("");
  const [open, setOpen] = React.useState(false);
  const [albumId, setAlbumId] = useState();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState("");

  const handleClickOpen = (photoId) => {
    setSelectedPhoto(photoId)
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setAlbumId("62ec99f7018d6466c649b7ae");
    axios
      .get(`http://localhost:3010/photo/album/62ec99f7018d6466c649b7ae`)
      .then((res) => {
        const data = res.data.data;
        setPhotos(data);
      });
  }, []);

  const openCreateDialog = () => {
    setSelectedPhoto({ albumId: albumId });
    setOpenCreateModal(true);
  };
  const closeCreateDialog = () => {
    setOpenCreateModal(false);
  };
  const reloadPhotos = (newPhoto) => {
    const filteredPhoto = photos.filter((photo) => photo._id !== newPhoto._id);
    setPhotos([...filteredPhoto, newPhoto]);
  };

  const deletePhoto = () => {
    const photoId = selectedPhoto;
    axios.delete(`http://localhost:3010/photo/${photoId}`).then((res) => {
      if (res.status === 200) {
        const newPhotos = photos.filter((v) => v._id !== photoId);
        setPhotos(newPhotos);
        handleClose();
      }
    });
  };

  const openEditDialog = (id, name, description, photo, albumId) => {
    setSelectedPhoto({ id, name, description, photo, albumId });
    setOpenEditModal(true);
  };

  const closeEditDialog = () => {
    setOpenEditModal(false);
  };

  const CreateModal = openCreateModal ? (
    <AddPhotoDialog
      open={openCreateModal}
      close={closeCreateDialog}
      title="New Album"
      button="Create"
      photo={selectedPhoto}
      reload={reloadPhotos}
    />
  ) : (
    ""
  );

  const EditModal = openEditModal ? (
    <AddPhotoDialog
      open={openEditModal}
      close={closeEditDialog}
      title="Edit Photo"
      button="Edit"
      photo={selectedPhoto}
      reload = {reloadPhotos}
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
    <div>
      <Navigation />
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Typography variant="h4" component="h4">
              Photos
            </Typography>
            <div style={createButton}>
              <Button variant="contained" onClick={openCreateDialog}>
                Add photo
              </Button>
            </div>
            <Searcher label="Photo" items={photos} setFilter={setFilterPhoto} />
            <ImageList cols={4}>
              {photos.map((item) => {
                if (!filterPhoto || item?.name.startsWith(filterPhoto)) {
                  return (
                    <ImageListItem
                      key={item._id}
                    >
                      <img
                        src={`${item.photo}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item.photo}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                      />
                      <ImageListItemBar
                        title={item.name}
                        subtitle={item.description}
                        actionIcon={
                          <div>
                          <IconButton
                            sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                            aria-label={`Edit photo ${item.name}`}
                            onClick={() => openEditDialog(
                              item._id,
                              item.name,
                              item.description,
                              item.photo,
                              item.albumId)}
                          >
                            <EditIcon />
                          </IconButton>
                          
                          <IconButton
                            sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                            aria-label={`Delete photo ${item.name}`}
                            onClick={() => handleClickOpen(item._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                          </div>
                        }
                      />
                    </ImageListItem>
                  );
                }
                return;
              })}
            </ImageList>
          </Grid>
        </Paper>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText>
            are you sure do want delete it?{" "}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={deletePhoto}>Delete</Button>
        </DialogActions>
      </Dialog>
      {CreateModal}
      {EditModal}
    </div>
  );
}
