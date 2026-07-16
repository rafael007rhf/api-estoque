import movementService from '../services/stock-movement.service.js';

export default {
  async addMovement(request, response, next) {
    try {
      const createdMovement = await movementService.registerMovement(request.body, request.user.id);
      return response.status(201).json(createdMovement);
    } catch (failure) {
      return next(failure);
    }
  },
};
