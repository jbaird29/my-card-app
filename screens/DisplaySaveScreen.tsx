import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DisplayRow from "../components/DisplayRow";
import { schema, InfoToSaveSchema } from "../schema";

// Displays a previously scanned QR / saved profile
export default function DisplaySaveScreen({ navigation, route }) {
  const [profileInfo, setProfileInfo] = useState({});
  const [rows, setRows] = useState([]);

  const { saveKey } = route.params;

  // Given a saveKey, load that saved data
  const loadData = async (saveKey: string) => {
    try {
      const loadSave = await AsyncStorage.getItem(saveKey);
      const profileInfo: InfoToSaveSchema = JSON.parse(loadSave);
      setProfileInfo(profileInfo);
    } catch (e) {
      console.log(e);
    }
  };

  // loads the data on component mount
  useEffect(() => {
    loadData(saveKey);
  }, []);

  // after loaded the profile data, format the data to be displayed on the page
  useEffect(() => {
    const rowsRaw = schema.filter((row) => typeof profileInfo[row.key] !== "undefined");
    const rows = rowsRaw.map((row) => ({ key: row.key, label: row.label, value: profileInfo[row.key] }));
    setRows(rows);
  }, [profileInfo]);

  return (
    <View style={styles.container}>
      {rows.map(({ key, label, value }) => (
        <DisplayRow key={key} label={label} value={value} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
