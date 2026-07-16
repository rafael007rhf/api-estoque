import { Router } from 'express';
import controller from '../controllers/report.controller.js';
const router = Router();
router.get('/relatorios/saldo', controller.balances);
router.get('/relatorios/historico', controller.history);
export default router;
