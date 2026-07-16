import movementStore from '../repositories/stock-movement.repository.js';
import productStore from '../repositories/product.repository.js';
import createError from '../utils/app-error.js';

export default {
  async registerMovement(input, operatorId) {
    const itemId = input.productId;
    const movementType = input.type?.trim().toUpperCase();
    const units = Number(input.quantity);
    const explanation = input.reason?.trim();

    if (!itemId) throw createError('Produto é obrigatório.', 400);
    if (!['ENTRADA', 'SAIDA'].includes(movementType)) throw createError('Tipo deve ser ENTRADA ou SAIDA.', 400);
    if (!Number.isInteger(units) || units <= 0) throw createError('Quantidade deve ser um inteiro maior que zero.', 400);
    if (!explanation) throw createError('Motivo é obrigatório.', 400);

    const item = await productStore.getById(itemId);
    if (!item) throw createError('Produto não encontrado.', 404);

    const balanceChange = movementType === 'ENTRADA' ? units : -units;
    const itemAfterChange = await productStore.adjustBalance(itemId, balanceChange);
    if (!itemAfterChange) throw createError('Saldo insuficiente para realizar a saída.', 400);

    try {
      const record = await movementStore.insert({
        productId: itemId,
        userId: operatorId,
        type: movementType,
        quantity: units,
        reason: explanation,
        balanceAfter: itemAfterChange.stock,
      });
      return record.populate([
        { path: 'productId', select: 'name code category' },
        { path: 'userId', select: 'name email role' },
      ]);
    } catch (failure) {
      await productStore.adjustBalance(itemId, -balanceChange);
      throw failure;
    }
  },
};
