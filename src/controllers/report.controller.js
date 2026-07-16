import service from '../services/report.service.js';
export default {
  async balances(_req, res, next) { try { res.json(await service.getAllBalances()); } catch (e) { next(e); } },
  async history(_req, res, next) { try { res.json(await service.getHistory()); } catch (e) { next(e); } },
};
