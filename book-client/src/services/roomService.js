import axios from "axios";

const API_URL = "https://book-a-room-production.up.railway.app/api/rooms";

export async function getRooms() {
  const response = await axios.get(API_URL);
  return response.data;
}
