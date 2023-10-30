import { axiosInstance, config } from "../../utils/axiosConfig";

const getFAQs = async () => {
  const response = await axiosInstance.get("faq");
  if (response.data) {
    return response.data;
  }
};

const getFAQ = async (faqId) => {
  const response = await axiosInstance.get(`faq/${faqId}`);
  if (response.data) {
    return response.data;
  }
};

const createFAQ = async (faq) => {
  const response = await axiosInstance.post("faq", faq, config());
  if (response.data) {
    return response.data;
  }
};

const updateFAQ = async (faqId, faqData) => {
  const response = await axiosInstance.put(`faq/${faqId}`, faqData, config());
  if (response.data) {
    return response.data;
  }
};

const deleteFAQ = async (faqId) => {
  const response = await axiosInstance.delete(`faq/${faqId}`, config());
  if (response.data) {
    return response.data;
  }
};

const faqService = {
  getFAQs,
  getFAQ,
  createFAQ,
  updateFAQ,
  deleteFAQ,
};

export default faqService;
