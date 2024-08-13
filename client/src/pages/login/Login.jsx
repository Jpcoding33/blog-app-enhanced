import { useContext } from "react";
import { Link } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Context } from "../../context/Context";
import axiosInstance from "../../api/axiosInstance";

export default function Login() {
  const { dispatch, isFetching } = useContext(Context);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit(values, { resetForm }) {
      handleSubmit(values);
      resetForm();
    },
  });

  const handleSubmit = async (values) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axiosInstance.post("/auth/login", {
        useremail: values.email,
        password: values.password,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  const boxStyle = {
    height: "calc(100vh - 60px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: `linear-gradient(rgba(255,255,255,0.5),
    rgba(255,255,255,0.8)),
    url(https://images.unsplash.com/uploads/141103282695035fa1380/95cdfeef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1430&q=80)`,
    backgroundSize: "cover",
  };

  const loginBtnStyle = {
    textTransform: "none",
    fontWeight: 700,
    marginTop: "20px",
    backgroundColor: "#ed6f5f",
    "&:hover": {
      backgroundColor: "#ed6f5f",
    },
    "&:disabled": {
      cursor: "not-allowed",
      backgroundColor: "lightcoral",
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
    backgroundColor: "teal",
    "&:hover": {
      backgroundColor: "teal",
    },
    color: "white",
    borderRadius: "10px",
  };

  const formStyle = {
    minWidth: "300px",
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <Box sx={boxStyle}>
      <Box sx={{ background: "white", padding: [2, 5], borderRadius: 2 }}>
        <Typography sx={{ fontSize: "4rem", textAlign: "center" }}>
          Login
        </Typography>
        <form style={formStyle} onSubmit={formik.handleSubmit} noValidate>
          <TextField
            name="email"
            type="text"
            label="Email"
            placeholder="Enter your email..."
            sx={{ marginBottom: 2 }}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password..."
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button sx={loginBtnStyle} type="submit" disabled={isFetching}>
            Login
          </Button>
        </form>
        <Button sx={loginRegisBtnStyle}>
          <Link className="link" to="/register">
            Register
          </Link>
        </Button>
      </Box>
    </Box>
  );
}
