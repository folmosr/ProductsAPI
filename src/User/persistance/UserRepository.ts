import { Repository } from "../../shared/persistence/Repository";
import { IUserRepository } from "./interfaces/IUserRepository";
import { User } from "./model/User";

export class UserRepository extends Repository<User> implements IUserRepository
{
    async seed() {
       User.initModel(this._database._client);
       await User.sync();
       await User.create({ userName : 'super.admin', password:'$2y$10$ENT0.jA3ANkGjzYDaz.O0u6xhcAP6wgFAGD7G.hzWEfKR/OtTsMmO'});
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