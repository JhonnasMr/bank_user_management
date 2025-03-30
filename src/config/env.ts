import 'dotenv/config';
import { get } from "env-var"

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    PGPORT: get('PGPORT').required().asPortNumber(),
    PGHOST: get('PGHOST').required().asString(),
    PGDATABASE: get('PGDATABASE').required().asString(),
    PGUSER: get('PGUSER').required().asString(),
    PGPASSWORD: get('PGPASSWORD').required().asString(),
}