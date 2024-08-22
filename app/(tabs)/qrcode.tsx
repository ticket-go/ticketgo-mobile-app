import styled from "styled-components/native";

import { View } from "react-native";
import { Link, Stack } from "expo-router";
import { useCameraPermissions } from "expo-camera";
import { Container } from "@/components/container";
import { Colors } from "@/styles/theme";
import { Typography } from "@/components/typography";

export default function CheckTicketScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  const isPermissionGranted = Boolean(permission?.granted);

  return (
    <Container>
      <Stack.Screen options={{ title: "algo", headerShown: false }} />

      <Typography type="defaultSemiBold">
        Use QR code para verificar seus ingressos.
      </Typography>

      <View style={{ marginBottom: 20 }}>
        <Button onPress={requestPermission} disabled={isPermissionGranted}>
          <ButtonText>
            {isPermissionGranted ? "Permission Granted" : "Request Permissions"}
          </ButtonText>
        </Button>
      </View>

      <Link href="/scanner" asChild>
        <Button>
          <ButtonText>Go to Scanner</ButtonText>
        </Button>
      </Link>
    </Container>
  );
}

const InstructionText = styled.Text`
  font-size: 18px;
  color: #000;
  margin-bottom: 20px;
  text-align: center;
`;

const Button = styled.TouchableOpacity`
  background-color: ${({ theme }) => Colors.light.tint};
  padding: 10px 20px;
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;
