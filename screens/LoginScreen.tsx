import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function Greeting() {
  return (
    <View style={styles.container}>
      <Text>Log In Here!</Text>
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
