import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MySavesScreen from "../screens/MySavesScreen";
import DisplaySaveScreen from "../screens/DisplaySaveScreen";

const Stack = createNativeStackNavigator();

export default function SavesNav({ navigation, route, saveLoadCount }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MySaves" options={{ headerShown: false }} initialParams={{}}>
        {(props) => <MySavesScreen {...props} saveLoadCount={saveLoadCount} />}
      </Stack.Screen>
      <Stack.Screen
        name="DisplaySave"
        component={DisplaySaveScreen}
        options={{ title: "Saved Profile", headerShown: true }}
        initialParams={{}}
      />
    </Stack.Navigator>
  );
}
