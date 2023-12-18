import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
} from "react-native";
import axios from "axios";
import { StatusBar } from "expo-status-bar";

const Home = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#161a22" color="white" style="light" />
      <Text style={{ color: "white", fontSize: 30 }}>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161a22",
    justifyContent: "center",
    alignItems: "center",
  },
});
