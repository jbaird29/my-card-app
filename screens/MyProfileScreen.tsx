import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { NavigationProp } from "@react-navigation/native";

export default function MyProfileScreen({ navigation, route }) {
  const { profileName } = route.params; // TODO - make this screen dynamic for different profiles

  const handleEditPress = () => navigation.navigate("EditProfile", { profileName: "Professional" });
  const handleSharePress = () => {};

  return (
    <View style={styles.container}>
      <Text>Professional Profile</Text>
      <Image resizeMode="contain" source={require("../assets/fake-qr.jpg")} style={{ width: "75%" }} />
      <Button title="Edit this Profie" onPress={handleEditPress} />
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
