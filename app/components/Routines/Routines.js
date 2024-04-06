// Routines.js

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import Loader1 from "../ui/Loader";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const RoutineItem = ({ routine, onPressOptions, onPressStartWorkout }) => (
  <View
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
      <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
        {routine.title}
      </Text>
      <TouchableOpacity onPress={() => onPressOptions(routine)}>
        <Entypo name="dots-three-vertical" size={20} color="white" />
      </TouchableOpacity>
    </View>
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {routine.exercises.map((exercise, index) => (
        <Text
          key={index}
          style={{ color: "white", fontSize: 16, fontWeight: "normal" }}
        >
          {exercise.name}
          {index !== routine.exercises.length - 1 && ", "}
        </Text>
      ))}
    </View>
    <View style={{ borderRadius: 25, overflow: "hidden" }}>
      <Button
        title="Start Workout"
        color="#6879f8"
        onPress={() => onPressStartWorkout(routine)}
      />
    </View>
  </View>
);

export default function Routines() {
  const [routines, setRoutines] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const uid = useSelector((state) => state.auth.uid);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        if (!uid) return;

        const response = await fetch(
          `https://ginfitapi.onrender.com/routines/${uid}`
        );
        const data = await response.json();
        setRoutines(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching routines:", error);
        setLoading(false);
      }
    };

    if (isFocused && uid) {
      fetchRoutines();
    }
  }, [isFocused, uid]);

  const handleOptionsPress = (workout) => {
    setSelectedWorkout(workout);
    setModalVisible(true);
  };

  const handleEditWorkout = () => {
    console.log("Edit workout for:", selectedWorkout);
    navigation.navigate("EditRoutine", { routine: selectedWorkout });
    setModalVisible(false);
  };

  const handleDeleteWorkout = async () => {
    if (!selectedWorkout) return;

    try {
      const response = await fetch(
        `https://ginfitapi.onrender.com/delete-routine/${selectedWorkout._id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setRoutines((prevRoutines) =>
          prevRoutines.filter((routine) => routine._id !== selectedWorkout._id)
        );
        console.log("Routine deleted successfully");
      } else {
        console.error("Failed to delete routine:", response.status);
      }
    } catch (error) {
      console.error("Error deleting routine:", error);
    }

    setModalVisible(false);
  };

  const handleStartWorkout = (routine) => {
    navigation.navigate("WorkoutDetails", { routine });
    console.log(routine);
  };

  return (
    <View style={{ marginTop: 20 }}>
      {loading ? (
        <Loader1 />
      ) : routines.length > 0 ? (
        routines.map((workout) => (
          <RoutineItem
            key={workout._id}
            routine={workout}
            onPressOptions={handleOptionsPress}
            onPressStartWorkout={handleStartWorkout}
          />
        ))
      ) : (
        <Text style={styles.noRoutinesText}>No routines found.</Text>
      )}
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
  noRoutinesText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
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
