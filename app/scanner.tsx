import { useEffect, useRef } from "react";
import { CameraView } from "expo-camera";
import { Link, Stack, useRouter } from "expo-router";
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
import { useEvent } from "@/context/eventContext";
import { api } from "@/services/api";
import { useAuth } from "@/context/authContext";

export default function Scanner() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const { selectedEvent, updateTicketsVerified } = useEvent();
  const { accessToken } = useAuth();
  const id = selectedEvent?.uuid;
  const router = useRouter();

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

  const handleBarcodeScanned = async ({ data }: { data: string }) => {
    if (data && !qrLock.current) {
      qrLock.current = true;

      let hash = "";

      try {
        const url = new URL(data);
        hash = url.hash;
      } catch (error) {
        hash = data;
      }

      // Alert.alert("Hash encontrado", hash || "Nenhum hash encontrado");

      // Fazer requisição para endpoint...
      try {
        const response = await api.put(
          `check-ticket/events/${id}/`,
          {
            hash: `${hash}`,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const newVerifiedCount = selectedEvent?.tickets_verified ?? 0;
        updateTicketsVerified(newVerifiedCount + 1);

        // testar pra ver se quando fecha o Alert redireciona... 
        Alert.alert(
          "Sucesso!", 
          response.data.message,
          [
            {
              text: "OK",
              onPress: () => {
                router.push(`/event/${id}`);
                qrLock.current = false;
              },
            },
          ]
        );

        return response;
      } catch (error) {
        console.error("Erro na requisição:", error);
      }

      // // Desbloquear o scanner após um tempo
      // setTimeout(() => {
      //   qrLock.current = false;
      // }, 500);
    }
  };

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      {id && (
        <Link
          href={{ pathname: "/event/[id]", params: { id } }}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={28} color="#ffffff" />
        </Link>
      )}

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
