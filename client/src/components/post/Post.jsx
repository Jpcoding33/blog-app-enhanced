import { Box, Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

export default function Post({ post }) {
  const imageStyle = {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    overflow: "hidden",
    borderRadius: "7px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const titleStyle = {
    fontFamily: "Josefin Sans, sans-serif",
    fontSize: "24px",
    fontWeight: 700,
    marginTop: "15px",
    cursor: "pointer",
    borderBottom: "1px solid gray",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  };
  const categoryStyle = {
    fontFamily: "Varela Round, sans-serif",
    fontsize: "11px",
    color: "#be9656",
    lineHeight: "20px",
    marginTop: "15px",
    marginRight: "10px",
    cursor: "pointer",
  };
  const dateStyle = {
    fontFamily: "Lora, serif",
    fontStyle: "italic",
    fontsize: "13px",
    color: "#999",
    marginTop: "15px",
  };
  const descStyle = {
    fontFamily: "Varela Round, sans-serif",
    fontSize: "14px",
    color: "#444",
    lineHeight: "24px",
    marginTop: "15px",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "4",
    WebkitBoxOrient: "vertical",
    padding: ["0 1rem", "0 2rem"],
    marginBottom: "1rem",
    overflow: "hidden",
  };
  return (
    <React.Fragment>
      <Grid item xs={11} sm={9} md={6} sx={{ marginX: ["auto", "auto", "0"] }}>
        <Paper sx={{ height: "100%" }}>
          {post.image?.url && (
            <img style={imageStyle} src={post.image?.url} alt="" />
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: ["80%", "70%"], textAlign: "center" }}>
              <Link to={`/post/${post._id}`} className="link">
                <Typography sx={titleStyle}>{post.title}</Typography>
              </Link>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography sx={dateStyle}>
                {new Date(post.createdAt).toDateString()}
              </Typography>
              <Typography sx={categoryStyle}>{post.category}</Typography>
            </Box>
            <Typography sx={descStyle}>{post.desc}</Typography>
          </Box>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}
