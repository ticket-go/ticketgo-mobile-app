import styled from "styled-components/native";
import { Container } from "@/components/container";
import { useEffect, useState } from "react";
import { FlatList, ListRenderItem, ActivityIndicator } from "react-native";
import { Typography } from "@/components/typography";
import { EventCard } from "@/components/event-card";
import { Event } from "@/types/event";
import { api } from "@/services/api";
import { tintColorLight } from "@/styles/colors";

export default function HomeScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await api.get("/events/");
        setEvents(response.data.results);
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
        <ActivityIndicator size="large" color={tintColorLight} />
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
      <ViewHeader>
        <Typography type="subtitle">Meus Eventos</Typography>
      </ViewHeader>

      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.uuid}
        style={{
          width: "95%",
        }}
        ItemSeparatorComponent={() => <Separator />}
        ListFooterComponent={<FooterSpacing />}
      />
    </Container>
  );
}

const ViewHeader = styled.View`
  width: 100%;
  padding: 20px 20px;
  background-color: transparent;
  align-items: flex-start;
  justify-content: center;
  margin-top: 40px;
`;

const Separator = styled.View`
  height: 20px;
`;

const FooterSpacing = styled.View`
  height: 40px;
`;
