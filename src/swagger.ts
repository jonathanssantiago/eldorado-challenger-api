import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Eldorado Challenger API',
      version: '1.0.0',
      description: 'API for managing devices and categories',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './dist/routes/*.js'],
  components: {
    schemas: {
      Category: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string', maxLength: 128 },
        },
      },
      CreateCategoryDto: {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string', maxLength: 128 },
        },
      },
      Device: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          color: { type: 'string', maxLength: 16 },
          partNumber: { type: 'integer' },
          categoryId: { type: 'integer' },
          category: {
            $ref: '#/components/schemas/Category',
          },
        },
      },
      CreateDeviceDto: {
        type: 'object',
        required: ['color', 'partNumber', 'categoryId'],
        properties: {
          color: { type: 'string', maxLength: 16 },
          partNumber: { type: 'integer', minimum: 1 },
          categoryId: { type: 'integer' },
        },
      },
    },
  },
};

const specs = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
}
