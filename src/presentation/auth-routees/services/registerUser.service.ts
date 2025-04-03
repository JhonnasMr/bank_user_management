import { Bcrypt } from "../../../config";
import { utils } from "../../common";
import { UserModel } from "../../../data/";
import { RegisterUserDto, CustomError } from "../../../domain/";

export class RegisterUserService {

    async execute(body: RegisterUserDto) {

        const user = new UserModel();

        user.name = body.name;
        user.email = body.email;
        user.password = Bcrypt.encriptPassword(body.password);
        user.account_number = utils.generateAccountNumber();

        try {

            await user.save();
            return 'User created!'

        } catch (error) {

            throw CustomError.badRequest('User exist!');

        }

    }

}