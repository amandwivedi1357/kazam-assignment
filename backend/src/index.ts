import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectMongoDB } from './services/mongoService';
import { connectRedis } from './services/redisService';
import { connectAndSubscribe } from './services/mqttService';
import taskRoutes from './routes/taskRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin:'*'
}));
app.use(express.json());

// Routes
app.use('/', taskRoutes);

const startServer = async () => {
  try {
    await connectMongoDB();
    
    await connectRedis();
    
    connectAndSubscribe();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();