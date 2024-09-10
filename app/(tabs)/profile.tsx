import styled from "styled-components/native";
import { useAuth } from "@/context/authContext";
import { Typography } from "@/components/typography";
import { SpanTitle } from "@/styles/theme";
import { Feather } from "@expo/vector-icons";
import { ProfileCard } from "@/components/profile-card";
import { tintColorLight } from "@/styles/colors";

export default function HomeScreen() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
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
            color={tintColorLight}
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
