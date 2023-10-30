import { axiosInstance, config } from "../../utils/axiosConfig";
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

const createPorfolio = async (portfolio) => {
  const response = await axiosInstance.post("portfolio", portfolio, config());
  if (response.data) {
    return response.data;
  }
};

const updatePortfolio = async (portfolioId, portfolioData) => {
  const response = await axiosInstance.put(
    `portfolio/${portfolioId}`,
    portfolioData,
    config()
  );
  if (response.data) {
    return response.data;
  }
};

const deletePortfolio = async (portfolioId) => {
  const response = await axiosInstance.delete(
    `portfolio/${portfolioId}`,
    config()
  );
  if (response.data) {
    return response.data;
  }
};

const portfolioService = {
  getPortfolio,
  getPortolios,
  createPorfolio,
  updatePortfolio,
  deletePortfolio,
};

export default portfolioService;
