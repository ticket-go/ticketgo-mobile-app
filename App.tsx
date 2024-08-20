import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Animated, SafeAreaView, StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import HomeScreen from "./app/(tabs)/home";
import Constants from "expo-constants";

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

// function AnimatedSplashScreen({ children }: { children: React.ReactNode }) {
//   const animation = useMemo(() => new Animated.Value(1), []);
//   const [isAppReady, setAppReady] = useState(false);
//   const [isSplashVideoComplete, setSplashVideoComplete] = useState(false);
//   const [isSplashAnimationComplete, setAnimationComplete] = useState(false);
//
//   useEffect(() => {
//     if (isAppReady && isSplashVideoComplete) {
//       Animated.timing(animation, {
//         toValue: 0,
//         duration: 200,
//         useNativeDriver: true,
//       }).start(() => setAnimationComplete(true));
//     }
//   }, [isAppReady, isSplashVideoComplete]);
//
//   const onImageLoaded = useCallback(async () => {
//     try {
//       await SplashScreen.hideAsync();
//       await Promise.all([]);
//     } catch (e) {
//       console.warn(e);
//     } finally {
//       setAppReady(true);
//     }
//   }, []);
//
//   const videoElement = useMemo(() => {
//     return (
//       <SplashVideo
//         onLoaded={onImageLoaded}
//         onFinish={() => {
//           setSplashVideoComplete(true);
//         }}
//       />
//     );
//   }, [onImageLoaded, setSplashVideoComplete]);
//   return (
//     <View style={{ flex: 1 }}>
//       {isAppReady && children}
//       {!isSplashAnimationComplete && (
//         <Animated.View
//           pointerEvents="none"
//           style={[
//             StyleSheet.absoluteFill,
//             {
//               backgroundColor: Constants.manifest.splash.backgroundColor,
//               opacity: animation,
//             },
//           ]}
//         >
//           {videoElement}
//         </Animated.View>
//       )}
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
