import { Bcrypt, envs, JWTadapter } from "../../../config";
import { utils, EmailService } from "../../common";
import { UserModel } from "../../../data/";
import { RegisterUserDto, CustomError } from "../../../domain/";
import pug from "pug";


export class RegisterUserService {

    async execute(body: RegisterUserDto) {

        const user = new UserModel();

        user.name = body.name;
        user.email = body.email;
        user.password = Bcrypt.encriptPassword(body.password);
        user.account_number = utils.generateAccountNumber();

        try {

            await user.save();
            await this.sendEmailVerification(body.email, body.name);
            return 'User created!'

        } catch (error) {
            console.log(error);
            throw CustomError.internalServer('Failed to create user!');
        }

    }

    private sendEmailVerification = async (email: string, name: string) => {

        try {

            const token = await JWTadapter.generateJWT({ email: email }, 5 * 60 * 1000); // 5 minutes
            if (!token) return CustomError.badRequest('Failed to generate token!');

            const url = `http://${envs.APP_URL}/api/auth/verify-email/${token}`;

            const html = pug.renderFile('src/presentation/common/views/verifyEmail.pug', {
                name: name,
                verificationLink: url,
            })

            const emailService = new EmailService(
                envs.MAILER_SERRVICE,
                envs.MAILER_EMAIL,
                envs.MAILER_SECRET_KEY,
                false
            )

            await emailService.sendEmail({
                to: email,
                subject: 'Verify your email',
                html: html,
                // attachments: [],
            })

        } catch (error) {
            throw CustomError.badRequest('Failed to send email!');
        }

    }

    public validateEmail = async (token: string) => {
        try {

            const { email } = await JWTadapter.validateJWT(token) as { email: string };
            if (!email) throw CustomError.badRequest('Failed to verify token!');

            const user = await UserModel.findOne({
                where: { email: email },
            });
            if (!user) throw CustomError.badRequest('User not found!');
            if (user.email_verified) throw CustomError.badRequest('Email already verified!');

            user.email_verified = true;
            await user.save();
            return 'Email verified!';

        } catch (error) {
            console.log(error)
            throw CustomError.internalServer('something went wrong 💥')
        }
    }
}