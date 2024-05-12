import { User } from "../persistance/model/User";

export interface IUserService {
    run(model: User): Promise<User | null>;
}