import axios from "axios";

const BASE_URL = "https://localhost:44329/swagger/index.html"; // Change to your backend URL

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
