import { axiosInstance } from "../../utils/axiosConfig";
const getPortolios = async () => {
  const response = await axiosInstance.get("portfolio");
  if (response.data) {
    return response.data;
  }
};

const getPortfolio = async (portfolioId) => {
  const response = await axiosInstance.get(`portfolio/${portfolioId}`);
  if (response.data) {
    return response.data;
  }
};

const portfolioService = {
  getPortfolio,
  getPortolios,
};

export default portfolioService;
