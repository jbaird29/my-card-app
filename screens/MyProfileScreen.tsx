import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { NavigationProp } from "@react-navigation/native";

export default function MyProfileScreen({ navigation }) {
  const handleEditPress = () => navigation.navigate("EditProfile", {});
  const handleSharePress = () => {};

  return (
    <View style={styles.container}>
      <Image resizeMode="contain" source={require("../assets/fake-qr.jpg")} style={{ width: "75%" }} />
      <Button title="Edit this Profie" onPress={handleEditPress} />
      <Button title="Share as Link (Not yet Functional)" onPress={handleSharePress} />
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
