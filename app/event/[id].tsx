import React, { useEffect, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  ActivityIndicator,
  View,
  Alert,
} from "react-native";
import { useRouter, Link } from "expo-router";
import { useEvent } from "@/context/eventContext";
import { Container } from "@/components/container";
import { Ionicons } from "@expo/vector-icons";
import { Typography } from "@/components/typography";
import { TicketCard } from "@/components/ticket";
import { Ticket } from "@/types/ticket";
import { api } from "@/services/api";
import { Colors } from "@/styles/colors";

import styled from "styled-components/native";
import { useAuth } from "@/context/authContext";
import { usePermissions } from "@/context/permissionsContext";

export default function DetailEventScreen() {
  const router = useRouter();
  const { selectedEvent } = useEvent();
  const eventUuid = selectedEvent?.uuid;
  const { accessToken } = useAuth();
  const { isPermissionGranted, requestPermission, setIsPermissionGranted } =
    usePermissions();

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const response = await api.get(`/events/${eventUuid}/tickets/confirmed/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setTickets(response.data);
      } catch (err) {
        setError("Erro ao carregar ingressos");
      } finally {
        setLoading(false);
      }
    }
    fetchTickets();
  }, [eventUuid]);

  const handleQRButtonPress = async () => {
    if (isPermissionGranted) {
      router.push("/scanner");
    } else {
      const permissionResponse = await requestPermission();
      if (permissionResponse && permissionResponse.granted) {
        setIsPermissionGranted(true);
        router.push("/scanner");
      } else {
        Alert.alert(
          "Permissão Necessária",
          "É necessário conceder permissão para usar a câmera.",
          [{ text: "OK" }]
        );
      }
    }
  };

  const renderItem: ListRenderItem<Ticket> = ({ item }) => {
    return <TicketCard ticket={item} checked={item.verified} />;
  };

  if (loading) {
    return (
      <CenteredView>
        <ActivityIndicator size="large" color="#CB1EE8" />
        <Typography type="subtitle" style={{ marginTop: 10 }}>
          Carregando ingressos...
        </Typography>
      </CenteredView>
    );
  }

  if (error) {
    return (
      <CenteredView>
        <Typography>{error}</Typography>
        <ButtonBack onPress={() => router.back()}>
          <Typography type="button" color="white">
            Voltar
          </Typography>
        </ButtonBack>
      </CenteredView>
    );
  }

  if (tickets.length === 0) {
    return (
      <CenteredView>
        <Typography>Nenhum ingresso disponível</Typography>
        <ButtonBack onPress={() => router.back()}>
          <Typography type="button" color="white">
            Voltar
          </Typography>
        </ButtonBack>
      </CenteredView>
    );
  }

  return (
    <Container>
      <ViewHeader>
        <Link href="/(tabs)/home">
          <Ionicons name="chevron-back" size={28} color="#CB1EE8" />
        </Link>
        <TitleContainer>
          <Typography type="subtitle">{selectedEvent?.name}</Typography>
        </TitleContainer>
      </ViewHeader>

      <CounterTickets>
        <Typography type="default" style={{ fontWeight: "600", fontSize: 16 }}>
          Total de ingressos verificados:{" "}
          <Highlight>{selectedEvent?.tickets_verified}</Highlight>/
          {selectedEvent?.tickets_sold}
        </Typography>
      </CounterTickets>

      <FlatListContainer>
        <FlatList
          data={tickets}
          renderItem={renderItem}
          keyExtractor={(item) => item.uuid}
          style={{ width: "100%" }}
          contentContainerStyle={{ alignItems: "center" }}
          ItemSeparatorComponent={() => <Separator />}
          snapToInterval={120}
        />
      </FlatListContainer>

      <ViewScanner onPress={handleQRButtonPress}>
        <Ionicons name="qr-code" size={32} color="#ffff" />
      </ViewScanner>
    </Container>
  );
}

// Styles

const ViewHeader = styled.View`
  width: 100%;
  padding: 20px;
  margin-top: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ViewScanner = styled.TouchableOpacity`
  background-color: #cb1ee8;
  padding: 15px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 15px;
`;

const TitleContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-left: -40px;
`;

const CounterTickets = styled.View`
  width: 100%;
  padding: 0px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
  align-items: center;
`;

const Highlight = styled.Text`
  color: #cb1ee8;
  font-weight: bold;
`;

const CenteredView = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const ButtonBack = styled.TouchableOpacity`
  background-color: #cb1ee8;
  padding: 15px 40px;
  border-radius: 10px;
  margin-top: 10px;
`;

const FlatListContainer = styled.View`
  flex: 1;
  height: 80%;
  width: 100%;
  margin: 5px;
`;

const Separator = styled.View`
  background-color: #ccc;
  margin: 7px 0;
`;
