import styled from "styled-components/native";
import { Typography } from "../typography";
import { Ionicons } from "@expo/vector-icons";
import { tintColorLight } from "@/styles/theme";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onPress: () => void;
}

export function Accordion({
  title,
  children,
  isOpen,
  onPress,
}: AccordionProps) {
  const icon = isOpen ? "chevron-up" : "chevron-down";

  return (
    <AccordionContainer>
      <AccordionHeader onPress={onPress}>
        <AccordionTitle>{title}</AccordionTitle>
        <Ionicons name={icon} size={24} color={`${tintColorLight}`} />
      </AccordionHeader>
      {isOpen && <AccordionContent>{children}</AccordionContent>}
    </AccordionContainer>
  );
}

const AccordionContainer = styled.View`
  width: 100%;
  margin-bottom: 16px;
`;

const AccordionHeader = styled.TouchableOpacity`
  width: 70%;
  padding: 16px;
  border-radius: 8px;
  border-color: "black";
  border-width: 1px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const AccordionTitle = styled(Typography)`
  font-size: 16px;
  font-weight: bold;
`;

const AccordionContent = styled.View`
  padding: 16px;
  background-color: #e0e0e0;
  border-radius: 8px;
  margin-top: 8px;
  gap: 4px;
`;
