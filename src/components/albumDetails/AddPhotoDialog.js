import React, { useState, useEffect } from "react";
import axios from "axios";
//Material
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export default function AddPhotoDialog({
  open,
  close,
  title,
  button,
  photo,
  reload,
}) {
  const [name, setName] = useState(photo?.name || "");
  const [description, setDescription] = useState(photo?.description || "");
  const [photoSelected, setPhotoSelected] = useState(photo?.photo || "");

  const updateAlbum = () => {
    const form = {
      albumId: photo.albumId,
      name,
      description,
      photo: photoSelected,
    };
    console.log(form);
    if (photo?.name) {
      axios.put(`http://localhost:3010/photo/${photo.id}`, form).then((res) => {
        if (res.status === 200) {
          console.log("res ", res);
          reload(res.data.data);
        }
      });
    } else {
      axios.post(`http://localhost:3010/photo`, form).then((res) => {
        if (res.status === 201) {
          console.log("res ", res);
          reload(res.data.data);
        }
      });
    }
    close();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Photo name"
          type="text"
          fullWidth
          variant="standard"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <TextField
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />

        <TextField
          margin="dense"
          id="photo"
          label="Photo URL"
          type="text"
          fullWidth
          variant="standard"
          value={photoSelected}
          onChange={(event) => {
            setPhotoSelected(event.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={updateAlbum}>{button}</Button>
      </DialogActions>
    </Dialog>
  );
}
