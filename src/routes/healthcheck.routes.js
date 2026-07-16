import { Router } from "express";

const healtcheckRoutes = Router();

healtcheckRoutes.get('/healthcheck/ping', (req, res) => {
    return res.status(200).json({
        message: 'OK',
        time: process.uptime()
    });
});

export default healtcheckRoutes;
