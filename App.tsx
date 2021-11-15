import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import * as Contacts from "expo-contacts";

import BottomTabNavigator from "./navigation/BottomTab";
import { SafeAreaView } from "react-native-safe-area-context";
import GreetingScreen from "./screens/GreetingScreen";
import FirstTimeInfoSyncScreen from "./screens/FirstTimeInfoSyncScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);

  // request permission to integrate with the phone's Contacts
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") setHasPermission(true);
      else setHasPermission(false);
    })();
  }, []);

  // if permission hasn't been set yet, display empty screen
  if (hasPermission === null) {
    return <SafeAreaView></SafeAreaView>;
  }

  // if permission is denied, print message asking the user to allow permission
  if (hasPermission === false) {
    return (
      <SafeAreaView style={{ flex: 1, margin: 10 }}>
        <Text style={{ textAlign: "center" }}>
          In order to use this app, please allow permission to integrate with your contacts. Note that your information
          is only stored locally on your device; it is never shared with us.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Navigator>
          <Stack.Screen name="Greeting" component={GreetingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="FirstTimeInfo" component={FirstTimeInfoSyncScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
