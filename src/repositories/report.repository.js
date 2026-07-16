import Product from '../models/product.model.js';
import StockMovement from '../models/stock-movement.model.js';

export default {
  getAllBalances: () => Product.find().select('name code category price stock').sort({ name: 1 }),
  getHistory: () => StockMovement.find()
    .populate('productId', 'name code')
    .populate('userId', 'name email role')
    .sort({ createdAt: -1 }),
};
