import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import {
  FlatList,
  ListRenderItem,
  ActivityIndicator,
  View,
  Text,
} from "react-native";
import { Typography } from "@/components/typography";
import { EventCard } from "@/components/event-card";
import { Event } from "@/types/event";
import { api } from "@/services/api";

export default function HomeScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await api.get<Event[]>("/events");
        setEvents(response.data);
        return response;
      } catch (err) {
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const renderItem: ListRenderItem<Event> = ({ item }) => (
    <EventCard event={item} />
  );

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography type="subtitle">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.uuid}
        ListHeaderComponent={() => <Title>Meus Eventos</Title>}
        style={{ width: "80%" }}
        horizontal={true}
        ItemSeparatorComponent={() => <Separator />}
        snapToInterval={120}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Separator = styled.View`
  width: "50%";
  margin-inline: 10px;
`;
