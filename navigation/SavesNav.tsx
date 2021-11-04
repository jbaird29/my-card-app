import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MySavesScreen from "../screens/MySavesScreen";
import DisplaySaveScreen from "../screens/DisplaySaveScreen";

const Stack = createNativeStackNavigator();

export default function SavesNav({ navigation, route }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MySaves" component={MySavesScreen} options={{ headerShown: false }} initialParams={{}} />
      <Stack.Screen
        name="DisplaySave"
        component={DisplaySaveScreen}
        options={{ title: "Saved Profile", headerShown: true }}
        initialParams={{}}
      />
    </Stack.Navigator>
  );
}
