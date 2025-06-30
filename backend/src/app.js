import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middlewares/errorMiddleware.js';
import webhookRoutes from './routes/webhookRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));


app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/webhook', webhookRoutes);
app.use(errorHandler);

app.post('/ping', (req, res) => {
  console.log('PING received:', req.body);
  res.send('pong');
});

app.use('/api/expenses', expenseRoutes);


export default app;