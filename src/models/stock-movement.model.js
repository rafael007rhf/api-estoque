import mongoose from 'mongoose';

const stockMovementSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product', index: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User', index: true },
  type: { type: String, enum: ['ENTRADA', 'SAIDA'], required: true, uppercase: true, trim: true },
  quantity: { type: Number, required: true, min: 1 },
  reason: { type: String, required: true, trim: true, minlength: 3 },
  balanceAfter: { type: Number, required: true, min: 0 },
}, { timestamps: true, versionKey: false });

export default mongoose.model('StockMovement', stockMovementSchema);
