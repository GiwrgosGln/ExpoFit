import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#161a22" color="white" style="light" />
      <Text style={{ color: "white", fontSize: 30 }}>Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161a22",
    justifyContent: "center",
    alignItems: "center",
  },
});
