import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TextInput,
  StyleProp,
  ViewStyle,
  KeyboardTypeOptions,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import FormRow from "../components/FormRow";
import data from "../savedData.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FormRowProps, schema } from "../schema";

// TODO: consider using this in the future: https://react-hook-form.com/get-started#ReactNative (already installed)
export default function EditInfoScreen({ navigation }) {
  const profileFields: FormRowProps[] = schema.map((field) => {
    const [value, setValue] = useState("");
    return { ...field, value: value, setValue: setValue };
  });

  const loadData = async () => {
    try {
      // TODO: consider refactoring to multiGet(): https://react-native-async-storage.github.io/async-storage/docs/api#multiget
      profileFields.forEach(async ({ key, setValue }) => {
        const value = await AsyncStorage.getItem(`@${key}`);
        if (value !== null) setValue(value);
      });
    } catch (e) {
      console.log(e);
    }
  };

  // Adapted from: https://www.codegrepper.com/code-examples/javascript/onload+in+react+js+using+functional+component
  // Date: 10/21/2021
  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async () => {
    try {
      profileFields.forEach(async ({ key, value }) => {
        await AsyncStorage.setItem(`@${key}`, value);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {profileFields.map(({ key, value, setValue, label, keyboardType }) => (
        <FormRow key={key} value={value} setValue={setValue} label={label} keyboardType={keyboardType} />
      ))}
      <Button title="Save Information" onPress={() => handleSave()} />
    </SafeAreaView>
  );
}

const container: StyleProp<ViewStyle> = {
  backgroundColor: "#fff",
  flex: 1,
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  alignContent: "flex-start",
  flexWrap: "nowrap",
};

const styles = StyleSheet.create({
  container,
});
