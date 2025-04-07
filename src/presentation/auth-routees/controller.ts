import { Request, Response } from "express";
import { RegisterUserDto, LoginUserDto, CustomError } from "../../domain";
import { envs } from "../../config";

import { RegisterUserService } from "./services/registerUser.service";
import { LoginUserService } from "./services/loginUser.service";

export class AuthController {

    constructor(
        private readonly registerUserService: RegisterUserService,
        private readonly loginUserService: LoginUserService
    ) { }

    private handleError = (err: unknown, res: Response) => {

        if (err instanceof CustomError) {
            return res.status(err.code).json({
                message: err.message
            });
        }

        console.log(err)
        return res.status(500).json({
            message: 'something went wrong! 💥🧨'
        })

    }

    registerUser = (req: Request, res: Response) => {

        const [err, registerUserDto] = RegisterUserDto.execute(req.body);

        if (err) {
            return res.status(422)
                .json({
                    message: err
                })
        }

        this.registerUserService.execute(registerUserDto!)
            .then((data) => {
                return res.status(200).json({
                    message: data
                })
            })
            .catch((err) => {
                return this.handleError(err, res);
            })

    }

    loginUser = (req: Request, res: Response) => {

        const [err, loginUserDto] = LoginUserDto.execute(req.body);

        if (err) {
            return res.status(422).json({
                message: err
            })
        }

        this.loginUserService
            .execute(loginUserDto!)
            .then((data) => {
                res.cookie('token', data.token, {
                    httpOnly: true, // Esto lo que hace es que el token no se pueda leer desde el lado del cliente mediante javascript
                    secure: envs.NODE_ENV === 'production', // Esto es para que solo se pueda enviar el token a través de https
                    sameSite: 'strict', // Esto es para que el token solo se pueda enviar a través de la misma página
                    maxAge: 1 * 60 * 60 * 1000 // Esto es para que el token expire en 1 horas
                })
                return res.status(200).json(data.session)
            })
            .catch((err) => {
                return this.handleError(err, res);
            })

    }

    verifyEmail = (req: Request, res: Response) => {

        const { token } = req.params;

        if (!token) {
            return res.status(422).json({
                message: 'token is required'
            })
        }

        this.registerUserService.validateEmail(token)
            .then(data => {
                return res.status(200).json({
                    message: data
                })
            })
            .catch(err => {
                return this.handleError(err, res);
            })

    }

}