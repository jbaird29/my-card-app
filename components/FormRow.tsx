import React from "react";
import { StyleSheet, Text, View, TextInput, KeyboardTypeOptions } from "react-native";
import { FormRowProps } from "../screens/EditProfilesScreen";

export default function FormRow({ label, value, setValue, keyboardType }: FormRowProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} value={value} onChangeText={setValue} keyboardType={keyboardType} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  label: {
    flex: 2,
    borderColor: "black",
    borderWidth: 1,
    fontWeight: "bold",
  },
  input: {
    flex: 3,
    borderColor: "black",
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    textAlign: "center",
  },
});
