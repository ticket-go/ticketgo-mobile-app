import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import HomeScreen from "./app/(tabs)/home";

SplashScreen.preventAutoHideAsync()
  .then((result) => {
    if (result) {
      console.log("SplashScreen.preventAutoHideAsync() succeeded");
    } else {
      console.log("SplashScreen.preventAutoHideAsync() failed");
    }
  })
  .catch((error) => {
    console.error(error);
  });

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
