import React, { useState } from "react";
import styled from "styled-components/native";
import { Typography } from "../typography";
import { Image } from "expo-image";
import { useAuth } from "@/context/authContext";
import { Accordion } from "../acordion";

export function ProfileCard() {
  const { user } = useAuth();
  const avatarImage = require("@/assets/images/avatar.png");

  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (accordion: string) => {
    setOpenAccordion(openAccordion === accordion ? null : accordion);
  };

  return (
    <ProfileContainer>
      <TopSection>
        <Typography
          type="title"
          style={{ marginBottom: 24, textAlign: "center" }}
        >
          {user?.username}
        </Typography>

        {user?.image ? (
          <Image
            source={!user.image ? { uri: user.image } : avatarImage}
            style={{ width: 150, height: 150, marginBottom: 20 }}
          />
        ) : (
          <ImageEvent source={avatarImage} />
        )}
      </TopSection>

      <BottomSection>
        <Accordion
          title="Informações Pessoais"
          isOpen={openAccordion === "personal"}
          onPress={() => toggleAccordion("personal")}
        >
          <Typography>
            <Typography type="bold">Nome: </Typography>
            {user?.first_name} {user?.last_name}
          </Typography>

          <Typography>
            <Typography type="bold">CPF: </Typography>
            {user?.cpf}
          </Typography>

          <Typography>
            <Typography type="bold">E-mail: </Typography>
            {user?.email}
          </Typography>

          <Typography>
            <Typography type="bold">Telefone: </Typography>
            {user?.phone}
          </Typography>
        </Accordion>

        <Accordion
          title="Endereço"
          isOpen={openAccordion === "address"}
          onPress={() => toggleAccordion("address")}
        >
          <Typography>
            {user?.address?.street} - {user?.address?.number} -{" "}
            {user?.address?.zip_code}
          </Typography>
        </Accordion>
      </BottomSection>
    </ProfileContainer>
  );
}

const ProfileContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TopSection = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const BottomSection = styled.View`
  width: 100%;
  padding: 0 16px;
  justify-content: center;
  align-items: center;
`;

export const ImageEvent = styled.ImageBackground`
  width: 300px;
  height: 300px;
  border-radius: 150px;
  overflow: hidden;
`;
