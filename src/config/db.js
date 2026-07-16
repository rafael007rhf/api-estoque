import mongoose from 'mongoose';
export default async function connect(uri) {
  if (!uri) throw new Error('MONGODB_URI não configurada.');
  await mongoose.connect(uri);
  console.log('Banco de dados conectado com sucesso!');
}
