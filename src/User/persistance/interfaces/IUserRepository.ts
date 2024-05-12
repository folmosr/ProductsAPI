import { User } from "../model/User";

export interface IUserRepository {
    seed(): Promise<void>;
    initModel(): Promise<void>;
    login(userName: string, password: string): Promise<User | null>;
}