import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axiosInstance from "../../api/axiosInstance";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import CancelIcon from "@mui/icons-material/Cancel";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axiosInstance.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });

      await axiosInstance.delete(`/categories/${post.category}`);
      window.location.replace("/");
    } catch (err) {}
  };

  const handleCancel = () => {
    setUpdateMode(false);
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (error) {}
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Paper>
        {post.image?.url && (
          <img
            src={post.image?.url}
            alt=""
            style={{
              width: "100%",
              maxHeight: "500px",
              objectFit: "contain",
              borderRadius: "5px",
            }}
          />
        )}
        <Box sx={{ padding: 2 }}>
          {updateMode ? (
            <TextField
              variant="standard"
              type="text"
              value={title}
              autoFocus
              fullWidth={true}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ margin: "0 0 1rem" }}
            />
          ) : (
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: [24, 26, 30],
                textAlign: "center",
                margin: "0 0 0.5rem",
              }}
            >
              {title}
            </Typography>
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: ["column", "row"],
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 1,
            }}
          >
            <Box
              sx={{
                color: "#b39656",
                fontSize: 18,
                display: "flex",
                alignItems: "center",
                marginY: 0.5,
              }}
            >
              <Typography>Author:</Typography>

              <Link to={`/?user=${post.username}`} className="link">
                <Typography sx={{ fontWeight: 700 }}>
                  {post.username}
                </Typography>
              </Link>
            </Box>

            <Typography sx={{ color: "#b39656", fontSize: 18, marginY: 0.5 }}>
              {new Date(post.createdAt).toDateString()}
            </Typography>
          </Box>

          {updateMode ? (
            <TextField
              type="text"
              value={desc}
              fullWidth={true}
              onChange={(e) => setDesc(e.target.value)}
              sx={{ marginTop: 2 }}
              multiline
              maxRows={15}
            />
          ) : (
            <Typography
              sx={{
                marginTop: 2,
                textAlign: "justify",
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
              {desc}
            </Typography>
          )}
          {!updateMode && (
            <Box
              xs={2}
              sx={{ display: "flex", justifyContent: "end", marginTop: 2 }}
            >
              {post.username === user?.username && (
                <Box sx={{ display: "flex" }}>
                  <Button
                    sx={{
                      background: "teal",
                      "&:hover": { background: "teal" },
                      margin: "0 0.5rem",
                    }}
                    onClick={() => setUpdateMode(true)}
                  >
                    <Typography
                      color="initial"
                      sx={{
                        display: "flex",
                        textTransform: "none",
                        alignItems: "center",
                        color: "white",
                      }}
                    >
                      <EditIcon sx={{ marginRight: 0.5 }} />
                      <span>Edit</span>
                    </Typography>
                  </Button>
                  <Button
                    sx={{
                      background: "tomato",
                      "&:hover": { background: "tomato" },
                      margin: "0 0.5rem",
                    }}
                    onClick={handleDelete}
                  >
                    <Typography
                      color="initial"
                      sx={{
                        display: "flex",
                        textTransform: "none",
                        alignItems: "center",
                        color: "white",
                      }}
                    >
                      <DeleteIcon sx={{ marginRight: 0.5 }} />
                      <span>Delete</span>
                    </Typography>
                  </Button>
                </Box>
              )}
            </Box>
          )}
          {updateMode && (
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Button
                sx={{
                  background: "gray",
                  "&:hover": { background: "gray" },
                  width: "max-content",
                  color: "white",
                  marginTop: 2,
                  marginRight: 2,
                }}
                onClick={handleCancel}
              >
                <CancelIcon sx={{ marginRight: 0.5 }} />
                <span>Cancel</span>
              </Button>
              <Button
                sx={{
                  background: "teal",
                  "&:hover": { background: "teal" },
                  width: "max-content",
                  color: "white",
                  marginTop: 2,
                }}
                onClick={handleUpdate}
              >
                <UpgradeIcon sx={{ marginRight: 0.5 }} />
                <span>Update</span>
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
