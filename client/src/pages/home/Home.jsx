import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import Grid from "@mui/material/Grid";
import axiosInstance from "../../api/axiosInstance";
import { IconButton, InputBase, Pagination, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Home() {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageLimit = 4;

  useEffect(() => {
    const fetchPosts = async () => {
      const pagination = {
        page,
        limit: pageLimit,
      };
      console.log(search);
      const res = await axiosInstance.get("/posts" + search, {
        params: pagination,
      });
      setPosts(res.data.docs);
      setTotalPages(Number(Math.ceil(res.data.totalDocs / pageLimit)));
    };
    fetchPosts();
  }, [search, page]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const searchbarStyle = {
    margin: 2,
    padding: 0.5,
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    height: "35px",
    width: ["85%", "85%", "90%"],
    boxShadow:
      "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
  };

  return (
    <React.Fragment>
      <Header />
      <Grid container>
        <Grid
          xs={12}
          md={8}
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Paper sx={searchbarStyle}>
            <IconButton
              type="button"
              sx={{ padding: "10px" }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>

            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Blogs..."
              inputProps={{ "aria-label": "search google maps" }}
            />
          </Paper>
          <Posts posts={posts} />
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChange}
            variant="outlined"
            color="primary"
            shape="rounded"
            sx={{ marginY: 2 }}
          />
        </Grid>
        <Grid md={4} item>
          <Sidebar />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
