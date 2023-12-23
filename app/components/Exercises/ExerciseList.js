import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { getExercises } from "../../../services/apiService";
import Sheet from "../ui/Sheet";
import { ListItem, Separator, YGroup, Input } from "tamagui";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import useRoutineOrderStore from "../../../state/routineOrderStore";

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
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [targetFilter, setTargetFilter] = useState(null);
  const [equipmentFilter, setEquipmentFilter] = useState(null);

  const routineOrderStore = useRoutineOrderStore();
  const navigation = useNavigation();
  const [componentKey, setComponentKey] = useState(0);

  useEffect(() => {
    const fetchExercises = async () => {
      const exercisesData = await getExercises();

      if (exercisesData) {
        setExercises(exercisesData);
      }
    };

    fetchExercises();
  }, []);

  const handleExercisePress = (exercise) => {
    console.log("Exercise pressed:", exercise);
    setSelectedExercise(exercise);
    setComponentKey((prevKey) => prevKey + 1);
  };

  const handleAddPress = (exercise) => {
    console.log(`Added ${exercise.name}`);
    routineOrderStore.setRoutineOrder([
      ...routineOrderStore.routineOrder,
      exercise,
    ]);
    console.log("Selected Exercises:", routineOrderStore.routineOrder);
  };

  const handleCloseSheet = () => {
    setSelectedExercise(null);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleTargetFilterChange = (target) => {
    setTargetFilter(target);
  };

  const handleEquipmentFilterChange = (equipment) => {
    setEquipmentFilter(equipment);
  };

  const handleShowAddedExercises = () => {
    console.log("Selected Exercises to pass:", routineOrderStore.routineOrder);
    // Navigate to CreateRoutineScreen with the selected exercises
    navigation.navigate("CreateRoutine", {
      selectedExercises: routineOrderStore.routineOrder,
    });
  };

  useEffect(() => {
    console.log("Updated Selected Exercises:", routineOrderStore.routineOrder);
  }, [routineOrderStore.routineOrder]);

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
        onChangeText={handleSearchChange}
      />

      {/* Filter pickers in the same line */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 15,
          gap: 25,
          marginTop: 10,
        }}
      >
        {/* Target filter input */}
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
            onValueChange={(itemValue) => handleTargetFilterChange(itemValue)}
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

        {/* Equipment filter input */}
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
            itemStyle={{ height: 520 }}
            onValueChange={(itemValue) =>
              handleEquipmentFilterChange(itemValue)
            }
            dropdownIconColor={"black"}
          >
            <Picker.Item
              label="All Equipment"
              value={null}
              style={{ fontSize: 16, color: "black" }}
            />
            {/* Replace the following options with your actual equipment values */}
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
            {/* Add more items based on your actual equipment values */}
          </Picker>
        </View>
      </View>

      {/* Button to show added exercises and navigate to CreateRoutineScreen */}
      {routineOrderStore.routineOrder.length > 0 && (
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

      {/* Exercise list */}
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

      {/* Selected exercise sheet */}
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
