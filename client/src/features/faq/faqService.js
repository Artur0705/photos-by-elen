import { axiosInstance } from "../../utils/axiosConfig";

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

const faqService = {
  getFAQs,
  getFAQ,
};

export default faqService;
