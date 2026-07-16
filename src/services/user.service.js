import repo from '../repositories/user.repository.js';
import createError from '../utils/app-error.js';
import hashPassword from '../utils/hash-password.js';

const validRoles = ['ADMIN', 'LEITOR'];

export default {
  async createUser(data) {
    const name = data.name?.trim();
    const email = data.email?.trim().toLowerCase();
    const password = data.password;
    const role = (data.role || 'LEITOR').trim().toUpperCase();

    if (!name) throw createError('Nome é obrigatório.', 400);
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) throw createError('E-mail inválido.', 400);
    if (!password || password.length < 6) throw createError('A senha deve ter pelo menos 6 caracteres.', 400);
    if (!validRoles.includes(role)) throw createError('Perfil deve ser ADMIN ou LEITOR.', 400);
    if (await repo.findByEmail(email)) throw createError('E-mail já cadastrado.', 400);

    const user = await repo.create({ name, email, password: hashPassword(password), role });
    return { id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt };
  },
};
