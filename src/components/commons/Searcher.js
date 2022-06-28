import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function Searcher({ label, items, setFilter }) {
  const handleChange = (e) => {
    console.log(e.target.value);
    setFilter(e.target.value);
  };

  return (
    <Autocomplete
      sx={{ marginTop: "15px" }}
      freeSolo
      id="search"
      disableClearable
      onChange={(event, newValue) => {
        setFilter(newValue);
      }}
      options={items.map((option) => option.title)}
      renderInput={(params) => (
        <TextField
          onChange={handleChange}
          {...params}
          label={`Search ${label}`}
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
        />
      )}
    />
  );
}
