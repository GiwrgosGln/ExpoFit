import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Text,
} from "react-native";
import { Input, Picker } from "tamagui";
import ExerciseItem from "./ExerciseItem";
import Filters from "./Filters";
import AddedExercisesButton from "./AddedExercisesButton";
import Sheet from "../ui/Sheet";
// Import the JSON data
import exercisesData from "../../../data/exercises.json";
import useExerciseStore from "../../../state/exerciseStore";
import { useNavigation } from "@react-navigation/native";

const ExerciseList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [targetFilter, setTargetFilter] = useState(null);
  const [equipmentFilter, setEquipmentFilter] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const navigation = useNavigation();
  const [componentKey, setComponentKey] = useState(0);

  // Use the store
  const { exercises, selectedExercises, addSelectedExercise } =
    useExerciseStore();

  // Set the initial state with the imported JSON data
  useEffect(() => {
    useExerciseStore.setState({ exercises: exercisesData });
  }, []);

  const handleExercisePress = (exercise) => {
    console.log("Exercise pressed:", exercise);
    setSelectedExercise(exercise);
    setComponentKey((prevKey) => prevKey + 1);
  };

  const handleAddPress = (exercise) => {
    console.log(`Added ${exercise.name}`);
    addSelectedExercise(exercise);
  };

  const handleShowAddedExercises = () => {
    console.log("Selected Exercises to pass:", selectedExercises);
    // Navigate to CreateRoutineScreen with the selected exercises
    navigation.navigate("CreateRoutine", {
      selectedExercises: selectedExercises,
    });
  };

  const handleCloseSheet = () => {
    setSelectedExercise(null);
  };

  return (
    <View style={{ height: "100%" }}>
      <StatusBar backgroundColor="#161a22" color="white" style="light" />

      <Input
        style={{
          height: 40,
          marginTop: 15,
          borderRadius: 25,
          marginHorizontal: 15,
          color: "white",
          borderColor: "#6879f8",
        }}
        placeholder="Search exercises..."
        value={searchQuery}
        onChangeText={(query) => setSearchQuery(query)}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 15,
          gap: 25,
          marginTop: 10,
        }}
      >
        <Filters
          selectedValue={targetFilter}
          onValueChange={setTargetFilter}
          items={[
            { label: "All Muscles", value: null },
            { label: "Abs", value: "Abs" },
            { label: "Lats", value: "Lats" },
            { label: "Chest", value: "Pectorals" },
          ]}
        />

        <Filters
          selectedValue={equipmentFilter}
          onValueChange={setEquipmentFilter}
          items={[
            { label: "All Equipment", value: null },
            { label: "Barbell", value: "Barbell" },
            { label: "Body Weight", value: "Body Weight" },
            { label: "Leverage Machine", value: "Leverage Machine" },
            { label: "Cable", value: "Cable" },
          ]}
        />
      </View>

      {selectedExercises.length > 0 && (
        <AddedExercisesButton onPress={handleShowAddedExercises} />
      )}

      <ScrollView style={{ marginTop: 10 }}>
        {exercises
          .filter((exercise) => {
            const matchesSearch =
              exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              exercise.equipment
                .toLowerCase()
                .includes(searchQuery.toLowerCase());

            const matchesTargetFilter =
              targetFilter === null || exercise.target === targetFilter;

            const matchesEquipmentFilter =
              equipmentFilter === null ||
              exercise.equipment === equipmentFilter;

            return (
              matchesSearch && matchesTargetFilter && matchesEquipmentFilter
            );
          })
          .map((exercise) => (
            <ExerciseItem
              key={exercise._id.toString()}
              exercise={exercise}
              onPress={handleExercisePress}
              onAddPress={handleAddPress}
            />
          ))}
      </ScrollView>

      {selectedExercise && (
        <Sheet
          key={componentKey}
          exercise={selectedExercise}
          onClose={handleCloseSheet}
        />
      )}
    </View>
  );
};

export default ExerciseList;
