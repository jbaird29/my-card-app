import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function GreetingScreen({ navigation }) {
  const goToEditInfo = () => navigation.navigate("Root", { initialScreen: "EditInfo" });
  const goToMyProfile = () => navigation.navigate("Root", { initialScreen: "Profiles" });
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to MyCard!</Text>
      <Text style={styles.subtext}>
        MyCard helps you easily <Text style={{ fontWeight: "bold" }}>share and receive </Text>contact information.
        Rather than typing a new contact's name and phone number, simply{" "}
        <Text style={{ fontWeight: "bold" }}>scan a QR!</Text>
      </Text>
      <Text style={styles.text}>First time here? Add your profile information.</Text>
      <View style={styles.button}>
        <Button color="white" title="Enter your Information" onPress={goToEditInfo} />
      </View>
      <Text style={styles.text}>Returning User? Go to the Home Screen.</Text>
      <View style={styles.button}>
        <Button color="white" title="Go to Home Screen" onPress={goToMyProfile} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  header: {
    fontSize: 32,
    fontWeight: "700",
    color: "black",
    paddingVertical: 50,
  },
  subtext: {
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 40,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    paddingTop: 40,
    paddingBottom: 10,
  },
  button: {
    width: "90%",
    backgroundColor: "#2196F3",
  },
});
