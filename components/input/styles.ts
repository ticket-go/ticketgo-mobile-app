import styled from "styled-components/native";

export const InputContainer = styled.TextInput<{
  themeColor: string;
  borderColor: string;
}>`
  width: 100%;
  padding: 16px;
  margin: 4px;
  border: 1px solid ${({ borderColor }) => borderColor};
  border-radius: 4px;
  color: ${({ themeColor }) => themeColor};
  background-color: ${({ themeColor }) =>
    themeColor === "#11181C" ? "#fff" : "#151718"};
`;
