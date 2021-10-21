import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { FontAwesome } from "@expo/vector-icons";

import LoginScreen from "./screens/LoginScreen";
import GreetingScreen from "./screens/GreetingScreen";
import ViewProfileScreen from "./screens/ViewProfilesScreen";
import EditProfileScreen from "./screens/EditProfilesScreen";
import ScanQRCodeScreen from "./screens/ScanQRCodeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}

/**
 * Copied from: https://reactnavigation.org/docs/bottom-tab-navigator
 * Date: 10/20/2021
 */
const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="ViewProfile">
      <BottomTab.Screen
        name="ViewProfile"
        component={ViewProfileScreen}
        options={({ navigation }) => ({
          title: "View Profiles",
          tabBarIcon: ({ color }) => <FontAwesome name="circle" size={25} style={{ marginRight: 15 }} />,
        })}
      />
      <BottomTab.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: "Edit Profiles",
          tabBarIcon: ({ color }) => <FontAwesome name="circle" size={25} style={{ marginRight: 15 }} />,
        }}
      />
      <BottomTab.Screen
        name="ScanQRCode"
        component={ScanQRCodeScreen}
        options={{
          title: "Scan QR",
          tabBarIcon: ({ color }) => <FontAwesome name="circle" size={25} style={{ marginRight: 15 }} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
