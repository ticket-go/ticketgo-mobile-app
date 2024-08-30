import styled from "styled-components/native";
import { Typography } from "../typography";
import { useRouter } from "expo-router";
import { Event } from "@/types/event";
import { useEvent } from "@/context/eventContext";
import { tintColorLight } from "@/styles/theme";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const router = useRouter();
  const { setSelectedEvent } = useEvent();

  const handleSubmit = () => {
    setSelectedEvent(event);
    router.push(`/event/${event.uuid}`);
  };

  return (
    <Container onPress={handleSubmit}>
      <ImageEvent source={require("@/assets/images/event/banner-event.png")}>
        <OverlayImageCard />
        <Content>
          <TitleEvent>{event.name}</TitleEvent>
          <DateEvent>{event.date}</DateEvent>
        </Content>
      </ImageEvent>
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  width: 100%;
  height: 200px;
`;

const Content = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 10px;
`;

const OverlayImageCard = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
`;

const ImageEvent = styled.ImageBackground`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
`;

const TitleEvent = styled.Text`
  font-size: 24px;
  font-weight: 900;
  color: #fff;
`;

const DateEvent = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
`;
