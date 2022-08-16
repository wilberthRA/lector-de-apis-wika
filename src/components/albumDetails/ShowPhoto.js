import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export default function showPhoto({ open, close, item }) {
  const content = {
    maxWidth: "500px",
  };

  const image = {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
  };
  return (
    <Dialog open={open}>
      <DialogTitle>{item.name}</DialogTitle>
      <DialogContent style={content}>
        <img
          style={image}
          src={`${item.photo}?w=164&h=164&fit=crop&auto=format`}
          srcSet={`${item.photo}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
          alt={item.name}
          loading="lazy"
        ></img>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}
