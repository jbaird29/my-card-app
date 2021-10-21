import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationProp } from "@react-navigation/native";

export default function ViewProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>View Profiles!</Text>
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
