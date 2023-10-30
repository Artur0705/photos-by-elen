import { axiosInstance } from "../../utils/axiosConfig";

const postQuery = async (contactData) => {
  const response = await axiosInstance.post("contact", contactData);
  if (response.data) {
    return response.data;
  }
};

const contactService = {
  postQuery,
};

export default contactService;
