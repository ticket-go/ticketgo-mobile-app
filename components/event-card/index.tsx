import { Event } from "@/types/event";
import { Container, ImageEvent, TitleEvent, DateEvent } from "./styles";
import Animated from "react-native-reanimated";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Animated.View>
      <Container>
        <ImageEvent source={{ uri: "https://picsum.photos/200/300" }} />
        <TitleEvent>{event.name}</TitleEvent>
        <DateEvent>{event.date}</DateEvent>
      </Container>
    </Animated.View>
  );
}
