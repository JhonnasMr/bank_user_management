import { regex } from "../../../config/regex";

export class RegisterUserDto {

    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string
    ) { }

    static execute(options: { [key: string]: any }): [string?, RegisterUserDto?] {

        const { name, email, password } = options;

        if (!name) return ['name is required'];
        if (!email) return ['email is required'];
        if (!password) return ['password is required'];

        if (!regex.noSimbol240char.test(name)) return ['format name is invalid 🤨'];
        if (!regex.email.test(email)) return ['format email is invalid 🤨'];
        if (!regex.password.test(password)) return ['format password is invalid 🤨'];

        return [
            undefined,
            new RegisterUserDto(
                name.trim().toLowerCase(),
                email.trim(),
                password.trim()
            )
        ]

    }

}