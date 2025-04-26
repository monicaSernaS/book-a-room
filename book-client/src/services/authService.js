import axios from "axios";

const API_URL = "https://book-a-room-production.up.railway.app/api/auth";

export async function loginUser({ email, password }) {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
}
