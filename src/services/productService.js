import { api } from "../api/axios";

const API_BASE_URL = "https://localhost:44329/api"; 

export const fetchProducts = async () => {
  try {
    const response = await api.get(`${API_BASE_URL}/product`); 
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
