import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllCategories = async (_req: Request, res: Response) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
};

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name || name.length > 128) {
    return res
      .status(400)
      .json({ error: 'Name is required and must be max 128 characters' });
  }

  const category = await prisma.category.create({
    data: { name },
  });

  res.status(201).json(category);
};

export const deleteCategory = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  await prisma.category.delete({ where: { id } });
  res.status(204).send();
};
