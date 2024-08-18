import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  width: 80%;
  height: 200px;
`;

export const View = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const ImageEvent = styled.ImageBackground`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
`;

export const TitleEvent = styled.Text`
  font-size: 24px;
  font-weight: 900;
  color: #11181c;
`;

export const DateEvent = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #687076;
`;
