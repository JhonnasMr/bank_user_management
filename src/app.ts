import "reflect-metadata";
import { Server } from "./presentation/server";
import { PostgreDataBase } from "./data";
import { AppRoute } from "./presentation/routes";
import { envs } from "./config/env";

async function Main() {

    const postgre = new PostgreDataBase({

        PGHOST: envs.PGHOST,
        PGPORT: envs.PGPORT,
        PGDATABASE: envs.PGDATABASE,
        PGPASSWORD: envs.PGPASSWORD,
        PGUSER: envs.PGUSER

    })

    await postgre.connect();

    const server = new Server({
        port: envs.PORT,
        routes: AppRoute.routes
    });

    await server.start();

}

Main();