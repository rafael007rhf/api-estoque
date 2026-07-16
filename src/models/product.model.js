import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2 },
  code: { type: String, required: true, unique: true, trim: true, uppercase: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, trim: true },
  stock: { type: Number, required: true, default: 0, min: 0, immutable: false },
}, { timestamps: true, versionKey: false });

export default mongoose.model('Product', productSchema);
