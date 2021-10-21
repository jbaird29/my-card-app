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

export interface FormRow {
  key: string;
  label: string;
  keyboardType: KeyboardTypeOptions;
}

export interface FormRowProps extends FormRow {
  value: any; // from useState hook
  setValue: React.Dispatch<React.SetStateAction<string>>; // from useState hook
}

// TODO: consider using this in the future: https://react-hook-form.com/get-started#ReactNative (already installed)
export default function EditProfileScreen({ navigation }) {
  const schema: FormRow[] = [
    {
      key: "firstName",
      label: "First Name:",
      keyboardType: "default",
    },
    {
      key: "lastName",
      label: "Last Name:",
      keyboardType: "default",
    },
    {
      key: "personalEmail",
      label: "Personal Email:",
      keyboardType: "email-address",
    },
    {
      key: "personalPhone",
      label: "Personal Phone:",
      keyboardType: "phone-pad",
    },
    {
      key: "workEmail",
      label: "Work Email:",
      keyboardType: "email-address",
    },
  ];

  const profileFields: FormRowProps[] = schema.map((field) => {
    const [value, setValue] = useState("");
    return { ...field, value: value, setValue: setValue };
  });

  const loadData = async () => {
    try {
      profileFields.forEach(async ({ key, setValue }) => {
        const value = await AsyncStorage.getItem(`@${key}`);
        if (value !== null) setValue(value);
      });
    } catch (e) {
      console.log(e);
    }
  };

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
      <Button title="Save Profile" onPress={() => handleSave()} />
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
