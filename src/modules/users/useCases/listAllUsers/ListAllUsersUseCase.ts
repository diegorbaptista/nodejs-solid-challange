import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    user_id: string;
}

class ListAllUsersUseCase {
    constructor(private usersRepository: IUsersRepository) {}

    execute({ user_id }: IRequest): User[] {
        const user = this.usersRepository.findById(user_id);

        if (!user) {
            throw new Error("User not found");
        }

        if (!user.admin) {
            throw new Error("This user is not allowed to list another users");
        }

        return this.usersRepository.list();
    }
}

export { ListAllUsersUseCase };
