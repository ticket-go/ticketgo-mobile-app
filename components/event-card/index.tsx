import { Event } from "@/types/event";
import { Container, View, ImageEvent, TitleEvent, DateEvent } from "./styles";
import Animated from "react-native-reanimated";
import { useRouter } from "expo-router";
interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const router = useRouter();

  const handleClickEvent = () => {
    console.log("click");
  };

  return (
    <Animated.View>
      <Container onPress={() => handleClickEvent()}>
        <View>
          <TitleEvent>{event.name}</TitleEvent>
          <DateEvent>{event.date}</DateEvent>
        </View>
        <ImageEvent source={{ uri: "https://picsum.photos/400/300" }} />
      </Container>
    </Animated.View>
  );
}
