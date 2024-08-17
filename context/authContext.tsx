import { createContext, useContext, useState, useEffect } from "react";
import { authLogin, authLogout } from "@/api/auth";
import { Auth } from "@/types/auth";
import { useRouter } from "expo-router";
import { getSecureItem, saveSecureItem, deleteSecureItem } from "@/lib/utils";

interface AuthContextType {
  user: Auth["user"] | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoaded: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<Auth["user"] | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const loadStoredAuth = async () => {
      const storedUser = await getSecureItem("user");
      const storedAccessToken = await getSecureItem("access_token");
      const storedRefreshToken = await getSecureItem("refresh_token");

      if (storedUser && storedAccessToken && storedRefreshToken) {
        setUser(JSON.parse(storedUser));
        setAccessToken(storedAccessToken);
        setRefreshToken(storedRefreshToken);
      }
      setIsLoaded(true);
    };

    loadStoredAuth();
  }, []);

  useEffect(() => {
    if (user && accessToken && refreshToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user, accessToken, refreshToken]);

  const login = async (username: string, password: string): Promise<void> => {
    try {
      const authData = await authLogin(username, password);

      if (authData) {
        await saveSecureItem("user", JSON.stringify(authData.user));
        await saveSecureItem("access_token", authData.access_token);
        await saveSecureItem("refresh_token", authData.refresh_token);

        setUser(authData.user);
        setAccessToken(authData.access_token);
        setRefreshToken(authData.refresh_token);
        router.replace("/(tabs)/home");
      } else {
        console.error("Invalid login data");
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authLogout();

      await deleteSecureItem("user");
      await deleteSecureItem("access_token");
      await deleteSecureItem("refresh_token");
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
      router.replace("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        isAuthenticated,
        isLoaded,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
