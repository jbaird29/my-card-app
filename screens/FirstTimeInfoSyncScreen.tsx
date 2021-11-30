import React, { useState, useEffect } from "react";
import { ActivityIndicator, Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import * as Contacts from "expo-contacts";
import levin from "../helper/levinTotal";

// Allows the user to enter their name, and automatically pull some contact info
export default function FirstTimeInfoSyncScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [contactMatches, setContactMatches] = useState([] as Contacts.Contact[]);

  // given first name and last name, searches for that user's Contact
  const searchForSelfContact = async (fName: string, lName: string) => {
    setContactMatches([]);
    setLoading(true);
    const response = await Contacts.getContactsAsync();
    const contacts = response.data;
    const matches = contacts.filter((c) => levin(c, fName, lName) < 3); // arbitrary low number, so demo doesn't show my contacts
    matches.sort((a, b) => levin(a, fName, lName) - levin(b, fName, lName));
    setContactMatches(matches);
    setLoading(false);
  };

  // given an Expo-content (for "myself"), navigates to the EditInfo screen which whill autofill that contact info
  const goToEditInfo = (contact: Contacts.Contact) =>
    navigation.navigate("Root", { screen: "EditInfo", initial: true, params: { contact: contact } });

  // given an Expo-Content, displays that contact's key info
  const displayMatch = (contact: Contacts.Contact) => {
    if (contact) {
      return (
        <View key={contact.id} style={styles.contactContainer}>
          <Text style={styles.contactText}>
            {contact.firstName} {contact.lastName} {contact.phoneNumbers ? contact.phoneNumbers[0].number : ""}
          </Text>
          <View style={styles.contactBtn}>
            <Button title="Next" onPress={() => goToEditInfo(contact)} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.contactContainer}>
          <Text style={styles.contactText}>Or manually enter your info</Text>
          <View style={styles.contactBtn}>
            <Button title="Next" onPress={() => goToEditInfo(null)} />
          </View>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>First time here?</Text>
      <Text style={styles.subtext}>Enter your name to get started.</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name</Text>
        <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} keyboardType={"default"} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Last Name</Text>
        <TextInput style={styles.input} value={lastName} onChangeText={setLastName} keyboardType={"default"} />
      </View>

      <View style={styles.button}>
        <Button color="white" title="Search" onPress={() => searchForSelfContact(firstName.trim(), lastName.trim())} />
      </View>

      {loading && <ActivityIndicator animating={loading} size="large" />}
      {contactMatches.length > 0 && (
        <>
          <Text style={{ fontSize: 18, paddingVertical: 10, textAlign: "center" }}>Are any of these you?</Text>
          <ScrollView style={{ width: "100%" }}>
            {contactMatches.map((contact) => displayMatch(contact))}
            {displayMatch(null)}
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 20,
    paddingHorizontal: 5,
    backgroundColor: "#fff",
  },
  header: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    color: "black",
    paddingVertical: 5,
  },
  subtext: {
    fontSize: 18,
    paddingVertical: 5,
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 16,
    flex: 1,
  },
  input: {
    height: 35,
    fontSize: 16,
    flex: 2,
    borderWidth: 1,
    paddingHorizontal: 5,
  },
  button: {
    width: "95%",
    backgroundColor: "#2196F3",
    alignSelf: "center",
    marginVertical: 20,
  },
  contactContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 5,
    marginHorizontal: 5,
  },
  contactText: {
    flex: 5,
    fontSize: 16,
  },
  contactBtn: {
    flex: 1,
  },
});
