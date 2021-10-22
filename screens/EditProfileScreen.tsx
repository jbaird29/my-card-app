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
import { IncludeInfoRowProps, schema } from "../schema";

export default function EditProfileScreen({ navigation, route }) {
  const { profileName } = route.params;

  const includeInfoFields: IncludeInfoRowProps[] = schema.map((field) => {
    const [isEnabled, setEnabled] = useState(false);
    return { ...field, isEnabled: isEnabled, setEnabled: setEnabled };
  });

  const handleSave = async () => {
    try {
      includeInfoFields.forEach(async ({ key, isEnabled }) => {
        await AsyncStorage.setItem(`@${profileName}-${key}-toInclude`, isEnabled.toString());
      });
      navigation.navigate("MyProfile", { profileName: profileName });
    } catch (e) {
      console.log(e);
    }
  };

  const loadData = async () => {
    try {
      // TODO: consider refactoring to multiGet(): https://react-native-async-storage.github.io/async-storage/docs/api#multiget
      includeInfoFields.forEach(async ({ key, setEnabled }) => {
        const isEnabled = await AsyncStorage.getItem(`@${profileName}-${key}-toInclude`);
        console.log(key, isEnabled);
        setEnabled(isEnabled === "true" ? true : false); // must convert string to boolean
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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
