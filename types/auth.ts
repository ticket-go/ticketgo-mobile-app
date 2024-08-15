import { User } from "./user";

export interface Auth {
  access_token: string;
  refresh_token: string;
  user: User;
}
