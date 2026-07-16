import createError from '../utils/app-error.js';
import repo from '../repositories/user.repository.js';
import { compareHashedPassword } from '../utils/hash-password.js';
import { createToken } from '../middlewares/auth-middleware.js';

export default {
  async loginUser({ email, password }) {
    const normalizedEmail = email?.trim().toLowerCase();
    if (!normalizedEmail || !password) throw createError('E-mail e senha são obrigatórios.', 400);

    const user = await repo.findByEmail(normalizedEmail, true);
    if (!user || !compareHashedPassword(password, user.password)) {
      throw createError('E-mail ou senha inválidos.', 401);
    }

    const token = createToken({ id: user.id, email: user.email, role: user.role });
    return { user: { id: user.id, name: user.name, email: user.email, role: user.role }, token };
  },
};
