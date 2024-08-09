import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosApiInstance } from "./api-client";
import { Auth } from "@/types/auth";
import { User } from "@/types/user";

export async function authLogin(
  username: string,
  password: string
): Promise<Auth | void> {
  try {
    const response = await axiosApiInstance.post("/auth/login/", {
      username,
      password,
    });
    if (response.status === 200) {
      const accessToken = response.data.access_token;
      const refreshToken = response.data.refresh_token;

      if (accessToken && refreshToken) {
        await AsyncStorage.setItem("access_token", accessToken);
        await AsyncStorage.setItem("refresh_token", refreshToken);
      } else {
        console.error("Tokens are undefined, check the response structure.");
      }
    }

    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
  }
}

export async function authLogout(): Promise<{ success: boolean }> {
  try {
    const token = await AsyncStorage.getItem("access_token");
    const refresh = await AsyncStorage.getItem("refresh_token");

    if (!token || !refresh) {
      return { success: false };
    }
    const response = await axiosApiInstance.post("/auth/logout/", {
      token,
    });
    if (response.status === 200) {
      await AsyncStorage.removeItem("access_token");
      await AsyncStorage.removeItem("refresh_token");
      return { success: true };
    }
    console.log(response.status);
  } catch (error) {
    console.error("Error during logout:", error);
  }
  return { success: false };
}
