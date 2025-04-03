import { regex } from "../../../config";

export class LoginUserDto {

    constructor(
        public readonly email: string,
        public readonly password: string
    ) { }

    static execute(body: { [key: string]: any }): [string?, LoginUserDto?] {

        const { email, password } = body;

        if (!email) return ['email is required!'];
        if (!password) return ['password is required!'];

        if (!regex.email.test(email)) return ['format email invalid 😒'];
        if (!regex.password.test(password)) return ['format password invalid 😒'];

        return [
            undefined,
            new LoginUserDto(
                email.trim(),
                password.trim()
            )
        ]

    }

}