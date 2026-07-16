import jwt from 'jsonwebtoken';
import createError from '../utils/app-error.js';
import { env } from '../config/env.js';

export function authMiddleware(req, _res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) throw createError('Token não informado.', 401);
  if (!env.jwt_secret) throw createError('JWT_SECRET não configurado.', 500);
  try {
    req.user = jwt.verify(header.slice(7), env.jwt_secret);
    next();
  } catch {
    throw createError('Token inválido ou expirado.', 401);
  }
}

export function requireRole(...roles) {
  return (req, _res, next) => {
    if (!req.user) throw createError('Usuário não autenticado.', 401);
    if (!roles.includes(req.user.role)) throw createError('Acesso negado.', 403);
    next();
  };
}

export function createToken(payload) {
  if (!env.jwt_secret) throw createError('JWT_SECRET não configurado.', 500);
  return jwt.sign(payload, env.jwt_secret, { expiresIn: '8h' });
}
