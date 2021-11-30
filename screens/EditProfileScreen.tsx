import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView } from "react-native";
import IncludeInfoRow from "../components/IncludeInfoRow";
import { IncludeInfoRowProps, InfoIncludedSchema, schema, getInfoIncludedDefaults } from "../schema";

// Edit which fields are displayed int Personal or Professional Profile QR codes
export default function EditProfileScreen({ navigation, route, doQRReload }) {
  const { profileName } = route.params;

  const includeInfoFields: IncludeInfoRowProps[] = schema.map((field) => {
    const [isEnabled, setEnabled] = useState(false);
    return { ...field, isEnabled: isEnabled, setEnabled: setEnabled };
  });

  // given a user profileName (Personal, Professional, etc.), loads the data for that profile
  const loadData = async (profileName: string) => {
    try {
      const loadSave = await AsyncStorage.getItem(`@Profile-${profileName}`);
      const profileInfo: InfoIncludedSchema = loadSave ? JSON.parse(loadSave) : getInfoIncludedDefaults(profileName);
      includeInfoFields.forEach(({ key, setEnabled }) => {
        const isEnabled: boolean = profileInfo[key];
        setEnabled(isEnabled);
      });
    } catch (e) {
      console.log(e);
    }
  };

  // load the profile on mount
  useEffect(() => {
    loadData(profileName);
  }, []);

  // given a user profileName (Personal, Professional, etc.), saves the current data state
  const handleSave = async (profileName: string) => {
    try {
      const toSaveArr = includeInfoFields.map(({ key, isEnabled }) => [key, isEnabled]);
      const toSave = Object.fromEntries(toSaveArr) as InfoIncludedSchema;
      await AsyncStorage.setItem(`@Profile-${profileName}`, JSON.stringify(toSave));
      doQRReload();
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
        <Button color="white" title="Save Profile" onPress={() => handleSave(profileName)} />
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
