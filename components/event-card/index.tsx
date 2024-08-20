import { AppEvent } from "@/types/event";
import { Container, View, ImageEvent, TitleEvent, DateEvent } from "./styles";
import Animated from "react-native-reanimated";
import { useRouter } from "expo-router";
import { useEvent } from "@/context/eventContext";
interface EventCardProps {
  event: AppEvent;
}

export function EventCard({ event }: EventCardProps) {
  const router = useRouter();
  const { setSelectedEvent } = useEvent();

  const handleSubmit = () => {
    setSelectedEvent(event);
    router.push(`/event/${event.uuid}`);
  };

  return (
    <Animated.View>
      <Container onPress={handleSubmit}>
        <View>
          <TitleEvent>{event.name}</TitleEvent>
          <DateEvent>{event.date}</DateEvent>
        </View>
        <ImageEvent source={{ uri: "https://picsum.photos/400/300" }} />
      </Container>
    </Animated.View>
  );
}
