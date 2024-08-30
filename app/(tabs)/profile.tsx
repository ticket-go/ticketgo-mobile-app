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
        <View>
          <Typography type="title">
            Ticket<SpanTitle>GO</SpanTitle>
          </Typography>
          <ButtonWrapper>
            <LogoutIcon
              name="log-out"
              size={24}
              color="black"
              onPress={handleLogout}
            />
          </ButtonWrapper>
        </View>
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
  width: 100%;
  height: 5%;
  justify-content: center;
  align-items: center;
`;

const BottomSection = styled.View`
  width: 100%;
  height: 80%;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.View`
  width: 40%;
  align-items: flex-end;
`;

const LogoutIcon = styled(Feather)`
  margin: 10px;
`;

const View = styled.View`
  flex-direction: row;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;

export const ImageEvent = styled.ImageBackground`
  width: 350px;
  height: 350px;
  border-radius: 10px;
  overflow: hidden;
`;
