import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DisplayRow from "../components/DisplayRow";
import { schema, InfoToSaveSchema } from "../schema";

export default function MySavesScreen({ navigation, route }) {
  const [profileInfo, setProfileInfo] = useState({});
  const [rows, setRows] = useState([]);

  const { saveKey } = route.params;

  const loadData = async () => {
    try {
      const loadSave = await AsyncStorage.getItem(saveKey);
      const profileInfo: InfoToSaveSchema = JSON.parse(loadSave);
      setProfileInfo(profileInfo);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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
