import React from "react";
import { StyleSheet, Text, View, Switch } from "react-native";
import { IncludeInfoRowProps } from "../schema";

export default function FormRow({ label, isEnabled, setEnabled }: IncludeInfoRowProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => setEnabled((prev) => !prev)}
        value={isEnabled}
      />
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
