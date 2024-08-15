import { Address } from "./address";
import { Organization } from "./organization";

export interface Event {
  uuid: string;
  name: string;
  date: string;
  time: string;
  description: string;
  category: string;
  category_display: string;
  status: string;
  status_display: string;
  image: string;
  ticket_value: string;
  half_ticket_value: string;
  ticket_quantity: number;
  half_ticket_quantity: number;
  tickets_sold: number;
  tickets_available: number;
  half_tickets_available: number;
  address: Address;
  organization: Organization;
}
