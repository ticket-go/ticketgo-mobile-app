import { User } from "./user";

export interface Purchase {
    value: number;
    status: string;
    user: User;
}