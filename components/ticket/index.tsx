import Checkbox from "expo-checkbox";
import { Ticket } from "@/types/ticket";
import { useState } from "react";
import { Typography } from "../typography";
import { Container, View } from "./styles";

interface TicketProps {
  ticket: Ticket;
  checked: boolean;
}

export function TicketCard({ ticket, checked }: TicketProps) {
  const [isChecked, setChecked] = useState(checked);

  return (
    <Container checked={isChecked}>
      <View>
        <Typography type="subtitle"> {ticket.uuid}</Typography>
        <Typography type="subtitle"> {ticket.user.first_name}</Typography>
      </View>
      <Checkbox
        color={isChecked ? "#000000" : "#CB1EE8"}
        value={isChecked}
        onValueChange={(newValue) => setChecked(newValue)}
      />
    </Container>
  );
}
