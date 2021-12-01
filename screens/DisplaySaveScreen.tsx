import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import DisplayRow from "../components/DisplayRow";
import { schema, InfoToSaveSchema } from "../schema";
import * as Contacts from "expo-contacts";

// Given a contact and a new email to add, adds that email in the proper format
const addEmailToContact = (contactForPhone: Contacts.Contact, newEmail: string, newLabel: string) => {
  contactForPhone[Contacts.EMAILS].push({
    email: newEmail,
    label: newLabel,
    id: `${Math.random() * 1000000}`,
  });
};

// Given a contact and a new phone number to add, adds that number in the proper format
const addPhoneToContact = (contactForPhone: Contacts.Contact, newPhone: string, newLabel: string) => {
  contactForPhone[Contacts.PHONE_NUMBERS].push({
    number: newPhone,
    digits: newPhone.replaceAll(/[+-\s]/g, ""),
    label: newLabel,
    id: `${Math.random() * 1000000}`,
  });
};

// Transforms profileInfo into a format necessary to save to phone
const formatContactForPhone = (info: InfoToSaveSchema): Contacts.Contact => {
  const contactForPhone: Contacts.Contact = {
    id: "1", // the id is ignored, just need a unique string
    name: `${info.firstName} ${info.lastName}`,
    contactType: Contacts.ContactTypes.Person,
    [Contacts.Fields.FirstName]: info.firstName,
    [Contacts.Fields.LastName]: info.lastName,
    [Contacts.Fields.JobTitle]: info.workRole,
    [Contacts.Fields.Company]: info.workCompany,
    [Contacts.EMAILS]: [],
    [Contacts.PHONE_NUMBERS]: [],
  };
  if (info.personalEmail) {
    addEmailToContact(contactForPhone, info.personalEmail, "Personal");
  }
  if (info.workEmail) {
    addEmailToContact(contactForPhone, info.workEmail, "Work");
  }
  if (info.personalPhone) {
    addPhoneToContact(contactForPhone, info.personalPhone, "Personal");
  }
  return contactForPhone;
};

// Displays a previously scanned QR / saved profile
export default function DisplaySaveScreen({ navigation, route }) {
  const [profileInfo, setProfileInfo] = useState<InfoToSaveSchema>();
  const [rows, setRows] = useState([]);

  const { saveKey } = route.params;

  // Given a saveKey, load that saved data
  const loadData = async (saveKey: string) => {
    try {
      const loadSave = await AsyncStorage.getItem(saveKey);
      const profileInfo: InfoToSaveSchema = JSON.parse(loadSave);
      setProfileInfo(profileInfo);
    } catch (e) {
      console.log(e);
    }
  };

  // loads the data on component mount
  useEffect(() => {
    loadData(saveKey);
  }, []);

  // after loaded the profile data, format the data to be displayed on the page
  useEffect(() => {
    const rowsRaw = schema.filter((row) => profileInfo && typeof profileInfo[row.key] !== "undefined");
    const rows = rowsRaw.map((row) => ({ key: row.key, label: row.label, value: profileInfo[row.key] }));
    setRows(rows);
  }, [profileInfo]);

  // Given a contact, saves contact to phone
  const saveToPhone = async (profileInfo: InfoToSaveSchema) => {
    const contactForPhone = formatContactForPhone(profileInfo);
    try {
      const contactId = await Contacts.addContactAsync(contactForPhone);
      if (!contactId) throw "Error saving contact.";
      alert("Save successful!");
    } catch (e) {
      console.log(e);
      alert("There was an error!");
    }
  };

  return (
    <View style={styles.container}>
      {rows.map(({ key, label, value }) => (
        <DisplayRow key={key} label={label} value={value} />
      ))}
      <View style={styles.button}>
        <Button color="white" title="Save to Phone" onPress={() => saveToPhone(profileInfo)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  button: {
    width: "90%",
    backgroundColor: "#2196F3",
    alignSelf: "center",
    marginBottom: 20,
  },
});
