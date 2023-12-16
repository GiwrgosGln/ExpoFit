import { View, Text } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

export default function Settings() {
  return (
    <View style={{ marginTop: 500 }}>
      <StatusBar backgroundColor="#161a22" color="white" style="light" />
      <Text>Settings</Text>
    </View>
  );
}
