import React from "react";
import { StyleSheet, Text, View, Switch } from "react-native";
import { IncludeInfoRowProps } from "../schema";

export default function FormRow({ label, isEnabled, setEnabled }: IncludeInfoRowProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.switch}>
        <Switch
          trackColor={{ false: "#cccccc", true: "#b6d7a8" }}
          thumbColor={isEnabled ? "#38761d" : "#f4f3f4"}
          ios_backgroundColor="#cccccc"
          onValueChange={() => setEnabled((prev) => !prev)}
          value={isEnabled}
        />
      </View>
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
    flex: 5,
    fontSize: 18,
    // fontWeight: "bold",
  },
  switch: {
    flex: 1,
  },
});
