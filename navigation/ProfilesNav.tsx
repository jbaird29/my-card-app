import React from "react";
import { StyleSheet, Text, View, Button, Image, SafeAreaView } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import MyProfileScreen from "../screens/MyProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";

const Tab = createMaterialTopTabNavigator();

export default function ProfilesNav({ navigation }) {
  return (
    <Tab.Navigator initialRouteName="ProfileStackProfessional">
      <Tab.Screen
        name="ProfileStackProfessional"
        options={{
          tabBarLabel: "Professional",
          tabBarLabelStyle: { textTransform: "none", fontSize: 16 },
        }}
        component={ProfileStack}
        initialParams={{ profileName: "Professional" }}
      />
      <Tab.Screen
        name="ProfileStackPersonal"
        options={{
          tabBarLabel: "Personal",
          tabBarLabelStyle: { textTransform: "none", fontSize: 16 },
        }}
        component={ProfileStack}
        initialParams={{ profileName: "Personal" }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function ProfileStack({ navigation, route }) {
  const { profileName } = route.params;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={{ headerShown: false }}
        initialParams={{ profileName }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ headerShown: false }}
        initialParams={{ profileName }}
      />
    </Stack.Navigator>
  );
}
