import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import HomeScreen from "./app/(tabs)/home";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({});
      } catch (error) {
        console.warn(error);
      } finally {
        setAppIsReady(true);
      }
    };
  }, []);

  const onLayout = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaView>
      <View onLayout={onLayout} style={styles.container}>
        <StatusBar style="auto" />
        <HomeScreen />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
