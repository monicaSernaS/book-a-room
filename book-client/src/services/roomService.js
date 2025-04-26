import axios from "axios";

const API_URL = "https://book-a-room-production.up.railway.app/api/rooms";

export async function getRooms() {
  const response = await axios.get(API_URL);
  return response.data;
}

export async function createReservation(roomId) {
    const token = localStorage.getItem("token"); // vamos a guardar el token en login luego
    const response = await axios.post(
      "https://book-a-room-production.up.railway.app/api/reservations",
      { roomId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
  