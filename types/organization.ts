import { Event } from "./event";
import { User } from "./user";

export interface Organization {
  uuid: string;
  name: string;
  cnpj: string;
  user_organization: User[];
  event_organization: Event[];
}
