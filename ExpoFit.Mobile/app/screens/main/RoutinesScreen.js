import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Entypo } from "@expo/vector-icons";
import StartEmptyWorkoutBtn from "../../components/Routines/StartEmptyWorkout";
import CreateNewRoutine from "../../components/Routines/CreateNewRoutine";
import Routines from "../../components/Routines/Routines";

export default function RoutinesScreen() {
  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="#161a22" color="white" style="light" />
      <View style={{ marginTop: 50, gap: 10 }}>
        <Text style={{ fontSize: 20, color: "white" }}>My Routines</Text>
        <View style={{ marginBottom: 10 }}>
          <CreateNewRoutine />
        </View>
        <View>
          <Routines />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161a22",
    paddingHorizontal: 20,
  },
});
