import { ViewProps } from "react-native";
import styled from "styled-components/native";
import { useThemeColor } from "@/hooks/useThemeColor";

interface ContainerProps extends ViewProps {
  lightColor?: string;
  darkColor?: string;
}

const StyledContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export function Container({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ContainerProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <StyledContainer style={[{ backgroundColor }, style]} {...otherProps} />
  );
}
