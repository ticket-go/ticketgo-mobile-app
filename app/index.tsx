import { useState } from "react";
import { StyleSheet, TouchableOpacity, Alert, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { CustomButton } from "@/components/CustomButton";
import { CustomInput } from "@/components/CustomInput";
import { router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlePress = () => {
    Alert.alert("TicketGo", "Você clicou no link para recuperar a senha!");
  };
  const handleLoginSubmit = () => {
    router.push("home");
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="title" style={styles.titleLoginContainer}>
          TicketGO
        </ThemedText>

        <CustomInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="example@email.com"
        />

        <CustomInput
          label="Senha"
          value={password}
          onChangeText={setPassword}
          placeholder="password"
          secureTextEntry={true}
        />

        <CustomButton title="Entrar" onPress={handleLoginSubmit} />

        <TouchableOpacity onPress={handlePress} style={styles.link}>
          <ThemedText type="link">Esqueceu a senha?</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },

  titleLoginContainer: {
    marginBottom: 16,
  },

  link: {
    width: "80%",
    alignItems: "flex-end",
  },
});
