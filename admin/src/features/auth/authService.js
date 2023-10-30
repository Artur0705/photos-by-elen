import { axiosInstance, config } from "../../utils/axiosConfig";

const login = async (user) => {
  const response = await axiosInstance.post("admin", user, config());
  if (response.data) {
    localStorage.setItem("admin", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = async () => {
  const user = localStorage.getItem("admin");
  const token = user ? JSON.parse(user).token : null;
  const response = await axiosInstance.post("admin/logout", {}, config(token));
  if (response.data) {
    localStorage.clear();
  }
  return response.data;
};

const authService = {
  logout,
  login,
};

export default authService;
