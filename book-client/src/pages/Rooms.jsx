import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { getRooms, createReservation } from "../services/roomService";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const data = await getRooms();
        setRooms(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchRooms();
  }, []);

  const handleReserve = async (roomId) => {
    const confirmReservation = window.confirm("¿Deseas reservar esta sala?");
    if (!confirmReservation) return;

    try {
      await createReservation(roomId);
      alert("✅ Reserva realizada exitosamente.");
    } catch (error) {
      console.error(error);
      alert("❌ Error al reservar. Asegúrate de estar logueado.");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Salas Disponibles</h2>
      <div className="row">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div key={room.id} className="col-md-4 mb-4">
              <div className="card shadow">
                <div className="card-body">
                  <h5 className="card-title">{room.name}</h5>
                  <p className="card-text">{room.description}</p>
                  <p className="card-text"><strong>Capacidad:</strong> {room.capacity} personas</p>
                  <button
                    className="btn btn-success w-100 mt-2"
                    onClick={() => handleReserve(room.id)}
                  >
                    Reservar
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No hay salas disponibles.</p>
        )}
      </div>
    </div>
  );
}
