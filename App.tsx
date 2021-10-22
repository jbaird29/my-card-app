import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import BottomTabNavigator from "./navigation/BottomTab";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import GreetingScreen from "./screens/GreetingScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Navigator>
          <Stack.Screen name="Greeting" component={GreetingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
