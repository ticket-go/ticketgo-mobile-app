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
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleSubmit = async () => {
    try {
      await login(username, password);
    } catch (error) {
      setError("Usuário ou senha incorretos.");
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
        <ViewInput>
          <Input
            value={username}
            onChangeText={setUsername}
            placeholder="Usuário"
          />
          {error && <Text style={{ color: "red", marginTop: 5 }}>{error}</Text>}
        </ViewInput>
        <ViewInput>
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="Senha"
            secureTextEntry={true}
          />
          {error && <Text style={{ color: "red", marginTop: 5 }}>{error}</Text>}
        </ViewInput>

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

export const ViewInput = styled.View`
  width: 100%;
`;

export const Link = styled.Button`
  flex: 1;
  align-items: flex-end;
`;
