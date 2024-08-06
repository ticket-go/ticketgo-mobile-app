import { Image, StyleSheet, TouchableOpacity, Alert, View } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { useState } from "react";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlePress = () => {
    Alert.alert("TicketGo", "Você clicou no link para recuperar a senha!");
  };
  const handleLoginSubmit = () => {
    Alert.alert("Login Info", `Email: ${email}\nPassword: ${password}`);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">TicketGo</ThemedText>
        <ThemedText type="title">Login</ThemedText>

        <CustomInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu email"
        />
        <CustomInput
          label="Senha"
          value={password}
          onChangeText={setPassword}
          placeholder="Digite sua senha"
          secureTextEntry={true}
        />

        <View style={styles.linkContainer}>
          <View style={styles.link}>
            <TouchableOpacity onPress={handlePress}>
              <ThemedText type="link">Esqueceu a senha?</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <CustomButton title="Login" onPress={handleLoginSubmit} />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 8,
  },
  linkContainer: {
    width: "100%",
    alignItems: "flex-end",
  },
  link: {
    padding: 10,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
