import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
//photoList
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function AlbumDetails() {
  const { album } = useParams();
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState([]);
  const [photo, setPhoto] = useState([]);
  const [filterPhoto,setFilterPhoto] = useState("")

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (title, photo) => {
    setTitle(title);
    setPhoto(photo);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/photos ").then((res) => {
      const data = res.data;
      setPhotos(data);
    });
  }, []);

  return (
    <div>
      AlbumDetails {album}
      <Searcher label="Photo" items={photos} setFilter={setFilterPhoto} />
      <ImageList>
        {photos.map((item) => {
          if (item?.albumId === parseInt(album)) {
            if(!filterPhoto || item?.title.startsWith(filterPhoto)){
            return (
              <ImageListItem
                key={item.id}
                onClick={() => handleClickOpen(item.title, item.url)}
              >
                <img
                  src={`${item.thumbnailUrl}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.thumbnailUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={item.title}
                  actionIcon={
                    <IconButton
                      sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                      aria-label={`info about ${item.title}`}
                    ></IconButton>
                  }
                />
              </ImageListItem>
            );
          }}
          return;
        })}
      </ImageList>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <img
            src={`${photo}`}
            srcSet={`${photo}`}
            alt={title}
            loading="lazy"
          />
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
