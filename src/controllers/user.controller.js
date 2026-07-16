import userService from '../services/user.service.js';
export default {
  async register(req, res, next) {
    try { res.status(201).json(await userService.createUser(req.body)); }
    catch (error) { next(error); }
  },
};
