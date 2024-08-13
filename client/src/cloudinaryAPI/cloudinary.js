const BASE_URL = "https://api.cloudinary.com/v1_1/dt2jyuf0l/image/upload";

export const uploadImageToCloudinary = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "sxpxlcyz");
    formData.append("cloud_name", "dt2jyuf0l");

    const response = await fetch(BASE_URL, {
      method: "post",
      body: formData,
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error.message);
    }

    return data;
  } catch (error) {
    console.log("Error uploading image", error);
    throw error;
  }
};
