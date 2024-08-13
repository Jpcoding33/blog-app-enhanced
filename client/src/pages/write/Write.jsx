import { useContext, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Context } from "../../context/Context";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import axiosInstance from "../../api/axiosInstance";
import { uploadImageToCloudinary } from "../../cloudinaryAPI/cloudinary";

export default function Write() {
  // const [title, setTitle] = useState("");
  // const [category, setCategory] = useState("");
  // const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const formik = useFormik({
    initialValues: {
      image: null,
      title: "",
      category: "",
      desc: "",
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Title is required"),
      category: Yup.string().required("Category is required"),
      desc: Yup.string().required("Description is required"),
    }),
    onSubmit(values, { resetForm }) {
      handleSubmit(values);
      resetForm();
    },
  });

  const handleSubmit = async (values) => {
    const newPost = {
      username: user.username,
      userId: user._ID,
      title: values.title,
      category: values.category,
      desc: values.desc,
    };
    if (file) {
      try {
        const response = await uploadImageToCloudinary(file);
        if (response) {
          newPost.image = {
            url: response.url,
            assetId: response.public_id,
          };
        }
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const res = await axiosInstance.post("/posts", newPost);
      if (res) {
        await axiosInstance.post("/categories", { name: newPost.category });
        window.location.replace("/post/" + res.data._id);
      }
    } catch (err) {}
  };
  return (
    <Box sx={{ marginTop: 2, padding: ["1rem", "2rem", "2rem 5rem"] }}>
      <Box sx={{ padding: "1rem", background: "#fff6e8", borderRadius: 4 }}>
        {file && (
          <img
            src={URL.createObjectURL(file)}
            alt=""
            style={{
              width: "100%",
              maxHeight: "500px",
              objectFit: "contain",
              borderRadius: 5,
            }}
          />
        )}
        <form
          style={{ position: "relative", width: "100%" }}
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <label
            htmlFor="fileInput"
            style={{ display: "flex", alignItems: "center" }}
          >
            <AddAPhotoIcon sx={{ marginRight: 1 }} />
            <Typography color="initial">Choose an Image</Typography>
          </label>
          <input
            name="image"
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => {
              formik.setFieldValue(e.target.files[0]);
              setFile(e.target.files[0]);
            }}
          />
          <TextField
            name="title"
            type="text"
            placeholder="Title"
            variant="outlined"
            fullWidth={true}
            autoFocus={true}
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && !!formik.errors.title}
            helperText={formik.touched.title && formik.errors.title}
            sx={{ margin: "0.5rem 0", marginTop: "1rem" }}
          />
          <TextField
            name="category"
            type="text"
            placeholder="Category"
            variant="outlined"
            fullWidth={true}
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.category && !!formik.errors.category}
            helperText={formik.touched.category && formik.errors.category}
            sx={{ margin: "0.5rem 0" }}
          />
          <TextField
            name="desc"
            placeholder="Tell your story..."
            type="text"
            variant="outlined"
            fullWidth={true}
            multiline
            rows={5}
            value={formik.values.desc}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.desc && !!formik.errors.desc}
            helperText={formik.touched.desc && formik.errors.desc}
            sx={{ margin: "0.5rem 0" }}
          />
          <Box sx={{ display: "flex", justifyContent: "end", marginTop: 2 }}>
            <Button
              variant="contained"
              sx={{ background: "teal", "&:hover": { background: "teal" } }}
              type="submit"
            >
              Publish
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
