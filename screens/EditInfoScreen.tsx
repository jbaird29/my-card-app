import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  StyleProp,
  ViewStyle,
  ScrollView,
  TextStyle,
} from "react-native";
import FormRow from "../components/FormRow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FormRowProps, InfoSchema, schema } from "../schema";
import FirstTimeInfoSyncScreen from "./FirstTimeInfoSyncScreen";
import * as Contacts from "expo-contacts";

// TODO: consider using this in the future: https://react-hook-form.com/get-started#ReactNative (already installed)
// TODO: change the schema to better match expo-contacts
export default function EditInfoScreen({ navigation, route }) {
  const profileFields: FormRowProps[] = schema.map((field) => {
    const [value, setValue] = useState("");
    return { ...field, value: value, setValue: setValue };
  });

  // if app redirected from FirstTimeInfoSync (user's first time in app), then load data form the phone contact
  const loadDataFromFirstTimeSync = (contact: Contacts.Contact) => {
    profileFields.filter((field) => field.key === "firstName")[0].setValue(contact.firstName);
    profileFields.filter((field) => field.key === "lastName")[0].setValue(contact.lastName);
    // TODO - fix the phone input in event user doesn't have phone number saved down
    profileFields.filter((field) => field.key === "personalPhone")[0].setValue(contact.phoneNumbers[0].number);
  };

  // otherwise load data from AsyncStorage
  const loadDataFromStorage = async () => {
    try {
      const loadSave: string = await AsyncStorage.getItem(`@MyInfo`);
      if (!loadSave) throw "No saved data";
      const myInfo: InfoSchema = JSON.parse(loadSave);
      profileFields.forEach(({ key, setValue }) => {
        const value = myInfo[key];
        if (value !== null) setValue(value);
      });
    } catch (e) {
      console.log(e);
    }
  };

  // Adapted from: https://www.codegrepper.com/code-examples/javascript/onload+in+react+js+using+functional+component
  // Date: 10/21/2021
  useEffect(() => {
    const contact: Contacts.Contact = route.params?.contact; // this contains the expo-contact for the user
    if (contact) loadDataFromFirstTimeSync(contact);
    else loadDataFromStorage();
  }, []);

  const handleSave = async () => {
    try {
      const toSaveArr = profileFields.map(({ key, value }) => [key, value]);
      const toSave = Object.fromEntries(toSaveArr) as InfoSchema;
      await AsyncStorage.setItem("@MyInfo", JSON.stringify(toSave));
      navigation.navigate("Profiles", {});
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {profileFields.map(({ key, value, setValue, label, keyboardType }) => (
          <FormRow key={key} value={value} setValue={setValue} label={label} keyboardType={keyboardType} />
        ))}
      </ScrollView>
      <Text style={styles.infoMessage}>Note: this information can always be edited later</Text>
      <View style={styles.button}>
        <Button color="white" title="Save Information" onPress={() => handleSave()} />
      </View>
    </SafeAreaView>
  );
}

const container: StyleProp<ViewStyle> = {
  backgroundColor: "#fff",
  flex: 1,
};

const button: StyleProp<ViewStyle> = {
  width: "90%",
  backgroundColor: "#2196F3",
  alignSelf: "center",
  marginBottom: 20,
};

const infoMessage: StyleProp<TextStyle> = {
  fontSize: 14,
  textAlign: "center",
  color: "black",
  paddingBottom: 10,
};

const styles = StyleSheet.create({
  container,
  button,
  infoMessage,
});
