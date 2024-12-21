import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import ExerciseSheet from "../ui/ExerciseSheet";
import exercisesData from "../../../data/exercises.json";
import { useDispatch, useSelector } from "react-redux";
import { addExercise, removeExercise } from "../../redux/routine/routineSlice";
import { Separator } from "tamagui";

const ExerciseList = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const dispatch = useDispatch();
  const addedExercises = useSelector((state) => state.routine.exercises);

  const handleExercisePress = (exercise) => {
    console.log("Exercise pressed:", exercise);
    setSelectedExercise(exercise);
  };

  const handleAddOrRemoveExercise = (exercise) => {
    if (isExerciseAdded(exercise)) {
      dispatch(removeExercise(exercise.id)); // Remove exercise if already added
    } else {
      dispatch(addExercise(exercise)); // Add exercise if not added
    }
  };

  const handleCloseSheet = () => {
    setSelectedExercise(null);
  };

  // Function to check if an exercise is already added
  const isExerciseAdded = (exercise) => {
    return addedExercises.some(
      (addedExercise) => addedExercise.id === exercise.id
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {/* Render the exercise items */}
        {exercisesData.map((exercise, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            <View>
              <Text style={{ color: "white" }}>{exercise.name}</Text>
              <Text style={{ color: "gray" }}>{exercise.equipment}</Text>
            </View>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <TouchableOpacity onPress={() => handleExercisePress(exercise)}>
                <AntDesign name="questioncircleo" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleAddOrRemoveExercise(exercise)}
              >
                {isExerciseAdded(exercise) ? ( // Check if exercise is added
                  <AntDesign name="minuscircleo" size={24} color="#ff6b6b" />
                ) : (
                  <AntDesign name="pluscircleo" size={24} color="#6879f8" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Render the BottomSheet */}
      {selectedExercise && (
        <ExerciseSheet
          isVisible={true}
          onClose={handleCloseSheet}
          exercise={selectedExercise}
          onCloseCallback={handleCloseSheet}
        />
      )}
    </View>
  );
};

export default ExerciseList;
