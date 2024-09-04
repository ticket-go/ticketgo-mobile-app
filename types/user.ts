import { Address } from "./address";

export interface User {
  user_id: string;
  username: string;
  first_name: string;
  last_name: string;
  phone: string;
  birthdate: string;
  cpf: string;
  email: string;
  gender: string;
  image: string;
  privileged: boolean;
  address: Address;
  address_id: number;
}
