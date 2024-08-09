import { useEffect } from "react";
import { router, Slot } from "expo-router";
import { ActivityIndicator } from "react-native";
import { AuthProvider, useAuth } from "@/context/authContext";

function InitialLayout() {
  const { isAuthenticated, isLoaded } = useAuth();

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (isAuthenticated) {
      router.replace("/(auth)/(tabs)/");
    } else {
      router.replace("/(public)");
    }
  }, [isAuthenticated]);

  return isLoaded ? (
    <Slot />
  ) : (
    <ActivityIndicator
      size="large"
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    />
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}
