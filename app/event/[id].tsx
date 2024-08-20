// screens/DetailsScreen.js
import React from "react";
import { Text } from "react-native";
import { useRouter, useLocalSearchParams, Link } from "expo-router";
import { Button } from "@/components/button";
import { useEvent } from "@/context/eventContext";
import { Container } from "@/components/container";
import { Image } from "expo-image";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Typography } from "@/components/typography";
import { StyleSheet } from "react-native";

export default function DetailEventScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { selectedEvent } = useEvent();

  console.log("Navigating to event:", id);

  if (!selectedEvent) {
    return (
      <View>
        <Text>No event data found.</Text>
        <Button
          title="Back to Index"
          onPress={() => router.push("/(tabs)/home")}
        />
        <Text>Slug: {id}</Text>
      </View>
    );
  } else {
    return (
      <Container>
        <View>
          <Link href="/(tabs)/home">
            <Ionicons name="chevron-back" size={36} />
          </Link>
          <Typography type="subtitle"> {selectedEvent.name}</Typography>
        </View>
        <Typography type="default">
          Total de ingressos verificados: xx/{selectedEvent.tickets_sold}
        </Typography>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
  },
});

const View = styled.View`
  width: 100%;
  flex-direction: row;
  padding: 25px;
  margin: 25px;
  justify-content: start;
  align-items: center;
  gap: 10px;
`;
