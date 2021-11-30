import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Button, FlatList, View, StyleSheet, Animated, Text, Pressable } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { InfoToSaveSchema } from "../schema";

type SaveItem = {
  saveKey: string;
  title: string;
};

const textFontSize = 18;
const startingRowHeight = 70;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    height: startingRowHeight,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    backgroundColor: "white",
  },
  infoMessage: {
    fontSize: 18,
    textAlign: "center",
    color: "black",
    paddingTop: 20,
  },
});

// Adapted from: https://dev.to/nrymarz/creating-a-gmail-style-flatlist-in-react-native-with-swipe-to-delete-functionality-o37
// Date: 11/04/2021
// Displays a row within the user's save list
function SaveListItem({ navigation, saveItem, setSavesItemList }) {
  const { saveKey, title } = saveItem as SaveItem;

  // given a swipe right motion on a row, animates with a red "Delete" appearing behind the row
  const swipeRight = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-200, 0],
      outputRange: [1, 0.5],
      extrapolate: "clamp",
    });
    return (
      <Animated.View style={{ backgroundColor: "red", width: "100%", justifyContent: "center" }}>
        <Animated.Text
          style={{
            marginLeft: "auto",
            color: "white",
            marginRight: 50,
            fontSize: textFontSize,
            transform: [{ scale }],
          }}
        >
          Delete{"  "}
          <FontAwesome name="trash" size={24} color="white" />
        </Animated.Text>
      </Animated.View>
    );
  };

  // given a saveKey, deletes that save from local storage
  const deleteSave = async (saveKey: string) => {
    try {
      await AsyncStorage.removeItem(saveKey);
      console.log(`deleted ${saveKey}`);
      setSavesItemList((prevState: SaveItem[]) => prevState.filter((i) => i.saveKey !== saveKey));
    } catch (err) {
      console.log(err);
    }
  };

  // Given a swipe right motion, animates with a "Delete" and then deletes that row's entry
  const rowHeight = new Animated.Value(startingRowHeight);
  const animatedDelete = () => {
    Animated.timing(rowHeight, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start(async () => await deleteSave(saveKey));
  };

  return (
    <Swipeable renderRightActions={swipeRight} onSwipeableOpen={animatedDelete}>
      <Animated.View style={[styles.itemContainer, { height: rowHeight }]}>
        <Pressable style={{ width: "100%" }} onPress={() => navigation.navigate("DisplaySave", { saveKey: saveKey })}>
          <Text style={{ fontSize: textFontSize, textAlign: "center", width: "100%" }}>{title}</Text>
        </Pressable>
      </Animated.View>
    </Swipeable>
  );
}

// Screen which lists out all of a user's saved profiles (resulting from QR scans)
export default function MySavesScreen({ navigation, route, saveLoadCount }) {
  const [savesItemList, setSavesItemList] = useState<SaveItem[]>([]);

  const loadAllSaveKeys = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const saveKeys = allKeys.filter((key) => key.slice(0, 5) === "@Save"); // returns array of all saveKeys [@Save-1, @Save-2...]
      const saveKeyValues = await AsyncStorage.multiGet(saveKeys); // returns array of [key, value] [[@Save-1, JSON], [@Save-2, JSON]..]
      const savesObjList = saveKeyValues.map(([saveKey, loadSaveJSON]) => {
        const saveDate = new Date(Number(saveKey.slice(6))); // saveKey is like @Save-1635994586060 -> second portion is UNIX timestamp
        const prof: InfoToSaveSchema = JSON.parse(loadSaveJSON);
        const { firstName, lastName } = prof;
        return {
          saveKey: saveKey,
          title: `${firstName + " " || ""}${lastName + " " || ""}(${saveDate.toLocaleDateString()})`,
        };
      });
      setSavesItemList(savesObjList);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadAllSaveKeys();
  }, [saveLoadCount]); // will reload the saves list at (1) startup of the app or (2) after a new QR is scanned

  return (
    <View style={styles.container}>
      {savesItemList.length === 0 && <Text style={styles.infoMessage}>You don't have any saved profiles</Text>}
      <FlatList
        data={savesItemList}
        renderItem={({ item }) => (
          <SaveListItem navigation={navigation} saveItem={item} setSavesItemList={setSavesItemList} />
        )}
        keyExtractor={(item) => item.saveKey}
      />
    </View>
  );
}
