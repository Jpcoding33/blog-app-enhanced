import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Grid,
  IconButton,
  List,
  ListItem,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import TopBarList from "../topbarList/TopBarList";
import { Context } from "../../context/Context";

export default function Topbar() {
  const { user } = useContext(Context);
  const [drawComponent, setDrawComponent] = useState(false);

  const toggleDrawer = () => {
    setDrawComponent(!drawComponent);
  };

  const outerGridStyle = {
    display: "flex",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "white",
    boxShadow: "1px 0 5px gray",
    alignItems: "center",
    padding: ["0 1rem", "0 2rem", "0 50px"],
    height: "60px",
  };

  return (
    <Grid container sx={outerGridStyle}>
      <Grid md={3} item sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          size="large"
          edge="start"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{ display: ["flex", "flex", "none"] }}
        >
          <MenuIcon sx={{ fontSize: "2.5rem" }} />
        </IconButton>
        <Typography
          sx={{
            fontSize: 32,
            fontFamily: "cursive",
            fontWeight: "bold",
            color: "#ff4d4d",
            marginBottom: 1,
          }}
        >
          Postify
        </Typography>
      </Grid>
      <Grid
        md={6}
        item
        sx={{ display: ["none", "none", "flex"], justifyContent: "center" }}
      >
        <TopBarList />
      </Grid>
      <Grid
        md={3}
        item
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        {user ? (
          <Link to="/settings">
            <Avatar
              src={user.profilePic?.url}
              alt=""
              sx={{ border: "2px solid #ff4d4d" }}
            />
          </Link>
        ) : (
          <List sx={{ display: ["none", "flex"], alignItems: "center" }}>
            <ListItem>
              <Link className="link" to="/login">
                Login
              </Link>
            </ListItem>
            <ListItem>
              <Link className="link" to="/register">
                Register
              </Link>
            </ListItem>
          </List>
        )}
      </Grid>
      <SwipeableDrawer
        anchor="top"
        open={drawComponent}
        onClose={() => setDrawComponent(false)}
        onOpen={() => setDrawComponent(true)}
        sx={{ display: ["flex", "flex", "none"] }}
      >
        <TopBarList handleCloseDrawer={toggleDrawer} />
      </SwipeableDrawer>
    </Grid>
  );
}
