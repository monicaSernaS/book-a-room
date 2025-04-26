import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes'; 

const app = express();

app.use(cors());
app.use(express.json());

// Rutas principales
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API Running 🚀');
});

export default app;

