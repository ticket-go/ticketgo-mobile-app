import { StyleSheet } from "react-native";
import styled from "styled-components/native";

interface ContainerProps {
  checked: boolean;
}
export const Container = styled.View<ContainerProps>`
  width: 350px;
  height: 65px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px;
  border-radius: 5px;
  border-color: ${(props) => (props.checked ? "#FFFFFF" : "#CB1EE8")};
  background-color: ${(props) => (props.checked ? "#CB1EE8" : "#FFFFFF")};
  padding: 10px;
`;

export const View = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;
