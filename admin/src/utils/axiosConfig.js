import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const config = () => {
  const user = localStorage.getItem("admin");
  const token = user ? JSON.parse(user).token : null;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const base_url = process.env.REACT_APP_API_URL;
