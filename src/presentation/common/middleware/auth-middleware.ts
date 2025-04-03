import { Request, Response, NextFunction } from 'express';
import { JWTadapter } from "../../../config";
import { UserModel } from '../../../data';

export class AuthMiddleware {

    static async protect(req: Request, res: Response, next: NextFunction) {

        const { id } = await JWTadapter.validateJWT(req.cookies.token) as { id: string | null }

        if (!id) {
            return res.status(401).json({
                message: 'token invalid/expire'
            })
        }

        const user = await UserModel.findOne({
            where: {
                id: id,
            }
        })

        req.body.session = {
            name: user?.name,
            email: user?.email,
            balance: user?.balance,
            created_at: user?.created_at,
            account_number: user?.account_number,
            password: user?.password
        }

        next();

    }

}