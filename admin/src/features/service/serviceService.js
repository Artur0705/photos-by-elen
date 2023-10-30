import { axiosInstance, config } from "../../utils/axiosConfig";

const getServices = async () => {
  const response = await axiosInstance.get("services");
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

const createService = async (service) => {
  const response = await axiosInstance.post("services", service, config());
  if (response.data) {
    return response.data;
  }
};

const updateService = async (serviceId, serviceData) => {
  const response = await axiosInstance.put(
    `services/${serviceId}`,
    serviceData,
    config()
  );
  if (response.data) {
    return response.data;
  }
};

const deleteService = async (serviceId) => {
  const response = await axiosInstance.delete(
    `services/${serviceId}`,
    config()
  );
  if (response.data) {
    return response.data;
  }
};

const serviceService = {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
};

export default serviceService;
