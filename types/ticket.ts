import { AppEvent } from "./event";
import { Purchase } from "./puchase";
import { User } from "./user";

export interface Ticket {
    uuid: string;
    hash: string;
    verified: boolean;
    event?: AppEvent;
    user: User;
    purchase?: Purchase;
} 