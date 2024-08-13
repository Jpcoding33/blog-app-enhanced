import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import axiosInstance from "../../api/axiosInstance";

export default function Register() {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("UserName is required"),
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit(values, { resetForm }) {
      handleSubmit(values);
      resetForm();
    },
  });

  const handleSubmit = async (values) => {
    try {
      const res = await axiosInstance.post("/auth/register", {
        username: values.username,
        email: values.email,
        password: values.password,
      });
      console.log(res);
      res.data && window.location.replace("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const boxStyle = {
    height: "calc(100vh - 60px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: `linear-gradient(rgba(255,255,255,0.5),
    rgba(255,255,255,0.5)),
    url(https://images.unsplash.com/photo-1606327054536-e37e655d4f4a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)`,
    backgroundSize: "cover",
  };

  const formStyle = {
    minWidth: "300px",
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
  };

  const registerBtnStyle = {
    textTransform: "none",
    fontWeight: 700,
    marginTop: "20px",
    backgroundColor: "teal",
    "&:hover": {
      backgroundColor: "teal",
    },
    "&:disabled": {
      cursor: "not-allowed",
      backgroundColor: "#5cad92",
    },
    color: "white",
    borderRadius: "10px",
    padding: "10px",
  };

  const loginRegisBtnStyle = {
    textTransform: "none",
    position: "absolute",
    top: "70px",
    right: "20px",
    padding: "5px 10px",
    backgroundColor: "#ed6f5f",
    "&:hover": {
      backgroundColor: "#ed6f5f",
    },
    color: "white",
    borderRadius: "10px",
  };

  return (
    <Box sx={boxStyle}>
      <Box sx={{ background: "white", padding: [2, 5], borderRadius: 2 }}>
        <Typography sx={{ fontSize: "4rem", textAlign: "center" }}>
          Register
        </Typography>
        <form style={formStyle} onSubmit={formik.handleSubmit}>
          <TextField
            name="username"
            label="Username"
            type="text"
            placeholder="Enter your username..."
            sx={{ marginBottom: 1.5 }}
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && !!formik.errors.username}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email..."
            sx={{ marginBottom: 1.5 }}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password..."
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
          />

          <Button sx={registerBtnStyle} type="submit">
            Register
          </Button>
        </form>
        <Button sx={loginRegisBtnStyle}>
          <Link className="link" to="/login">
            Login
          </Link>
        </Button>
      </Box>
    </Box>
  );
}
