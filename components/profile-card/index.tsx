import styled from "styled-components/native";
import { Typography } from "../typography";
import { Image } from "expo-image";
import { useAuth } from "@/context/authContext";

export function ProfileCard() {
  const { user } = useAuth();
  const avatarImage = require("@/assets/images/avatar-user.png");

  return (
    <BottomSection>
      <Typography
        type="title"
        style={{ marginBottom: 30, textAlign: "center" }}
      >
        {user?.first_name ?? "Usuário"}
      </Typography>

      {user?.image ? (
        <Image
          source={user.image}
          style={{ width: 300, height: 300, marginBottom: 20 }}
        />
      ) : (
        <ImageEvent source={avatarImage} />
      )}

      <Typography>
        <Typography type="bold">CPF: </Typography>
        {user?.cpf ?? "CPF não cadastrado"}
      </Typography>

      <Typography>
        <Typography type="bold">E-mail: </Typography>
        {user?.email ?? "Email não cadastrado"}
      </Typography>

      <Typography type="subtitle" style={{ marginTop: 10 }}>
        Endereço:
      </Typography>

      <Typography>
        <Typography type="bold">Local: </Typography>
        {user?.address
          ? `${user.address.street ?? "Rua não cadastrada"}, nº${
              user.address.number ?? "Não cadastrado"
            }`
          : "Endereço não cadastrado"}
      </Typography>

      <Typography>
        <Typography type="bold">Bairro: </Typography>
        {user?.address?.district ?? "Bairro não cadastrado"}
      </Typography>

      <Typography>
        <Typography type="bold">Cidade: </Typography>
        {user?.address
          ? `${user.address.city ?? "Cidade não cadastrada"} - ${
              user.address.state ?? "Estado não cadastrado"
            }`
          : "Endereço não cadastrado"}
      </Typography>
    </BottomSection>
  );
}

const BottomSection = styled.View`
  width: 100%;
  height: 80%;
  text-align: justify;
  justify-content: center;
  align-items: center;
`;

export const ImageEvent = styled.ImageBackground`
  width: 350px;
  height: 350px;
  border-radius: 10px;
  overflow: hidden;
`;
