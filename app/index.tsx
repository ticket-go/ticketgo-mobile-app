import { useState } from "react";
import styled from "styled-components/native";
import { TouchableOpacity, Alert, Text } from "react-native";
import { SpanTitle } from "../styles/theme";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Container } from "../components/container";
import { Typography } from "../components/typography";
import { useAuth } from "../context/authContext";

export default function SignIn() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login } = useAuth();

  const handleSubmit = async () => {
    try {
      await login(username, password);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handlePress = () => {
    Alert.alert("Redirecting to password recovery");
  };

  return (
    <Container>
      <Content>
        <Typography type="title" style={{ marginBottom: 30 }}>
          Ticket<SpanTitle>GO</SpanTitle>
        </Typography>
        <Input
          value={username}
          onChangeText={setUsername}
          placeholder="Usuário"
        />
        <Input
          value={password}
          onChangeText={setPassword}
          placeholder="Senha"
          secureTextEntry={true}
        />

        <Button title="Entrar" onPress={handleSubmit} />

        <TouchableOpacity onPress={handlePress}>
          <Text>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </Content>
    </Container>
  );
}

export const Content = styled.View`
  width: 85%;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
`;

export const Link = styled.Button`
  flex: 1;
  align-items: flex-end;
`;
