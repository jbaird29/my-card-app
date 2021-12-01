import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import DisplayRow from "../components/DisplayRow";
import { schema, InfoToSaveSchema } from "../schema";
import * as Contacts from "expo-contacts";

// Transforms profileInfo into a format necessary to save to phone
const formatContactForPhone = (profileInfo: InfoToSaveSchema): Contacts.Contact => {
  const contactForPhone: Contacts.Contact = {
    id: "1",
    name: `${profileInfo.firstName} ${profileInfo.lastName}`,
    contactType: Contacts.ContactTypes.Person,
    [Contacts.Fields.FirstName]: profileInfo.firstName,
    [Contacts.Fields.LastName]: profileInfo.lastName,
    [Contacts.Fields.JobTitle]: profileInfo.workRole,
    [Contacts.Fields.Company]: profileInfo.workCompany,
    [Contacts.EMAILS]: [],
    [Contacts.PHONE_NUMBERS]: [],
  };
  if (profileInfo.personalEmail) {
    contactForPhone[Contacts.EMAILS].push({
      email: profileInfo.personalEmail,
      isPrimary: true,
      label: "Personal",
      id: "1",
    });
  }
  if (profileInfo.workEmail) {
    contactForPhone[Contacts.EMAILS].push({
      email: profileInfo.workEmail,
      isPrimary: false,
      label: "Work",
      id: "2",
    });
  }
  if (profileInfo.personalPhone) {
    contactForPhone[Contacts.PHONE_NUMBERS].push({
      number: profileInfo.personalPhone,
      digits: profileInfo.personalPhone?.replaceAll(/[+-\s]/g, ""),
      label: "Personal",
      isPrimary: true,
      id: "1",
    });
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
