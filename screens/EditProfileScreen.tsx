import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
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
import { IncludeInfoRowProps, Schema, schema } from "../schema";

export default function EditProfileScreen({ navigation, route }) {
  const { profileName } = route.params;

  const includeInfoFields: IncludeInfoRowProps[] = schema.map((field) => {
    const [isEnabled, setEnabled] = useState(false);
    return { ...field, isEnabled: isEnabled, setEnabled: setEnabled };
  });

  const loadData = async () => {
    try {
      const loadSave = await AsyncStorage.getItem(`@Profile-${profileName}`);
      const profileInfo: Schema = JSON.parse(loadSave);
      includeInfoFields.forEach(({ key, setEnabled }) => {
        const isEnabled = profileInfo[key];
        setEnabled(isEnabled);
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
      const toSaveArr = includeInfoFields.map(({ key, isEnabled }) => [key, isEnabled]);
      const toSave = Object.fromEntries(toSaveArr) as Schema;
      await AsyncStorage.setItem(`@Profile-${profileName}`, JSON.stringify(toSave));
      navigation.navigate("MyProfile", { profileName: profileName });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>{profileName} Profile</Text>
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
