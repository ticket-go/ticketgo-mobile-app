import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authLogin, authLogout } from "@/api/auth";
import { Auth } from "@/types/auth";
import { router } from "expo-router";

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

  useEffect(() => {
    const loadStoredAuth = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      const storedAccessToken = await AsyncStorage.getItem("access_token");
      const storedRefreshToken = await AsyncStorage.getItem("refresh_token");

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
    await authLogin(username, password);
  };

  const logout = async () => {
    await authLogout();

    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("access_token");
    await AsyncStorage.removeItem("refresh_token");
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    router.replace("/(public)");
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
