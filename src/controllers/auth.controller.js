import authService from "../services/auth.service.js";

export default {
    async login(req, res, next)
    {
        try {
        const { email, password } = req.body;
        const result = await authService.loginUser({ email, password });
        res.json(result);
        } catch (error) {
        next(error);
        }
    },
};
