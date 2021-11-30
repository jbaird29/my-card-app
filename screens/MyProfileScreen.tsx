import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Image, ActivityIndicator } from "react-native";
import { fetchQR } from "../helper/fetch";
import { getInfoIncludedDefaults, InfoIncludedSchema, InfoSchema, InfoToSaveSchema } from "../schema";

// Screen which displays QR codes for Personal & Professional Profiles and button to edit them
export default function MyProfileScreen({ navigation, route, qrReload }) {
  const [loading, setLoading] = useState(false);
  const [dataURL, setDataURL] = useState("");

  const profileName = route.params.profileName;

  const handleEditPress = () => navigation.navigate("EditProfile", { profileName: profileName });

  // given a profileName (e.g. Professional), loads the QR representation of that profile from microservice via HTTP
  const updateProfileQR = async (profileName: string) => {
    setLoading(true);
    // load two objects: myInfo, and which keys in myInfo are included in this profile
    // myInfo:  {firstName: Jon, lastName: Baird}  myInfoIncluded {firstName: true, lastName: false}
    const loadInfo = await AsyncStorage.getItem(`@MyInfo`);
    if (!loadInfo) return; // if the user hasn't entered their info yet, stop;
    const myInfo: InfoSchema = JSON.parse(loadInfo);
    const loadIncl = await AsyncStorage.getItem(`@Profile-${profileName}`);
    const myInfoIncluded: InfoIncludedSchema = loadIncl ? JSON.parse(loadIncl) : getInfoIncludedDefaults(profileName);
    // filter the MyInfo to only key key/vaue pairs where InfoIncluded[key] = true
    const payload: InfoToSaveSchema = { m: "c" };
    for (const key in myInfo) {
      if (myInfoIncluded[key]) payload[key] = myInfo[key];
    }
    // fetch the QR code dataURL and set it onscreen
    const dataURL = await fetchQR(payload);
    if (dataURL) setDataURL(dataURL);
    setLoading(false);
  };

  // reloads the QR code when the screen is mounted or when a reload is triggered (like when info is edited)
  useEffect(() => {
    updateProfileQR(profileName);
  }, [qrReload]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{profileName} Profile</Text>
      {loading && <ActivityIndicator animating={loading} size="large" />}
      {!loading && (
        <Image
          resizeMode="contain"
          source={dataURL ? { uri: dataURL } : require("../assets/fake-qr.jpg")}
          style={{ width: "85%", height: "60%", resizeMode: "contain" }}
        />
      )}
      <Text style={{ fontSize: 15, textAlign: "center", paddingBottom: 5 }}>
        Edit this profile to change the fields shared
      </Text>
      <View style={styles.button}>
        <Button color="white" title="Edit this Profie" onPress={handleEditPress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 30,
    fontWeight: "700",
    color: "#2196F3",
  },
  button: {
    width: "90%",
    backgroundColor: "#2196F3",
  },
});
