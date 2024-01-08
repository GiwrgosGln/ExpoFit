import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function Routines() {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Dummy workout data
  const dummyWorkouts = [
    {
      _id: "659be8cc6360ebc61ce4f9fa",
      title: "Full Body",
      exercises: ["Sit Ups", "Single Arm Lateral Pulldown"],
    },
    {
      _id: "659be8cc6360ebc61ce4f9fa223",
      title: "Upper Body",
      exercises: ["Sit Ups", "Single Arm Lateral Pulldown", "Pull Ups"],
    },
    {
      _id: "659be8cc6360ebc61ce4f9fa223dw",
      title: "Lower Body",
      exercises: ["Sit Ups", "Single Arm Lateral Pulldown"],
    },
    {
      _id: "659be8cc6360eb21312c61ce4f9fa223dw",
      title: "Push",
      exercises: [
        "Sit Ups",
        "Overhead Press",
        "Lateral Raises",
        "Single Arm Lateral Pulldown",
        "Sit Ups",
        "Single Arm Lateral Pulldown",
      ],
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
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {workout.exercises.map((exercise, index) => (
              <Text
                key={index}
                style={{ color: "white", fontSize: 16, fontWeight: 200 }}
              >
                {exercise}
                {index !== workout.exercises.length - 1 && ", "}
              </Text>
            ))}
          </View>
          <View style={{ borderRadius: 25, overflow: "hidden" }}>
            <Button title="Start Workout" color="#6879f8" />
          </View>
        </View>
      ))}
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
    </View>
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
    color: "white",
  },
});
