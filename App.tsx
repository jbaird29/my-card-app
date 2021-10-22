import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { FontAwesome } from "@expo/vector-icons";

import LoginScreen from "./screens/LoginScreen";
import GreetingScreen from "./screens/GreetingScreen";
import MyProfileScreen from "./screens/MyProfileScreen";
import EditInfoScreen from "./screens/EditInfoScreen";
import ScanQRCodeScreen from "./screens/ScanQRCodeScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import ProfilesNav from "./navigation/ProfilesNav";

import BottomTabNavigator from "./navigation/BottomTab";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(true);

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        {!isLoggedIn ? (
          <Stack.Navigator>
            <Stack.Screen name="Greeting" component={GreetingScreen} options={{ title: "Welcome" }} />
            <Stack.Screen name="Login">{(props) => <LoginScreen {...props} setLoggedIn={setLoggedIn} />}</Stack.Screen>
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
          </Stack.Navigator>
        )}
      </SafeAreaView>
    </NavigationContainer>
  );
}
