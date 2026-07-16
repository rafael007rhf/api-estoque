import { Router } from 'express';
import productController from '../controllers/product.controller.js';
import { ensureValidId } from '../middlewares/validate.middleware.js';
import { requireRole } from '../middlewares/auth-middleware.js';

const productRoutes = Router();
productRoutes.post('/produtos', requireRole('ADMIN'), productController.addProduct);
productRoutes.get('/produtos', productController.showProducts);
productRoutes.get('/produtos/:id', ensureValidId, productController.showProduct);
productRoutes.put('/produtos/:id', ensureValidId, requireRole('ADMIN'), productController.editProduct);
productRoutes.delete('/produtos/:id', ensureValidId, requireRole('ADMIN'), productController.deleteProduct);
export default productRoutes;
