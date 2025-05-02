import { Router } from 'express';
import {
  createDevice,
  deleteDevice,
  getAllDevices,
} from '../controllers/device.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Devices
 *   description: Endpoints for Eldorado Challenger
 */

/**
 * @swagger
 * /devices:
 *   get:
 *     summary: Get all devices
 *     tags: [Devices]
 *     responses:
 *       200:
 *         description: List of all devices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Device'
 */
router.get('/', getAllDevices);

/**
 * @swagger
 * /devices:
 *   post:
 *     summary: Create a new device
 *     tags: [Devices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDeviceDto'
 *     responses:
 *       201:
 *         description: Device created successfully
 */
router.post('/', createDevice);

/**
 * @swagger
 * /devices/{id}:
 *   delete:
 *     summary: Delete a device by ID
 *     tags: [Devices]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Device deleted successfully
 */
router.delete('/:id', deleteDevice);

export default router;
