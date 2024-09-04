import React from "react";
import { TouchableOpacity } from "react-native";
import { Typography } from "../typography";
import { styles } from "./styles";

interface ButtonProps {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
}

export function Button({
  title,
  onPress,
  backgroundColor = "#CB1EE8",
  textColor = "#000",
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={onPress}
    >
      <Typography style={[styles.buttonText, { color: textColor }]}>
        {title}
      </Typography>
    </TouchableOpacity>
  );
}
