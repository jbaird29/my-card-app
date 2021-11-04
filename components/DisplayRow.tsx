import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function DisplayRow({ label, value }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    width: "100%",
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
  },
  value: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
