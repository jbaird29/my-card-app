import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function Greeting({ navigation, setLoggedIn }) {
  const handleLogIn = () => setLoggedIn(true);
  return (
    <View style={styles.container}>
      <Text>Log In Here!</Text>
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
