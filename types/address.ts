export interface Address {
  uuid: string;
  street: string;
  number: number;
  city: string;
  state: string;
  district: string;
  zip_code: string;
  country: string;
  complement?: string;
}
