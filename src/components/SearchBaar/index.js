import React from "react";
import { Box, Typography, Input, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./index.css";

const SearchInputWithIcon = () => {
  const ariaLabel = { "aria-label": "description" };
  return (
    <Box
      style={{
        padding: "30px",
        textAlign: "left",
        display: "flex",
        justifyContent: "space-between",
        flexWrap:"wrap"
      }}
    >
      <Typography
        style={{
          fontSize: "26px",
          display: "inline-block",
          paddingLeft: "20px",
        }}
        className="kanit-bold"
      >
        Menu
      </Typography>
      <Input
        className="search-input"
        placeholder="Search"
        inputProps={ariaLabel}
        style={{ width: "200px" }}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </Box>
  );
};

export default SearchInputWithIcon;
