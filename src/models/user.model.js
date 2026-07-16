import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['ADMIN', 'LEITOR'], default: 'LEITOR', required: true, uppercase: true, trim: true },
}, { timestamps: true, versionKey: false });

export default mongoose.model('User', userSchema);
