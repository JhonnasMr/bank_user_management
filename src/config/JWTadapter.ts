import jwt from "jsonwebtoken"
import { envs } from "./env"

export class JWTadapter {

    static async generateJWT(payload: any, expiresIn: number = 60 * 60 * 24) {
        return new Promise((resolve) => {
            jwt.sign(payload, envs.JWT_SECRET_KEY, { expiresIn: expiresIn }, (err, token) => {
                if (err) {
                    resolve(null);
                }
                resolve(token);
            })
        })
    }

    static async validateJWT(token: string) {
        if (!token) return { id: null };

        return new Promise((resolve) => {
            jwt.verify(token, envs.JWT_SECRET_KEY, (err, token) => {
                if (err) {
                    console.log(err)
                    resolve(null);
                }
                resolve(token);
            })
        })
    }

}