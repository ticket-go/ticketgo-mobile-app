import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";

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
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
