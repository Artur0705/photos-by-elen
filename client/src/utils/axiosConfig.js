import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const config = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const base_url = process.env.REACT_APP_API_URL;
