import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// Aquí luego montaremos las rutas

app.get('/', (req, res) => {
  res.send('API Running 🚀');
});

export default app;
