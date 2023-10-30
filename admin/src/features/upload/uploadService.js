import { axiosInstance } from "../../utils/axiosConfig";

const uploadImage = async (imageData) => {
  const response = await axiosInstance.post("upload", imageData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  if (response.data) {
    return response.data;
  }
};

const uploadService = {
  uploadImage,
};

export default uploadService;
