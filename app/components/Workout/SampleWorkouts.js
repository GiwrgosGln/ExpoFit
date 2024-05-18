import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import workoutsData from "../../../data/routines.json";

const SampleWorkouts = () => {
  const navigation = useNavigation();

  const handleStartWorkout = (routine) => {
    navigation.navigate("WorkoutDetails", { routine });
    console.log(routine);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      nestedScrollEnabled={true}
    >
      {workoutsData.workouts.map((routine, index) => (
        <TouchableOpacity
          key={index} // Ensure each item has a unique key
          onPress={() => handleStartWorkout(routine)}
          style={styles.workoutItem}
        >
          <Text style={styles.workoutTitle}>{routine.title}</Text>
          <Text style={styles.workoutDetails}>
            {routine.exercises.length} exercises
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  workoutItem: {
    backgroundColor: "#6879f8",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 10,
    width: 150,
  },
  workoutTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  workoutDetails: {
    fontSize: 14,
    color: "white",
  },
});

export default SampleWorkouts;
