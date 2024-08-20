import Checkbox from "expo-checkbox";
import { Ticket } from "@/types/ticket";
import { useState } from "react";
import { Typography } from "../typography";
import { Container, View } from "./styles";
import { api } from "@/services/api";
import { useEvent } from "@/context/eventContext";

interface TicketProps {
  ticket: Ticket;
  checked: boolean;
}

export function TicketCard({ ticket, checked }: TicketProps) {
  const [isChecked, setChecked] = useState(checked);
  const hashCompacted = ticket.hash.slice(0, 8);
  const { selectedEvent } = useEvent();

  const eventUuid = selectedEvent?.uuid;

  const handleChangeCheckbox = async () => {
    try {
      await api.put(
        `check-ticket/events/${eventUuid}/tickets/${ticket.uuid}/verify/`,
        {
          hash: `${ticket.hash}`,
        }
      );
      setChecked(!isChecked);
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
          {" "}
          {ticket.user.first_name} {ticket.user.last_name}
        </Typography>
      </View>
      <Checkbox
        color={isChecked ? "#000000" : "#CB1EE8"}
        value={isChecked}
        onValueChange={handleChangeCheckbox}
      />
    </Container>
  );
}
