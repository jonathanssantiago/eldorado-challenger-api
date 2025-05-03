import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllCategories = async (_req: Request, res: Response) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
};

export const createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name } = req.body;

  if (!name || name.length > 128) {
    res
      .status(400)
      .json({ error: 'Name is required and must be max 128 characters' });
  }

  try {
    await prisma.category.create({
      data: { name },
    });
    res.status(201);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
  return;
};

export const deleteCategory = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  // Validate ID format
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid category ID format' });
  }

  try {
    await prisma.category.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        res.status(404).json({ error: 'Category not found' });
      }
    }
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
};
