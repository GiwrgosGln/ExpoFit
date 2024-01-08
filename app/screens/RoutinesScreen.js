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
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import globalStyles from "../styles/globalStyles";

export default function RoutinesScreen() {
  const navigation = useNavigation();
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Dummy workout data
  const dummyWorkouts = [
    {
      _id: "659be8cc6360ebc61ce4f9fa",
      title: "Full Body",
      exercises: {
        "Sit Ups": ["Warm Up", "Warm Up", "Normal", "Normal"],
        "Single Arm Lateral Pulldown": ["Warm Up", "Normal"],
      },
    },
    {
      _id: "659be8cc6360ebc61ce4f9fa223",
      title: "Upper Body",
      exercises: {
        "Sit Ups": ["Warm Up", "Warm Up", "Normal", "Normal"],
        "Single Arm Lateral Pulldown": ["Warm Up", "Normal"],
      },
    },
    {
      _id: "659be8cc6360ebc61ce4f9fa223dw",
      title: "Lower Body",
      exercises: {
        "Sit Ups": ["Warm Up", "Warm Up", "Normal", "Normal"],
        "Single Arm Lateral Pulldown": ["Warm Up", "Normal"],
      },
    },
    // More Workouts
  ];

  const handleOptionsPress = (workout) => {
    setSelectedWorkout(workout);
    setModalVisible(true);
  };

  const handleEditWorkout = () => {
    // Implement logic for editing workout
    console.log("Edit workout for:", selectedWorkout);
    setModalVisible(false);
  };

  const handleDeleteWorkout = () => {
    // Implement logic for deleting workout
    console.log("Delete workout for:", selectedWorkout);
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="#161a22" color="white" style="light" />
      <View style={{ marginTop: 50, gap: 10 }}>
        <Text style={{ fontSize: 20, color: "white" }}>Quick Start</Text>
        <Button
          title="Start Empty Workout"
          color="#6879f8"
          onPress={() => navigation.navigate("Exercises")}
        />
        <Text style={{ fontSize: 20, color: "white" }}>My Routines</Text>
        <View style={{ marginBottom: 10 }}>
          <Button
            title="Create New Routine"
            color="#6879f8"
            onPress={() => navigation.navigate("Exercises")}
          />
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        {dummyWorkouts.map((workout) => (
          <View
            key={workout._id}
            style={{
              gap: 15,
              padding: 20,
              backgroundColor: "#292a3e",
              borderRadius: 25,
              marginBottom: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 20, fontWeight: 700 }}>
                {workout.title}
              </Text>
              <TouchableOpacity onPress={() => handleOptionsPress(workout)}>
                <Entypo name="dots-three-vertical" size={20} color="white" />
              </TouchableOpacity>
            </View>
            {Object.entries(workout.exercises).map(
              ([exercise, levels], index) => (
                <View key={index}>
                  <Text
                    style={{ color: "white", fontSize: 16, fontWeight: 600 }}
                  >
                    {exercise}
                  </Text>
                  <Text style={{ color: "white" }}>{levels.join(", ")}</Text>
                </View>
              )
            )}
            <View style={{ borderRadius: 25, overflow: "hidden" }}>
              <Button title="Start Workout" color="#6879f8" />
            </View>
          </View>
        ))}
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={handleEditWorkout}>
              <Text style={styles.modalOption}>Edit Workout</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDeleteWorkout}>
              <Text style={styles.modalOption}>Delete Workout</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalOption}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161a22",
    paddingHorizontal: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#292a3e",
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  modalOption: {
    fontSize: 18,
    paddingVertical: 10,
    color: "#6879f8",
  },
});
