import { Router } from 'express';
import movementController from '../controllers/stock-movement.controller.js';
import { requireRole } from '../middlewares/auth-middleware.js';

const movementRoutes = Router();
movementRoutes.post('/movimentacoes', requireRole('ADMIN'), movementController.addMovement);
export default movementRoutes;
