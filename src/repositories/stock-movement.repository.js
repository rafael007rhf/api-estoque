import StockMovement from '../models/stock-movement.model.js';

export default {
  insert: (movementData) => StockMovement.create(movementData),
  listDetailed: () => StockMovement.find()
    .populate('productId', 'name code category')
    .populate('userId', 'name email role')
    .sort({ createdAt: -1 }),
  hasProductHistory: (productIdentifier) => StockMovement.exists({ productId: productIdentifier }),
};
