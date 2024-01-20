import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Button, Input } from "tamagui";
import useSetsStore from "../../../state/setsStore";
import useExerciseStore from "../../../state/exerciseStore";
import { useNavigation } from "@react-navigation/native";
import {
  AntDesign,
  Feather,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

const CreateRoutineScreen = ({ route }) => {
  const {
    exercises,
    selectedExercises,
    sets,
    addExercise,
    removeExercise,
    clearExercises,
    addSelectedExercise,
    removeSelectedExercise,
    clearSelectedExercises,
    addSet,
    setSets,
  } = useExerciseStore();

  const navigation = useNavigation();

  const handleAddSet = (exerciseIndex) => {
    const existingSetsForExercise = sets
      ? sets.filter((set) => set.exerciseIndex === exerciseIndex)
      : [];
    const setIndex = existingSetsForExercise.length; // Incremental set index

    // Add a new set to the sets array for the specified exercise
    addSet({ type: "", exerciseIndex, setIndex });
  };

  const handleTypeChange = (type, exerciseIndex, setIndex) => {
    const newSets = sets ? [...sets] : [];
    newSets.find(
      (s) => s.exerciseIndex === exerciseIndex && s.setIndex === setIndex
    ).type = type;

    // Use setSets to update the entire sets array
    setSets(newSets);
  };

  const handleRemoveSet = (exerciseIndex, setIndexToRemove) => {
    // Remove the set from the sets array
    const newSets = sets
      ? sets.filter(
          (set) =>
            !(
              set.exerciseIndex === exerciseIndex &&
              set.setIndex === setIndexToRemove
            )
        )
      : [];

    // Re-index the remaining sets for the specified exercise
    const remainingSetsForExercise = newSets.filter(
      (set) => set.exerciseIndex === exerciseIndex
    );
    remainingSetsForExercise.forEach((set, index) => {
      set.setIndex = index;
    });

    // Use setSets to update the entire sets array
    setSets(newSets);
  };

  const handleRemoveExercise = (exerciseIndex) => {
    // Remove the exercise from the selectedExercises array
    removeSelectedExercise(exerciseIndex);

    // Remove the exercise and its associated sets from the state
    const newSets = sets.filter((set) => set.exerciseIndex !== exerciseIndex);

    // Re-index the remaining sets for the specified exercises
    newSets.forEach((set) => {
      if (set.exerciseIndex > exerciseIndex) {
        set.exerciseIndex -= 1;
      }
    });

    // Use setSets to update the entire sets array
    setSets(newSets);
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#161a22",
        paddingTop: 40,
        gap: 30,
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, color: "white" }}>Create Routine</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="save" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ gap: 10 }}>
        <Input
          placeholder="Title"
          style={{
            borderColor: "#6879f8",
          }}
        />
      </View>
      <View style={{ paddingBottom: 100, gap: 40, marginTop: 20 }}>
        {/* Display exercises and sets inputs */}
        {selectedExercises.map((exercise, exerciseIndex) => (
          <View key={exercise.id} style={{ gap: 0 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flex: 1,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  alignSelf: "center",
                  fontWeight: 600,
                }}
              >
                {exercise.name}
              </Text>
              {/* Button to add set for the current exercise */}
              <TouchableOpacity
                onPress={() => handleAddSet(exerciseIndex)}
                style={{
                  backgroundColor: "#6879f8",
                  borderRadius: 10,
                  padding: 10,
                  marginTop: 10,
                  alignSelf: "center",
                }}
              >
                <Text style={{ color: "white" }}>Add Set</Text>
              </TouchableOpacity>
            </View>

            {/* Display sets inputs for the current exercise */}
            {sets
              .filter((set) => set.exerciseIndex === exerciseIndex)
              .map((set, setIndex) => (
                <View key={setIndex}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      marginVertical: 10,
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        alignSelf: "center",
                        fontSize: 24,
                      }}
                    >
                      {setIndex + 1}
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        borderRadius: 10,
                        overflow: "hidden",
                        height: 40,
                        justifyContent: "center",
                        alignContent: "center",
                      }}
                    >
                      {/* Picker for set type */}
                      <Picker
                        selectedValue={set.type}
                        onValueChange={(itemValue) =>
                          handleTypeChange(itemValue, exerciseIndex, setIndex)
                        }
                        style={{
                          backgroundColor: "#292a40",
                          color: "white",
                          flex: 1,
                          marginHorizontal: 5,
                        }}
                        dropdownIconColor={"white"}
                      >
                        <Picker.Item label="Normal" value="Normal" />
                        <Picker.Item label="Warm Up" value="Warm Up" />
                        <Picker.Item label="Failure" value="Failure" />
                      </Picker>
                    </View>
                    {/* Remove button */}
                    <TouchableOpacity
                      onPress={() => handleRemoveSet(exerciseIndex, setIndex)}
                    >
                      <Feather name="x" size={28} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            {/* Button to remove the current exercise */}
            <TouchableOpacity
              onPress={() => handleRemoveExercise(exerciseIndex)}
              style={{
                backgroundColor: "#ff6b6b",
                borderRadius: 10,
                padding: 10,
                marginTop: 10,
                alignSelf: "center",
              }}
            >
              <Text style={{ color: "white" }}>Remove Exercise</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default CreateRoutineScreen;
