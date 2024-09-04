import styled from "styled-components/native";
import { useAuth } from "@/context/authContext";
import { useRouter } from "expo-router";
import React from "react";
import { Typography } from "@/components/typography";
import { SpanTitle } from "@/styles/theme";
import { Feather } from "@expo/vector-icons";
import { ProfileCard } from "@/components/profile-card";

export default function HomeScreen() {
  const router = useRouter();
  const { logout } = useAuth();

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
      <TopSection>
        <Typography type="title">
          Ticket<SpanTitle>GO</SpanTitle>
        </Typography>
        <ButtonWrapper>
          <LogoutIcon
            name="log-out"
            size={24}
            color="red"
            onPress={handleLogout}
          />
        </ButtonWrapper>
      </TopSection>

      <ProfileCard />
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const TopSection = styled.View`
  flex-direction: row;
  margin-top: 30px;
  width: 90%;
  height: 10%;
  justify-content: space-between;
  align-items: center;
`;

const ButtonWrapper = styled.View`
  width: 40%;
  align-items: flex-end;
`;

const LogoutIcon = styled(Feather)`
  margin: 10px;
`;
