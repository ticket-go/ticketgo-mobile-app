import { api } from "../services/api";
import { Auth } from "../types/auth";
import { saveSecureItem, deleteSecureItem } from "@/lib/utils";

export async function authLogin(
  username: string,
  password: string
): Promise<Auth | void> {
  try {
    const response = await api.post("/auth/login/", {
      username,
      password,
    });

    if (response.status === 200) {
      const data = await response.data;
      const { access_token, refresh_token, user } = data;

      if (access_token && refresh_token) {
        await saveSecureItem("access_token", access_token);
        await saveSecureItem("refresh_token", refresh_token);
        alert(`${user.first_name} seja-bem vindo!`);
      } else {
        console.error("Tokens are undefined, check the response structure.");
      }
      return data;
    } else {
      console.error("Response not OK:", response.status);
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
}

export async function authLogout(): Promise<{ success: boolean }> {
  try {
    const response = await api.post("/auth/logout/");

    if (response.status === 200) {
      await deleteSecureItem("access_token");
      await deleteSecureItem("refresh_token");
      return { success: true };
    } else {
      console.error("Logout failed with status:", response.status);
    }
  } catch (error) {
    console.error("Error during logout:", error);
  }

  return { success: false };
}
