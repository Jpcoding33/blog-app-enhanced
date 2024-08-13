import Sidebar from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";
import React from "react";
import { Grid } from "@mui/material";

export default function Single() {
  return (
    <React.Fragment>
      <Grid container>
        <Grid xs={12} md={8} item>
          <SinglePost />
        </Grid>
        <Grid md={4} item sx={{ display: ["none", "none", "flex"] }}>
          <Sidebar />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
