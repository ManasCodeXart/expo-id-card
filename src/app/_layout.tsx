import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    SpaceGroteskSemiBold: require('../../assets/fonts/SpaceGrotesk-SemiBold.ttf'),
    SpaceGroteskMedium: require('../../assets/fonts/SpaceGrotesk-Medium.ttf'),
    SpaceGroteskBold: require('../../assets/fonts/SpaceGrotesk-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          animationDuration: 500,
          gestureEnabled: true,
        }}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
