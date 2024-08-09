import { InputContainer } from "./styles";
import { useThemeColor } from "@/hooks/useThemeColor";

interface InputProps {
  value: string;
  placeholder: string;
  secureTextEntry?: boolean;
  onChangeText: (text: string) => void;
}

export function Input({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
}: InputProps) {
  const placeholderColor = useThemeColor({}, "text");

  return (
    <InputContainer
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      placeholderTextColor={placeholderColor}
    />
  );
}
