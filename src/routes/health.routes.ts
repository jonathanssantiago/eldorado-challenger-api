// src/routes/health.routes.ts
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (_req, res) => {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      status: 'ok',
      timestamp: new Date(),
      services: {
        database: 'up',
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      timestamp: new Date(),
      services: {
        database: 'down',
      },
      message: 'Health check failed',
    });
  }
});

export default router;
