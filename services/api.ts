import axios from "axios";
import { IP_LOCAL } from "@env";

const BASE_URL = IP_LOCAL; 

export const api = axios.create({
  baseURL: BASE_URL,
});
