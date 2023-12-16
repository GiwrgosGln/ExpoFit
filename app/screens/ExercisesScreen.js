import React from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Sheet from "../components/ui/Sheet";

export default function ExercisesScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#161a22" }}>
      <StatusBar backgroundColor="#161a22" color="white" style="light" />
      <Text
        style={{
          marginTop: 50,
          alignSelf: "center",
          fontSize: 30,
          color: "white",
        }}
      >
        Exercises
      </Text>
      <Sheet />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  itemContainer: {
    alignItems: "center",
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    marginTop: 10,
    color: "white",
  },
});
