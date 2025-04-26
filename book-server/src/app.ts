import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes'; 
import roomRoutes from './routes/roomRoutes';
import reservationRoutes from './routes/reservationRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// Rutas principales
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/reservations', reservationRoutes);

app.get('/', (req, res) => {
  res.send('API Running 🚀');
});

export default app;

