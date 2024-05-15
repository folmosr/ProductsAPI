import { Repository } from "../../shared/persistence/Repository";
import { IUserRepository } from "./interfaces/IUserRepository";
import { User } from "./model/User";

export class UserRepository extends Repository<User> implements IUserRepository {
    async seed() {
        User.initModel(this._database._client);
        await User.sync();
        await User.create({ userName: 'super.admin', password: '$2a$10$tiGbjYFgtAVLsqmbjS9amO0hg0.itWAnQ3eE/4OaxBRFftm11SRWq' });
    }

    async initModel(): Promise<void> {
        User.initModel(this._database._client);
    }

    login(userName: string, password: string): Promise<User | null> {
        return (this._database._client.models['User']
            .findOne({
                where: {
                    userName,
                    password
                }
            }) as unknown) as Promise<User | null>;
    }

}