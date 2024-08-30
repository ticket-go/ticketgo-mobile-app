import { Address } from "./address";

export interface User {
  user_id: string;
  username?: string;
  first_name: string;
  last_name?: string;
  phone?: string;
  cpf?: string;
  image?: string;
  email?: string;
  gender?: string;
  privileged?: boolean;
  address?: Address;
}
