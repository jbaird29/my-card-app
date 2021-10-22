import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";

export default function MyProfileScreen({ navigation, route }) {
  const profileName = route.params.profileName;

  const handleEditPress = () => navigation.navigate("EditProfile", { profileName: profileName });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{profileName} Profile</Text>
      <Image resizeMode="contain" source={require("../assets/fake-qr.jpg")} style={{ width: "75%" }} />
      <Text style={{ fontSize: 15, textAlign: "center", paddingBottom: 5 }}>
        Edit this profile to change the fields shared
      </Text>
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
