import Post from "../post/Post";
import { Grid } from "@mui/material";
import React from "react";

export default function Posts({ posts }) {
  return (
    <React.Fragment>
      <Grid container sx={{ padding: 2 }} spacing={2}>
        {posts.map((p) => (
          <Post key={p.title} post={p} />
        ))}
      </Grid>
    </React.Fragment>
  );
}
