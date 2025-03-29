
import { Server } from "./presentation/server";
import { AppRoute } from "./presentation/routes";
import { envs } from "./config/env";

async function Main() {

    const server = new Server(
        {
            port: envs.PORT,
            routes: AppRoute.routes
        }
    );

    await server.start();

}

Main();