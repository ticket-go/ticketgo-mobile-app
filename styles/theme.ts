import { tintColorLight } from "./colors";
import styled from "styled-components/native";

export const Title = styled.Text<{ color: string }>`
  font-size: 32px;
  font-weight: 900;
  color: ${({ color }: { color: string }) => color};
`;

export const SpanTitle = styled.Text`
  font-size: 32px;
  font-weight: 900;
  color: ${tintColorLight};
`;
