import { Box, IconButton, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
  const footerTextStyle = {
    width: "80%",
    fontFamily: "Varela, sans-serif",
    margin: "2rem",
    padding: "10px !important",
    textAlign: "center",
    borderTop: "1px solid #a7a4a4",
  };

  const footerItemStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  };

  const InstagramGradientIcon = () => (
    <>
      <svg width={0} height={0}>
        <linearGradient
          id="exampleColors"
          x1={1}
          y1={0}
          x2={1}
          y2={1}
          gradientTransform="rotate(-45)"
        >
          <stop offset="0%" stopColor="#6559ca" />
          <stop offset="30%" stopColor="#bc318f" />
          <stop offset="50%" stopColor="#e33f5f" />
          <stop offset="70%" stopColor="#f77638" />
          <stop offset="100%" stopColor="#fec66d" />
        </linearGradient>
        {/* <radialGradient></radialGradient> */}
      </svg>
      <InstagramIcon sx={{ fill: "url(#exampleColors)" }} />
    </>
  );

  return (
    <Box sx={footerItemStyle}>
      <Typography
        sx={{
          ...footerTextStyle,
          fontSize: 14,
          margin: "0 4rem",
          borderBottom: "1px solid #a7a4a4",
          width: "200px",
        }}
      >
        FOLLOW US
      </Typography>
      <Box sx={{ display: "flex", padding: 2 }}>
        <IconButton>
          <FacebookIcon sx={{ color: "#1877F2", fontSize: 26 }} />
        </IconButton>
        <IconButton>
          <TwitterIcon sx={{ color: "#1DA1F2", fontSize: 26 }} />
        </IconButton>
        <IconButton>
          <PinterestIcon sx={{ color: "#E60023", fontSize: 26 }} />
        </IconButton>
        <IconButton>
          <InstagramGradientIcon sx={{ fontSize: 26 }} />
        </IconButton>
      </Box>
      <Typography
        sx={{
          ...footerTextStyle,
          fontSize: 14,
          margin: "0 4rem",
        }}
      >
        <span>
          Copyright © 2024 All rights reserved | Made with
          <span style={{ fontSize: 18, color: "red", padding: "0 2px" }}>
            &#9829;
          </span>
          by
          <span
            style={{
              color: "red",
              padding: "0 2px",
              fontWeight: "bold",
            }}
          >
            Jaypal
          </span>
        </span>
      </Typography>
    </Box>
  );
}
