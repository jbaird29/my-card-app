import React from "react";
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

export default function BottomTabNavigator({ navigation, route }) {
  const initialScreen = route.params?.initialScreen || "Profiles";

  return (
    <BottomTab.Navigator initialRouteName={initialScreen}>
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
