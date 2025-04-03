import { genSaltSync, hashSync, compareSync } from "bcryptjs"

export class Bcrypt {

    static encriptPassword = (password: string): string => {
        const salt = genSaltSync(12);
        return hashSync(password, salt);
    }

    static comparePassword = (password: string, hash: string): boolean => {
        return compareSync(password, hash);
    }

}