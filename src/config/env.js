import dotenv from 'dotenv';
dotenv.config();
export const env = {
  app_name: process.env.APP_NAME || 'api-almoxarifado',
  port: Number(process.env.PORT) || 3000,
  db_uri: process.env.MONGODB_URI || process.env.DB_URI,
  jwt_secret: process.env.JWT_SECRET,
};
