import React from "react";
import { FlatList, ListRenderItem, Text, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams, Link } from "expo-router";
import { Button } from "@/components/button";
import { useEvent } from "@/context/eventContext";
import { Container } from "@/components/container";
import { Ionicons } from "@expo/vector-icons";
import { Typography } from "@/components/typography";
import styled from "styled-components/native";
import { TicketCard } from "@/components/ticket";
import { Ticket } from "@/types/ticket";
import { tickets } from "@/utils/ticketsJson";

export default function DetailEventScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { selectedEvent } = useEvent();

  const renderItem: ListRenderItem<Ticket> = ({ item }) => {
    return <TicketCard ticket={item} checked={item.verified} />;
  };

  if (!selectedEvent) {
    return (
      <CenteredView>
        <Text>Nenhum evento</Text>
        <Button
          title="Back to Index"
          onPress={() => router.push("/(tabs)/home")}
        />
        <Text>Slug: {id}</Text>
      </CenteredView>
    );
  } else {
    return (
      <Container>
        <CenteredContent>
          <HeaderView>
            <Link href="/(tabs)/home">
              <Ionicons name="chevron-back" size={36} />
            </Link>
            <Typography type="subtitle"> {selectedEvent.name}</Typography>
          </HeaderView>
          <HeaderView>
            <Typography type="default">
              Total de ingressos verificados: xx/{selectedEvent.tickets_sold}
            </Typography>
          </HeaderView>

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
        </CenteredContent>
      </Container>
    );
  }
}

const HeaderView = styled.View`
  width: 80%;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 10px;
`;

const CenteredView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const CenteredContent = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const FlatListContainer = styled.View`
  height: 80%;
  width: 100%;
  margin: 5px;
`;

const Separator = styled.View`
  background-color: #ccc;
  margin: 7px 0;
`;
