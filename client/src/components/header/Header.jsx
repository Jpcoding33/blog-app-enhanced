import React from "react";
import { Box, Typography } from "@mui/material";

export default function Header() {
  const boxStyle = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
  };
  const imageStyle = {
    width: "100%",
    height: "450px",
    marginTop: "110px",
    objectFit: "cover",
  };
  return (
    <React.Fragment>
      <Box sx={{ marginTop: "3rem" }}>
        <Box sx={boxStyle}>
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontFamily: "Lora, serif",
            }}
          >
            Explore, Learn, and Share
          </Typography>
          <Typography
            sx={{
              fontSize: "5.5rem",
              fontFamily: "Lora, serif",
              color: "black",
              WebkitTextStrokeWidth: "0.5px",
              WebkitTextStrokeColor: "white",
            }}
          >
            Blogs
          </Typography>
        </Box>
        <img
          style={imageStyle}
          src="https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
          alt=""
        />
      </Box>
    </React.Fragment>
  );
}
