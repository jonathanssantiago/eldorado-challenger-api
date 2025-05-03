import 'module-alias/register';
import express from 'express';
import cors from 'cors';
import { setupSwagger } from './swagger';
import categoryRoutes from './routes/category.routes';
import deviceRoutes from './routes/device.routes';
import healthRoutes from './routes/health.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/categories', categoryRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/health', healthRoutes);
setupSwagger(app);

// Root endpoint
app.get('/', (_req, res) => {
  res.send('API is running');
});

export default app;
