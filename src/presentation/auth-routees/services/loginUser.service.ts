import { UserModel } from "../../../data";
import { CustomError, LoginUserDto } from "../../../domain";
import { Bcrypt, envs, JWTadapter } from "../../../config";

export class LoginUserService {

    async execute(body: LoginUserDto) {

        try {
            // 1 .- checamos si el usuario existe
            const user = await this.verifyUserExist(body.email);

            // 2.- checamos si la contraseña es correcta
            if (!this.verifyPassword(body.password, user.password)) {
                throw CustomError.badRequest('invalid credentials! 😒');
            }

            // 3.- genereamos un token
            const token = await JWTadapter.generateJWT({ id: user.id });

            if (!token) {
                throw CustomError.internalServer('something went wrong!');
            }

            // 4.- retornamos el token
            return {
                token,
                session: {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    balance: user.balance
                }
            };

        } catch (error) {
            throw error
        }

    }

    private verifyUserExist = async (email: string): Promise<UserModel> => {

        const user = await UserModel.findOne({
            where: {
                email: email
            }
        })

        if (!user) {
            throw CustomError.badRequest('User dont exist!');
        }

        return user;

    }

    private verifyPassword = (password: string, hash: string): boolean => {
        const passwordTrue = Bcrypt.comparePassword(password, hash);
        if (!passwordTrue) {
            throw CustomError.badRequest('invalid credentials! 😒');
        }
        return passwordTrue;
    }

}