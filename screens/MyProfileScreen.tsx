import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { NavigationProp } from "@react-navigation/native";

export default function MyProfileScreen({ navigation, route }) {
  const profileName = route.params?.profileName || "Professional";

  const handleEditPress = () => navigation.navigate("EditProfile", { profileName: "Professional" });
  const handleSharePress = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{profileName} Profile</Text>
      <Image resizeMode="contain" source={require("../assets/fake-qr.jpg")} style={{ width: "75%" }} />
      <View style={styles.button}>
        <Button color="white" title="Edit this Profie" onPress={handleEditPress} />
      </View>
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
  header: {
    fontSize: 30,
    fontWeight: "700",
    color: "#2196F3",
  },
  button: {
    width: "90%",
    backgroundColor: "#2196F3",
  },
});
