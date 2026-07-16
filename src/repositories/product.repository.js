import Product from '../models/product.model.js';

export default {
  insert: (productData) => Product.create(productData),
  getCatalog: () => Product.find().sort({ name: 1 }),
  getById: (identifier) => Product.findById(identifier),
  getByCode: (productCode) => Product.findOne({ code: productCode }),
  update: (identifier, changes) => Product.findByIdAndUpdate(identifier, changes, { new: true, runValidators: true }),
  remove: (identifier) => Product.findByIdAndDelete(identifier),
  adjustBalance: (identifier, variation) => Product.findOneAndUpdate(
    { _id: identifier, stock: { $gte: Math.max(0, -variation) } },
    { $inc: { stock: variation } },
    { new: true, runValidators: true },
  ),
};
