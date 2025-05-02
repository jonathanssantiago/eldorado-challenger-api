import express from 'express';
import cors from 'cors';
import categoryRoutes from './routes/category.routes';
import deviceRoutes from './routes/device.routes';
import { setupSwagger } from './swagger';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/categories', categoryRoutes);
app.use('/api/devices', deviceRoutes);

setupSwagger(app);

export default app;
