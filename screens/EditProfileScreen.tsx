import React, { useState } from "react";
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
  Switch,
} from "react-native";
import IncludeInfoRow from "../components/IncludeInfoRow";
import { IncludeInfoRowProps, schema } from "../schema";

export default function EditProfileScreen({ navigation }) {
  const includeInfoFields: IncludeInfoRowProps[] = schema.map((field) => {
    const [isEnabled, setEnabled] = useState(false);
    return { ...field, isEnabled: isEnabled, setEnabled: setEnabled };
  });

  const handleSave = () => {
    console.log("saved"); // TODO - save this info to local storage
    navigation.navigate("MyProfile", {});
  };

  return (
    <SafeAreaView style={styles.container}>
      {includeInfoFields.map(({ key, isEnabled, setEnabled, label }) => (
        <IncludeInfoRow key={key} isEnabled={isEnabled} setEnabled={setEnabled} label={label} />
      ))}
      <Button title="Save Profile" onPress={() => handleSave()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
