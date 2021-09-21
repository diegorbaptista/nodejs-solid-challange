import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    name: string;
    email: string;
}

class CreateUserUseCase {
    constructor(private usersRepository: IUsersRepository) {}

    execute({ email, name }: IRequest): User {
        const userAlreadtExists = this.usersRepository.findByEmail(email);

        if (userAlreadtExists) {
            throw new Error(`User with e-mail ${email} already exists`);
        }

        return this.usersRepository.create({ email, name });
    }
}

export { CreateUserUseCase };
