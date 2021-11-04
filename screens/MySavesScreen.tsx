import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Button, FlatList, View, StyleSheet } from "react-native";

export default function MySavesScreen({ navigation, route }) {
  const [savesObjList, setSavesObjList] = useState([]);

  // TODO - add delete save functionality (swipe left to delete? edit button?)
  // TODO - add the name of the profile as title
  const loadAllSaveKeys = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const saveKeys = allKeys.filter((key) => key.slice(0, 5) === "@Save");
      console.log(saveKeys);
      const savesObjList = saveKeys.map((saveKey) => {
        const saveDate = new Date(Number(saveKey.slice(6))); // saveKey is like Save-1635994586060 -> second portion is UNIX timestamp
        return { saveKey: saveKey, title: `Saved Profile on ${saveDate.toLocaleDateString()}` };
      });
      setSavesObjList(savesObjList);
    } catch (e) {
      console.log(e);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.button}>
      <Button title={item.title} onPress={() => navigation.navigate("DisplaySave", { saveKey: item.saveKey })} />
    </View>
  );

  useFocusEffect(
    React.useCallback(() => {
      loadAllSaveKeys(); // Performs this when screen is focused rather than mounted
      return () => {
        setSavesObjList([]);
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList data={savesObjList} renderItem={renderItem} keyExtractor={(item) => item.saveKey} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: "100%",
    height: 60,
    textAlign: "center",
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    backgroundColor: "white",
  },
});
