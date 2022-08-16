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

export default function CreateAlbumDialog({
  open,
  close,
  title,
  button,
  album,
  reload
}) {
  const [name, setName] = useState(album?.name || "");
  const [description, setDescription] = useState(album?.description || "");

  const updateAlbum = () => {
    const form = {
      userId: album.userId,
      name,
      description,
    };
    console.log(form);
    if (album?.name) {
      
      axios.put(`http://localhost:3010/album/${album.id}`,form).then((res) => {
        if (res.status === 200) {
          console.log("res ",res);
          reload(res.data.data);
        }
      });
    }else{
      axios.post(`http://localhost:3010/album`,form).then((res) => {
        if (res.status === 201) {
          console.log("res ",res);
          reload(res.data.data);

        }
      });
    }
    close()
  };

  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Album name"
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
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={updateAlbum}>{button}</Button>
      </DialogActions>
    </Dialog>
  );
}
