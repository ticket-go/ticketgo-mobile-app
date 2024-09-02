import { Alert } from "react-native";
import { api } from "../services/api";
import { Auth } from "../types/auth";
import { saveSecureItem, deleteSecureItem, getSecureItem } from "@/lib/utils";
import { AxiosError } from "axios";

export async function authLogin(
  username: string,
  password: string
): Promise<Auth | void> {
  try {
    const response = await api.post("/auth/login-mobile/", {
      username,
      password,
    });

    if (response.status === 200) {
      const data = await response.data;
      const { access_token, refresh_token, user } = data;

      if (access_token && refresh_token) {
        await saveSecureItem("access_token", access_token);
        await saveSecureItem("refresh_token", refresh_token);
      } else {
        console.error("Tokens are undefined, check the response structure.");
      }
      return data;
    } else {
      console.error("Response not OK:", response.status);
    }
  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.response &&
      error.response.status === 401
    ) {
      Alert.alert("TicketGo informa", "Usuário não pode entrar nesse sistema!");
    }
    throw error;
  }
}

export async function authLogout(): Promise<{ success: boolean }> {
  try {
    const token = await getSecureItem("access_token");

    const response = await api.post(
      "/auth/logout/",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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
