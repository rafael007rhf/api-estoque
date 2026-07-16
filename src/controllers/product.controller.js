import inventoryService from '../services/product.service.js';

async function execute(response, next, operation, successStatus = 200) {
  try {
    const result = await operation();
    if (successStatus === 204) return response.status(204).end();
    return response.status(successStatus).json(result);
  } catch (failure) {
    return next(failure);
  }
}

export default {
  addProduct(request, response, next) {
    return execute(response, next, () => inventoryService.registerItem(request.body), 201);
  },
  showProducts(_request, response, next) {
    return execute(response, next, () => inventoryService.fetchCatalog());
  },
  showProduct(request, response, next) {
    return execute(response, next, () => inventoryService.fetchItem(request.params.id));
  },
  editProduct(request, response, next) {
    return execute(response, next, () => inventoryService.editItem(request.params.id, request.body));
  },
  deleteProduct(request, response, next) {
    return execute(response, next, () => inventoryService.discardItem(request.params.id), 204);
  },
};
