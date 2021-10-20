import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationProp } from "@react-navigation/native";

export default function Greeting({ navigation }) {
  const handleSignUp = () => console.log("sign up");
  const handleLogIn = () => navigation.navigate("Login", {});
  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>
      <Text>MyCard helps you easily share your contact &amp; social info, whether personal or professional.</Text>
      <Button onPress={handleSignUp} title="Click to Sign Up (Not Yet Functional)" />
      <Button onPress={handleLogIn} title="Click to Log In" />
    </View>
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
