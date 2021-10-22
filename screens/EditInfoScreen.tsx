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
import { FormRowProps, Schema, schema } from "../schema";

// TODO: consider using this in the future: https://react-hook-form.com/get-started#ReactNative (already installed)
export default function EditInfoScreen({ navigation }) {
  const profileFields: FormRowProps[] = schema.map((field) => {
    const [value, setValue] = useState("");
    return { ...field, value: value, setValue: setValue };
  });

  const loadData = async () => {
    try {
      const loadSave = await AsyncStorage.getItem(`@MyInfo`);
      const myInfo: Schema = JSON.parse(loadSave);
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
    loadData();
  }, []);

  const handleSave = async () => {
    try {
      const toSaveArr = profileFields.map(({ key, value }) => [key, value]);
      const toSave = Object.fromEntries(toSaveArr) as Schema;
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
