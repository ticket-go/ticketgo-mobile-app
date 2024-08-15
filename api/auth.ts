import { api } from "../services/api";
import { Auth } from "../types/auth";
import { saveSecureItem, deleteSecureItem } from "@/lib/utils";

export async function authLogin(
  username: string,
  password: string
): Promise<Auth | void> {
  try {
    const response = await fetch("http://127.0.0.1:8000/auth/login/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.status === 200) {
      const accessToken = response.headers.get("access-token");
      const refreshToken = response.headers.get("refresh-token");

      if (accessToken && refreshToken) {
        await saveSecureItem("access_token", accessToken);
        await saveSecureItem("refresh_token", refreshToken);
      } else {
        console.error("Tokens are undefined, check the response structure.");
      }
    }
    return response.json();
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
    }
  } catch (error) {
    console.error("Error during logout:", error);
  }

  return { success: false };
}
