import express, { Router } from "express";

interface Options {
    port: Number,
    routes: Router
}

export class Server {

    public readonly app = express();
    public readonly port;
    public readonly routes;

    constructor(
        options: Options
    ) {
        this.port = options.port,
            this.routes = options.routes
    }

    async start() {

        this.app.use(express.json());

        this.app.use(express.urlencoded());

        this.app.use(this.routes);

        this.app.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port} 🙂`);
        });

    }

}