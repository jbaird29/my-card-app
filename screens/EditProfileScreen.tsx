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
  ScrollView,
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Text style={styles.header}>{profileName} Profile</Text>
      <View style={styles.container}>
        <ScrollView>
          {includeInfoFields.map(({ key, isEnabled, setEnabled, label }) => (
            <IncludeInfoRow key={key} isEnabled={isEnabled} setEnabled={setEnabled} label={label} />
          ))}
        </ScrollView>
      </View>
      <Text style={{ fontSize: 15, textAlign: "center", paddingBottom: 5 }}>
        Only checked fields will be shared via this QR code
      </Text>
      <View style={styles.button}>
        <Button color="white" title="Save Profile" onPress={() => handleSave()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  header: {
    fontSize: 30,
    fontWeight: "700",
    color: "#2196F3",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    width: "90%",
    backgroundColor: "#2196F3",
    alignSelf: "center",
    marginBottom: 20,
  },
});
