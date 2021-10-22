import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { FormRowProps } from "../schema";

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
    fontSize: 15,
    fontWeight: "bold",
  },
  input: {
    flex: 3,
    fontSize: 15,
    borderColor: "#666666",
    backgroundColor: "#efefef",
    borderWidth: 1,
    textAlign: "center",
  },
});
