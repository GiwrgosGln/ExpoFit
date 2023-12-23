import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Loader1 from "../components/ui/Loader";
import globalStyles from "../styles/globalStyles";
import DraggableFlatList from "react-native-draggable-flatlist";
import DummyData from "../components/ui/DraggableFlatlist";

const Home = () => {
  return (
    <View style={globalStyles.container}>
      <StatusBar backgroundColor="#161a22" color="white" style="light" />
      <Loader1 />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
