import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllDevices = async (_req: Request, res: Response) => {
  const devices = await prisma.device.findMany({
    include: { category: true },
  });
  res.json(devices);
};

export const createDevice = async (req: Request, res: Response) => {
  const { color, partNumber, categoryId } = req.body;

  if (!color || !/^[a-zA-Z]+$/.test(color) || color.length > 16) {
    res
      .status(400)
      .json({ error: 'Color must be letters only and max 16 characters' });
  }

  if (!partNumber || typeof partNumber !== 'number' || partNumber <= 0) {
    res.status(400).json({ error: 'partNumber must be a positive integer' });
  }
  try {
    const device = await prisma.device.create({
      data: { color, partNumber, categoryId },
    });

    res.status(201).json(device).send();
  } catch (error) {
    if (error.code === 'P2003') {
      res.status(400).json({ error: 'Invalid category ID' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteDevice = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await prisma.device.delete({ where: { id } });
  res.status(204).send();
};
