import { User } from "User/persistance/model/User";
import { IUserService } from "./IUserService";
import { IUserRepository } from "../persistance/interfaces/IUserRepository";

export class UserService implements IUserService {
    private _repo: IUserRepository;

    constructor(repo: IUserRepository) {
        this._repo = repo;
    }

    run(model: User): Promise<User | null> {
        return this._repo.login(model.userName, model.password);
    }

}