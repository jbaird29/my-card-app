import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import MyProfileScreen from "../screens/MyProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";

const Tab = createMaterialTopTabNavigator();

export default function ProfilesNav({ navigation, qrReload, doQRReload }) {
  return (
    <Tab.Navigator initialRouteName="ProfileStackProfessional">
      <Tab.Screen
        name="ProfileStackProfessional"
        options={{
          tabBarLabel: "Professional",
          tabBarLabelStyle: { textTransform: "none", fontSize: 16 },
        }}
        initialParams={{ profileName: "Professional" }}
      >
        {(props) => <ProfileStack {...props} qrReload={qrReload} doQRReload={doQRReload} />}
      </Tab.Screen>
      <Tab.Screen
        name="ProfileStackPersonal"
        options={{
          tabBarLabel: "Personal",
          tabBarLabelStyle: { textTransform: "none", fontSize: 16 },
        }}
        initialParams={{ profileName: "Personal" }}
      >
        {(props) => <ProfileStack {...props} qrReload={qrReload} doQRReload={doQRReload} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function ProfileStack({ navigation, route, qrReload, doQRReload }) {
  const { profileName } = route.params;
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyProfile" options={{ headerShown: false }} initialParams={{ profileName }}>
        {(props) => <MyProfileScreen {...props} qrReload={qrReload} />}
      </Stack.Screen>
      <Stack.Screen name="EditProfile" options={{ headerShown: false }} initialParams={{ profileName }}>
        {(props) => <EditProfileScreen {...props} doQRReload={doQRReload} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
