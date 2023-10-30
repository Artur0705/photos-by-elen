import { axiosInstance, config } from "../../utils/axiosConfig";

const getContacts = async () => {
  const response = await axiosInstance.get("contact", config());
  if (response.data) {
    return response.data;
  }
};

const getContact = async (contactId) => {
  const response = await axiosInstance.get(`contact/${contactId}`, config());
  if (response.data) {
    return response.data;
  }
};

const updateContactStatus = async (contactId, status) => {
  const response = await axiosInstance.patch(
    `contact/${contactId}/status`,
    { status },
    config()
  );
  if (response.data) {
    return response.data;
  }
};

const deleteContact = async (contactId) => {
  const response = await axiosInstance.delete(`contact/${contactId}`, config());
  if (response.data) {
    return response.data;
  }
};

const contactService = {
  getContacts,
  getContact,
  updateContactStatus,
  deleteContact,
};

export default contactService;
