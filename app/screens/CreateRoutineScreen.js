import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button, Input } from "tamagui";
import useSetsStore from "../../state/setsStore";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

const CreateRoutineScreen = ({ route }) => {
  const { selectedExercises } = route.params;
  const { sets, addSet } = useSetsStore();
  const navigation = useNavigation();

  const handleAddSet = (exerciseIndex) => {
    const existingSetsForExercise = sets.filter(
      (set) => set.exerciseIndex === exerciseIndex
    );
    const setIndex = existingSetsForExercise.length; // Incremental set index

    // Add a new set to the sets array for the specified exercise
    addSet({ type: "", exerciseIndex, setIndex });
  };

  const handleTypeChange = (type, exerciseIndex, setIndex) => {
    const newSets = [...sets];
    newSets.find(
      (s) => s.exerciseIndex === exerciseIndex && s.setIndex === setIndex
    ).type = type;
    addSet(newSets);
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
            <Text
              style={{
                color: "white",
                fontSize: 20,
                alignSelf: "center",
                marginBottom: 20,
              }}
            >
              {exercise.name}
            </Text>

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
                      }}
                    >
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
                        <Picker.Item label="Select Type" value="" />
                        <Picker.Item label="Warm Up" value="Warm Up" />
                        <Picker.Item label="Normal" value="Normal" />
                        <Picker.Item label="Failure" value="Failure" />
                      </Picker>
                    </View>
                  </View>
                </View>
              ))}
            {/* Button to add set for the current exercise */}
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <Button
                onPress={() => handleAddSet(exerciseIndex)}
                backgroundColor={"#6879f8"}
                color={"white"}
              >
                Add Set
              </Button>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default CreateRoutineScreen;
