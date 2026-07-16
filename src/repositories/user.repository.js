import User from '../models/user.model.js';

export default {
  create: (data) => User.create(data),
  findByEmail: (email, withPassword = false) => withPassword ? User.findOne({ email }).select('+password') : User.findOne({ email }),
};
