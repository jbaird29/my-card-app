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

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(true);

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
    <BottomTab.Navigator initialRouteName="MyProfile">
      <BottomTab.Screen
        name="Profiles"
        component={ProfilesNav}
        options={({ navigation }) => ({
          title: "My Profiles",
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome name="circle" size={25} style={{ marginRight: 15 }} />,
        })}
      />
      <BottomTab.Screen
        name="EditInfo"
        component={EditInfoScreen}
        options={{
          title: "Edit Info",
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome name="circle" size={25} style={{ marginRight: 15 }} />,
        }}
      />
      <BottomTab.Screen
        name="ScanQRCode"
        component={ScanQRCodeScreen}
        options={{
          title: "Scan QR",
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome name="circle" size={25} style={{ marginRight: 15 }} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});
