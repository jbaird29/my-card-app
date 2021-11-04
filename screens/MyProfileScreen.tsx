import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { fetchQR } from "../helper/fetch";
import { InfoIncludedSchema, InfoSchema, InfoToSaveSchema } from "../schema";

export default function MyProfileScreen({ navigation, route }) {
  const [dataURL, setDataURL] = useState("");

  const profileName = route.params.profileName;

  const handleEditPress = () => navigation.navigate("EditProfile", { profileName: profileName });

  // TODO - replace "Fake QR Code" with something better
  // TODO - handle case when user doesn't have info inputted or profile type selected
  // TODO - probably autosave two profiles - Personal and Professional - with default values
  const updateProfileQR = async () => {
    // load two objects: myInfo, and which keys in myInfo are included in this profile
    // myInfo:  {firstName: Jon, lastName: Baird}  myInfoIncluded {firstName: true, lastName: false}
    const myInfo: InfoSchema = JSON.parse(await AsyncStorage.getItem(`@MyInfo`));
    const myInfoIncluded: InfoIncludedSchema = JSON.parse(await AsyncStorage.getItem(`@Profile-${profileName}`));
    // filter the MyInfo to only key key/vaue pairs where InfoIncluded[key] = true
    const payload: InfoToSaveSchema = { m: "c" };
    for (const key in myInfo) {
      if (myInfoIncluded[key]) payload[key] = myInfo[key];
    }
    const dataURL = await fetchQR(payload);
    if (dataURL) setDataURL(dataURL);
  };

  useEffect(() => {
    updateProfileQR();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{profileName} Profile</Text>
      <Image
        resizeMode="contain"
        source={dataURL ? { uri: dataURL } : require("../assets/fake-qr.jpg")}
        style={{ width: "85%", height: "60%", resizeMode: "contain" }}
      />
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
