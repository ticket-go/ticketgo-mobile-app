import Checkbox from "expo-checkbox";
import { Ticket } from "@/types/ticket";
import { useState } from "react";
import { Typography } from "../typography";
import { Container, View } from "./styles";
import { api } from "@/services/api";
import { useEvent } from "@/context/eventContext";
import { Alert } from "react-native";

interface TicketProps {
  ticket: Ticket;
  checked: boolean;
}

export function TicketCard({ ticket, checked }: TicketProps) {
  const [isChecked, setChecked] = useState(checked);
  const hashCompacted = ticket.hash.slice(0, 8);
  const { selectedEvent, updateTicketsVerified } = useEvent();

  const eventUuid = selectedEvent?.uuid;

  const handleChangeCheckbox = async () => {
    try {
      const response = await api.put(
        `check-ticket/events/${eventUuid}/tickets/${ticket.uuid}/verify/`,
        {
          hash: `${ticket.hash}`,
        }
      );
      const newCheckedStatus = !isChecked;
      setChecked(newCheckedStatus);
      const newVerifiedCount = selectedEvent?.tickets_verified ?? 0;

      updateTicketsVerified(
        newCheckedStatus ? newVerifiedCount + 1 : newVerifiedCount - 1
      );
      Alert.alert(response.data.message);
      return response;
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };
  return (
    <Container checked={isChecked}>
      <View>
        <Typography
          type="default"
          style={{ color: isChecked ? "#ffffff" : "#CB1EE8" }}
        >
          {" "}
          {hashCompacted}
        </Typography>
        <Typography
          type="subtitle"
          style={{ color: isChecked ? "#ffffff" : "#CB1EE8" }}
        >
          {ticket.user.first_name} {ticket.user.last_name}
        </Typography>
      </View>
      <Checkbox
        color={isChecked ? "#000000" : "#CB1EE8"}
        value={isChecked}
        onValueChange={handleChangeCheckbox}
        disabled={isChecked ? true : false}
      />
    </Container>
  );
}
