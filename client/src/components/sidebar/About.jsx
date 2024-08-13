import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function About() {
  const { user } = useContext(Context);
  const aboutTitleStyle = {
    width: "80%",
    fontFamily: "Varela, sans-serif",
    margin: "1rem 2rem 1.5rem",
    padding: "10px !important",
    textAlign: "center",
    borderTop: "1px solid #a7a4a4",
    borderBottom: "1px solid #a7a4a4",
  };

  const aboutItemStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 1,
  };

  return (
    <Box sx={aboutItemStyle}>
      <Typography sx={aboutTitleStyle}>ABOUT ME</Typography>
      <img
        style={{
          width: "auto",
          height: "300px",
          borderRadius: "10px",
        }}
        src="https://images.unsplash.com/photo-1650227794474-0f7b2c23dd4b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
        alt=""
      />
      <Typography
        sx={{
          width: ["90%", "80%"],
          textAlign: "justify",
          padding: 1.5,
          color: "#666",
          fontsize: "18px",
          lineHeight: "25px",
          "&::first-letter": {
            marginLeft: "20px",
            fontSize: "30px",
            fontWeight: 600,
          },
        }}
      >
        {user.about}
      </Typography>
    </Box>
  );
}
