import { env } from "./config/env.js"
import connect from "./config/db.js";
import app from "./app.js";

const port = env.port || 3000;


(async () => {
    try {
        await connect(env.db_uri);
        app.listen(port, () => {
            console.log(`serviço "${env.app_name}" iniciado na porta: ${port}`);
        });
    } catch (error) {
        console.error('Erro ao conectar no banco ou iniciar o servidor', error);
        process.exit(1);
    }
})();
