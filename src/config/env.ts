import 'dotenv/config';
import { get } from "env-var"

export const envs = {
    NODE_ENV: get('NODE_ENV').required().asString(),
    PORT: get('PORT').required().asPortNumber(),
    PGPORT: get('PGPORT').required().asPortNumber(),
    PGHOST: get('PGHOST').required().asString(),
    PGDATABASE: get('PGDATABASE').required().asString(),
    PGUSER: get('PGUSER').required().asString(),
    PGPASSWORD: get('PGPASSWORD').required().asString(),
    JWT_SECRET_KEY: get('JWT_SECRET_KEY').required().asString(),
    JWT_EXPIRED_IN: get('JWT_EXPIRED_IN').required().asString(),
}