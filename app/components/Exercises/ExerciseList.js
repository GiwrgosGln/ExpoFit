import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import ExerciseSheet from "../ui/ExerciseSheet";
import exercisesData from "../../../data/exercises.json";
import { useDispatch } from "react-redux";
import { addExercise } from "../../redux/routine/routineSlice";

const ExerciseList = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const dispatch = useDispatch();

  const handleExercisePress = (exercise) => {
    console.log("Exercise pressed:", exercise);
    setSelectedExercise(exercise);
  };

  const handleAddExercise = (exercise) => {
    dispatch(addExercise(exercise));
  };

  const handleCloseSheet = () => {
    setSelectedExercise(null);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{}}>
        {/* Render the exercise items */}
        {exercisesData.map((exercise, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              borderBottomColor: "white",
              borderBottomWidth: 0.1,
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
              <TouchableOpacity onPress={() => handleAddExercise(exercise)}>
                <AntDesign name="pluscircleo" size={24} color="#6879f8" />
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
