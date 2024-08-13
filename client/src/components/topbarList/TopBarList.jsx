import { List, ListItem } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

export default function TopBarList(props) {
  const { handleCloseDrawer } = props;
  const { user, dispatch } = useContext(Context);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const listItemStyle = {
    padding: ["1rem 4rem", "1rem 4rem", "0.8rem", "1rem"],
    borderBottom: ["1px solid lightgray", "1px solid lightgray", "none"],
  };

  return (
    <React.Fragment>
      <List
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: ["column", "column", "row"],
          padding: ["1rem 0", "1.5rem 0", 0],
        }}
      >
        <Link className="link" to="/">
          <ListItem sx={listItemStyle} onClick={handleCloseDrawer}>
            HOME
          </ListItem>
        </Link>
        <Link className="link" to="/about">
          <ListItem sx={listItemStyle} onClick={handleCloseDrawer}>
            ABOUT
          </ListItem>
        </Link>
        <Link className="link" to="/">
          <ListItem sx={listItemStyle} onClick={handleCloseDrawer}>
            CONTACT
          </ListItem>
        </Link>
        <Link className="link" to="/write">
          <ListItem sx={listItemStyle} onClick={handleCloseDrawer}>
            WRITE
          </ListItem>
        </Link>
        {!user && (
          <>
            <Link className="link" to="/login">
              <ListItem
                sx={{ ...listItemStyle, display: ["flex", "flex", "none"] }}
                onClick={handleCloseDrawer}
              >
                LOGIN
              </ListItem>
            </Link>
            <Link className="link" to="/register">
              <ListItem
                sx={{ ...listItemStyle, display: ["flex", "flex", "none"] }}
                onClick={handleCloseDrawer}
              >
                REGISTER
              </ListItem>
            </Link>
          </>
        )}
        {user && (
          <Link className="link" to="/login">
            <ListItem
              onClick={() => {
                handleLogout();
                handleCloseDrawer();
              }}
              sx={{ ...listItemStyle }}
            >
              {" "}
              LOGOUT
            </ListItem>
          </Link>
        )}
      </List>
    </React.Fragment>
  );
}
