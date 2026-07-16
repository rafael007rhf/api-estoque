import productStore from '../repositories/product.repository.js';
import movementStore from '../repositories/stock-movement.repository.js';
import createError from '../utils/app-error.js';

function prepareProductInput(source, allowPartial = false) {
  const cleanData = {};
  const mandatoryFields = ['name', 'code', 'description', 'price', 'category'];

  if (!allowPartial && mandatoryFields.some((field) => source[field] === undefined || source[field] === '')) {
    throw createError('Nome, código, descrição, preço e categoria são obrigatórios.', 400);
  }
  if ('stock' in source) throw createError('O saldo só pode ser alterado por movimentações.', 400);

  if (source.name !== undefined) cleanData.name = source.name.trim();
  if (source.code !== undefined) cleanData.code = source.code.trim().toUpperCase();
  if (source.description !== undefined) cleanData.description = source.description.trim();
  if (source.category !== undefined) cleanData.category = source.category.trim();
  if (source.price !== undefined) {
    const parsedPrice = Number(source.price);
    if (!Number.isFinite(parsedPrice) || parsedPrice < 0) throw createError('Preço inválido.', 400);
    cleanData.price = parsedPrice;
  }
  return cleanData;
}

export default {
  async registerItem(input) {
    const cleanData = prepareProductInput(input);
    if (await productStore.getByCode(cleanData.code)) throw createError('Código de produto já cadastrado.', 400);
    return productStore.insert(cleanData);
  },
  fetchCatalog: () => productStore.getCatalog(),
  async fetchItem(identifier) {
    const item = await productStore.getById(identifier);
    if (!item) throw createError('Produto não encontrado.', 404);
    return item;
  },
  async editItem(identifier, input) {
    const cleanData = prepareProductInput(input, true);
    if (!Object.keys(cleanData).length) throw createError('Nenhum campo válido informado.', 400);
    if (cleanData.code) {
      const duplicate = await productStore.getByCode(cleanData.code);
      if (duplicate && duplicate.id !== identifier) throw createError('Código de produto já cadastrado.', 400);
    }
    const changedItem = await productStore.update(identifier, cleanData);
    if (!changedItem) throw createError('Produto não encontrado.', 404);
    return changedItem;
  },
  async discardItem(identifier) {
    const item = await productStore.getById(identifier);
    if (!item) throw createError('Produto não encontrado.', 404);
    if (item.stock !== 0) throw createError('Só é possível excluir produtos com saldo zero.', 400);
    if (await movementStore.hasProductHistory(identifier)) {
      throw createError('Não é possível excluir produto com histórico de movimentações.', 400);
    }
    await productStore.remove(identifier);
  },
};
