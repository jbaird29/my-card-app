import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { FontAwesome } from "@expo/vector-icons";

import EditInfoScreen from "../screens/EditInfoScreen";
import ScanQRCodeScreen from "../screens/ScanQRCodeScreen";
import ProfilesNav from "../navigation/ProfilesNav";
import SavesNav from "./SavesNav";

/**
 * Copied from: https://reactnavigation.org/docs/bottom-tab-navigator
 * Date: 10/20/2021
 */
const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator({ navigation, route }) {
  const initialScreen = route.params?.initialScreen || "Profiles";

  const [saveLoadCount, setSaveLoadCount] = useState(1); // used to force a refresh of loaded saves, after new QR code is scanned

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
        name="SavesNav"
        options={{
          title: "Saved Profiles",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="download" color={color} />,
        }}
      >
        {(props) => <SavesNav {...props} saveLoadCount={saveLoadCount} />}
      </BottomTab.Screen>
      <BottomTab.Screen
        name="ScanQRCode"
        options={{
          title: "Scan QR",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="qrcode" color={color} />,
        }}
      >
        {(props) => <ScanQRCodeScreen {...props} setSaveLoadCount={setSaveLoadCount} />}
      </BottomTab.Screen>
    </BottomTab.Navigator>
  );
}

/**
 * Icons: https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
