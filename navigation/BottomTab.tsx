import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { FontAwesome } from "@expo/vector-icons";

import EditInfoScreen from "../screens/EditInfoScreen";
import ScanQRCodeScreen from "../screens/ScanQRCodeScreen";
import ProfilesNav from "../navigation/ProfilesNav";

/**
 * Copied from: https://reactnavigation.org/docs/bottom-tab-navigator
 * Date: 10/20/2021
 */
const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="MyProfile">
      <BottomTab.Screen
        name="Profiles"
        component={ProfilesNav}
        options={({ navigation }) => ({
          title: "My Profiles",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="user-circle" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="EditInfo"
        component={EditInfoScreen}
        options={{
          title: "Edit Info",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="address-card" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="ScanQRCode"
        component={ScanQRCodeScreen}
        options={{
          title: "Scan QR",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="qrcode" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * Icons: https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
