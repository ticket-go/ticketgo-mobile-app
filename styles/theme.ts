import styled from "styled-components/native";

const tintColorLight = "#C1FF5B";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};

export const Title = styled.Text`
  font-size: 32px;
  font-weight: 900;
  color: ${Colors.light.text};
`;

export const SpanTitle = styled.Text`
  font-size: 32px;
  font-weight: 900;
  color: ${Colors.light.tint};
`;
