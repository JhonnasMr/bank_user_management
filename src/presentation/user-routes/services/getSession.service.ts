import { UserModel } from "../../../data";
import { CustomError } from "../../../domain";

export class GetSessionService {

    async execute(session: { [key: string]: any }) {

        if (!session) {
            throw CustomError.unAutorized('log in');
        }
        // XD;
        return session;

    }

}