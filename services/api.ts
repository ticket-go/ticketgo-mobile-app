import axios from "axios";

export const api = axios.create({
  baseURL: "https://ticketgo-backend-dev.onrender.com",
});
