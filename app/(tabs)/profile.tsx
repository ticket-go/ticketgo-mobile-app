import styled from "styled-components/native";

import { useAuth } from "@/context/authContext";
import { useRouter } from "expo-router";
import { Button } from "@/components/button";

export default function HomeScreen() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    try {
      logout();
      router.replace("/");
      alert("Logout realizado com sucesso");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <Container>
      <Button title="Logout" onPress={handleLogout} />
      <Button title="Back to Index" onPress={() => router.push("/(tabs)/home")} />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 4px;
`;
