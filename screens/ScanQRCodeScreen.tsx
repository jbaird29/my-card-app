import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Copied from: https://docs.expo.dev/versions/v43.0.0/sdk/bar-code-scanner/
// Date: 10/22/2021

export default function ScanQRCodeScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    try {
      const dataParsed = JSON.parse(data);
      if (dataParsed.m !== "c") throw "Error - That is not a MyCard QR Code.";
      const saveKey = `@Save-${Date.now()}`;
      await AsyncStorage.setItem(saveKey, data);
      // TODO - invalidate the SavesList state here and force a reload of the saves from storage
      console.log(`Saved with key: ${saveKey}`);
      console.log(data);
      // Below: https://reactnavigation.org/docs/nesting-navigators/#navigating-to-a-screen-in-a-nested-navigator
      navigation.navigate("SavesNav", { screen: "DisplaySave", initial: false, params: { saveKey: saveKey } });
    } catch (err) {
      console.log(err);
      alert("Error - That is not a MyCard QR Code.");
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  // when screen is not focused return an empty view (otherwise the QR scanner is always active in the background)
  if (!isFocused) {
    return <View></View>;
  }

  return (
    <View style={styles.container}>
      {!scanned && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}
      {scanned && <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
