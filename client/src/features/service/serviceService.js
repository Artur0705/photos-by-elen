import { axiosInstance } from "../../utils/axiosConfig";

const getServices = async () => {
  const response = await axiosInstance.get("/services");
  if (response.data) {
    return response.data;
  }
};

const getService = async (serviceId) => {
  const response = await axiosInstance.get(`services/${serviceId}`);
  if (response.data) {
    return response.data;
  }
};

const serviceService = {
  getServices,
  getService,
};

export default serviceService;
