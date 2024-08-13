import { Box, Grid, List, ListItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import About from "./About";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axiosInstance.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);

  const sidebarTitleStyle = {
    width: "80%",
    fontFamily: "Varela, sans-serif",
    margin: "2rem",
    padding: "10px !important",
    textAlign: "center",
    borderTop: "1px solid #a7a4a4",
    borderBottom: "1px solid #a7a4a4",
  };

  const sideBarStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const sideBarItemStyle = {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  };

  return (
    <Box sx={sideBarStyle}>
      {cats.length > 0 && (
        <Box sx={sideBarItemStyle}>
          <Typography
            sx={{ ...sidebarTitleStyle, fontSize: 14, margin: "0 2rem" }}
          >
            CATEGORIES
          </Typography>
          <List sx={{ width: "90%" }}>
            <Grid container>
              {cats.map((c) => (
                <Grid
                  item
                  xs={6}
                  key={c.name}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Link to={`/?cat=${c.name}`} className="link">
                    <ListItem>{c.name}</ListItem>
                  </Link>
                </Grid>
              ))}
              {cats.length > 1 && (
                <Grid
                  item
                  xs={6}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Link to={`/`} className="link">
                    <ListItem>all</ListItem>
                  </Link>
                </Grid>
              )}
            </Grid>
          </List>
        </Box>
      )}
      <About />
    </Box>
  );
}
