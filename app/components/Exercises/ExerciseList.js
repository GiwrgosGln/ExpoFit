import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { getExercises } from "../../../services/apiService";
import Sheet from "../ui/Sheet";
import { ListItem, Separator, YGroup, Input } from "tamagui";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import useExerciseStore from "../../../state/exerciseStore";

const ExerciseItem = React.memo(({ exercise, onPress, onAddPress }) => (
  <TouchableOpacity onPress={() => onPress(exercise)} key={exercise._id}>
    <YGroup>
      <YGroup.Item>
        <ListItem
          style={{ backgroundColor: "#161a22", fontFamily: "Inter" }}
          title={`${exercise.name}`}
          subTitle={`${exercise.equipment}`}
          iconAfter={
            <View style={{ flexDirection: "row", gap: 5 }}>
              <TouchableOpacity onPress={() => onAddPress(exercise)}>
                <AntDesign name="pluscircleo" size={30} color="#6879f8" />
              </TouchableOpacity>
            </View>
          }
        />
        <Separator />
      </YGroup.Item>
    </YGroup>
  </TouchableOpacity>
));

const ExerciseList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [targetFilter, setTargetFilter] = useState(null);
  const [equipmentFilter, setEquipmentFilter] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null); // Add this line
  const navigation = useNavigation();
  const [componentKey, setComponentKey] = useState(0);

  // Use the store
  const { exercises, selectedExercises, addSelectedExercise } =
    useExerciseStore();

  useEffect(() => {
    const fetchExercises = async () => {
      const exercisesData = await getExercises();

      if (exercisesData) {
        useExerciseStore.setState({ exercises: exercisesData });
      }
    };

    fetchExercises();
  }, []);

  const handleExercisePress = (exercise) => {
    console.log("Exercise pressed:", exercise);
    setSelectedExercise(exercise); // Add this line
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
            selectedValue={targetFilter}
            style={{
              backgroundColor: "#6879f8",
            }}
            onValueChange={(itemValue) => setTargetFilter(itemValue)}
            dropdownIconColor={"black"}
          >
            <Picker.Item
              label="All Muscles"
              value={null}
              style={{
                fontSize: 16,
                color: "black",
              }}
            />
            <Picker.Item
              label="Abs"
              value="Abs"
              style={{ fontSize: 16, color: "black" }}
            />
            <Picker.Item
              label="Lats"
              value="Lats"
              style={{ fontSize: 16, color: "black" }}
            />
            <Picker.Item
              label="Chest"
              value="Pectorals"
              style={{ fontSize: 16, color: "black" }}
            />
          </Picker>
        </View>

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
            selectedValue={equipmentFilter}
            style={{
              backgroundColor: "#6879f8",
            }}
            onValueChange={(itemValue) => setEquipmentFilter(itemValue)}
            dropdownIconColor={"black"}
          >
            <Picker.Item
              label="All Equipment"
              value={null}
              style={{ fontSize: 16, color: "black" }}
            />
            <Picker.Item
              label="Barbell"
              value="Barbell"
              style={{ fontSize: 16, color: "black" }}
            />
            <Picker.Item
              label="Body Weight"
              value="Body Weight"
              style={{ fontSize: 16, color: "black" }}
            />
            <Picker.Item
              label="Leverage Machine"
              value="Leverage Machine"
              style={{ fontSize: 16, color: "black" }}
            />
            <Picker.Item
              label="Cable"
              value="Cable"
              style={{ fontSize: 16, color: "black" }}
            />
          </Picker>
        </View>
      </View>

      {selectedExercises.length > 0 && (
        <TouchableOpacity
          style={{
            backgroundColor: "#6879f8",
            height: 40,
            alignItems: "center",
            marginTop: 15,
            borderRadius: 10,
            width: "92%",
            alignSelf: "center",
            justifyContent: "center",
          }}
          onPress={handleShowAddedExercises}
        >
          <Text style={{ color: "black", fontSize: 16 }}>
            Show Added Exercises
          </Text>
        </TouchableOpacity>
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
