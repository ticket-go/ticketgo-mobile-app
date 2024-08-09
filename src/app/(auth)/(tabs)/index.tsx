import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Typography } from "@/components/typography";
import { useAuth } from "@/context/authContext";
import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
  }

  return (
    <Container>
      <View style={styles.titleContainer}>
        <Typography type="title">Welcome back, </Typography>
        <Typography type="title" style={{ fontWeight: "bold" }}>
          {user?.username}
        </Typography>
      </View>

      <Button title="Sair" onPress={handleLogout}></Button>
    </Container>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
