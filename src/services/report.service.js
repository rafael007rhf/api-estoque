import repo from '../repositories/report.repository.js';
export default {
  getAllBalances: () => repo.getAllBalances(),
  getHistory: () => repo.getHistory(),
};
