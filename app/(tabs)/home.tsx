import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { FlatList, ListRenderItem, ActivityIndicator } from "react-native";
import { Typography } from "@/components/typography";
import { EventCard } from "@/components/event-card";
import { Event } from "@/types/event";
import { api } from "@/services/api";
import { Button } from "@/components/button";
import { useAuth } from "@/context/authContext";
import { Link, useRouter } from "expo-router";
import { Container } from "@/components/container";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { logout } = useAuth();
  const router = useRouter();

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
      <View>
          <Ionicons name="chevron-back" size={36} />
        <Typography type="title">Meus Eventos</Typography>
      </View>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.uuid}
        style={{ width: "80%" }}
        ItemSeparatorComponent={() => <Separator />}
        snapToInterval={120}
      />
    </Container>
  );
}

const View = styled.View`
  width: 100%;
  flex-direction: row;
  padding: 25px;
  margin: 25px;
  justify-content: start;
  align-items: center;
  gap: 10px;
`;

const Separator = styled.View`
  width: "50%";
  margin-inline: 10px;
  margin-bottom: 70px;
`;
