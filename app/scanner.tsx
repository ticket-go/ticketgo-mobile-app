import { useEffect, useRef } from "react";
import { CameraView } from "expo-camera";
import { Link, Stack } from "expo-router";
import {
  Alert,
  AppState,
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Overlay } from "@/components/overlay";
import { Ionicons } from "@expo/vector-icons";

export default function Scanner() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    if (data && !qrLock.current) {
      qrLock.current = true;

      let hash = "";

      try {
        const url = new URL(data);
        hash = url.hash;
      } catch (error) {
        hash = data;
      }

      Alert.alert("Hash encontrado", hash || "Nenhum hash encontrado");

      // Fazer requisição para endpoint...

      // Desbloquear o scanner após um tempo
      setTimeout(() => {
        qrLock.current = false;
      }, 500);
    }
  };

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Link href="/(tabs)/home" style={styles.backButton}>
        <Ionicons name="chevron-back" size={28} color="#ffffff" />
      </Link>

      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={handleBarcodeScanned}
      />
      <Overlay />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 20,
    left: 15,
    zIndex: 1,
  },
});
