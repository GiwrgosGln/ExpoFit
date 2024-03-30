import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Input } from "tamagui";
import { useNavigation } from "@react-navigation/native";
import DiscardWorkout from "../../components/Modal/DiscardWorkout";
import SetType from "../../components/Modal/SetType";
import Rpe from "../../components/Modal/Rpe";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import ExerciseSheet from "../../components/ui/ExerciseSheet";

const WorkoutDetailsScreen = ({ route }) => {
  const { routine } = route.params;
  const navigation = useNavigation();
  const uid = useSelector((state) => state.auth.uid);
  const [modalVisible, setModalVisible] = useState(false);
  const [rpeModalVisible, setRpeModalVisible] = useState(false);
  const [rpeValues, setRpeValues] = useState(
    Array(routine.exercises.length)
      .fill()
      .map(() => [])
  );
  const [typeModalVisible, setTypeModalVisible] = useState(false);
  const [exerciseSetTypes, setExerciseSetTypes] = useState(
    Array(routine.exercises.length)
      .fill()
      .map(() => ["Working"])
  );
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState(null);
  const [exerciseSetCounts, setExerciseSetCounts] = useState(
    Array(routine.exercises.length).fill(1)
  );
  const [selectedSetIndex, setSelectedSetIndex] = useState(null);
  const [selectedSetIndices, setSelectedSetIndices] = useState(
    Array(routine.exercises.length).fill(null)
  );
  const [repsValues, setRepsValues] = useState(
    Array(routine.exercises.length)
      .fill()
      .map(() => [])
  );
  const [weightValues, setWeightValues] = useState(
    Array(routine.exercises.length)
      .fill()
      .map(() => [])
  );
  const [selectedExercise, setSelectedExercise] = useState(null);

  const handleCancel = () => {
    setModalVisible(true);
    setRpeModalVisible(false);
  };

  const confirmCancel = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  const cancelCancel = () => {
    setModalVisible(false);
  };

  // Inside handleSetTypeSelection function
  const handleSetTypeSelection = (type) => {
    if (selectedExerciseIndex !== null && selectedSetIndex !== null) {
      const updatedSetTypes = [...exerciseSetTypes];
      updatedSetTypes[selectedExerciseIndex][selectedSetIndex] = type;
      setExerciseSetTypes(updatedSetTypes);
    }
    setTypeModalVisible(false);
  };

  // Inside handleRpeSelection function
  const handleRpeSelection = (rpeValue) => {
    if (selectedExerciseIndex !== null && selectedSetIndex !== null) {
      const updatedRpeValues = [...rpeValues];
      updatedRpeValues[selectedExerciseIndex][selectedSetIndex] = rpeValue;
      setRpeValues(updatedRpeValues);
    }
    setRpeModalVisible(false);
  };

  const openSetTypeModal = (exerciseIndex, setIndex) => {
    setSelectedExerciseIndex(exerciseIndex);
    setSelectedSetIndex(setIndex);
    setTypeModalVisible(true);
  };

  const openRpeModal = (exerciseIndex, setIndex) => {
    setSelectedExerciseIndex(exerciseIndex);
    setSelectedSetIndex(setIndex);
    setRpeModalVisible(true);
  };

  // Update addSet function
  const addSet = (index) => {
    const updatedSetCounts = [...exerciseSetCounts];
    updatedSetCounts[index] += 1;
    setExerciseSetCounts(updatedSetCounts);

    const updatedSetTypes = [...exerciseSetTypes];
    updatedSetTypes[index].push("Working");
    setExerciseSetTypes(updatedSetTypes);

    // Add empty values for reps and weight for the new set
    const updatedRepsValues = [...repsValues];
    updatedRepsValues[index].push("");
    setRepsValues(updatedRepsValues);

    const updatedWeightValues = [...weightValues];
    updatedWeightValues[index].push("");
    setWeightValues(updatedWeightValues);
  };

  const handleExercisePress = (exercise) => {
    console.log("Exercise pressed:", exercise);
    setSelectedExercise(exercise);
  };

  const handleCloseSheet = () => {
    setSelectedExercise(null);
  };

  const finishWorkout = () => {
    // Gather data from inputs
    const workoutData = {
      user_id: uid,
      date: new Date().toISOString(),
      exercises: routine.exercises.map((exercise, index) => {
        return {
          name: exercise.name,
          exercise_id: "12312312",
          sets: Array.from({ length: exerciseSetCounts[index] }).map(
            (_, setIndex) => {
              const reps = repsValues[index][setIndex];
              const weight = weightValues[index][setIndex];
              return {
                type: exerciseSetTypes[index][setIndex] || "Type",
                reps: reps === "" ? null : parseInt(reps),
                weight: weight === "" ? null : parseInt(weight),
                rpe: rpeValues[index][setIndex] || "RPE",
              };
            }
          ),
        };
      }),
    };

    // Send data to the endpoint
    fetch("https://ginfitapi.onrender.com/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workoutData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Workout data sent successfully:", data);
        // Optionally, you can navigate to another screen after sending data
        // navigation.navigate("NextScreen");
      })
      .catch((error) => {
        console.error("Error sending workout data:", error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{routine.title}</Text>
        <TouchableOpacity onPress={finishWorkout}>
          <Text style={styles.finishText}>Finish</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        {routine.exercises.map((exercise, index) => (
          <View key={index} style={styles.exerciseItem}>
            <View style={styles.exerciseHeader}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>
              <TouchableOpacity onPress={() => handleExercisePress(exercise)}>
                <AntDesign name="questioncircleo" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.setDefaultContainer}>
              {/* <View style={styles.setDefaultHeader}>
                <Text style={styles.setDefaultHeaderText}>Sets</Text>
                <Text style={styles.setDefaultHeaderText}>Type</Text>
                <Text style={styles.setDefaultHeaderText}>Reps</Text>
                <Text style={styles.setDefaultHeaderText}>Weight</Text>
                <Text style={styles.setDefaultHeaderText}>RPE</Text>
              </View> */}
              {/* Render sets */}
              {Array.from({ length: exerciseSetCounts[index] }).map(
                (_, setIndex) => (
                  <View key={setIndex} style={styles.setDefaultRow}>
                    <Text style={styles.setDefaultText}>{setIndex + 1}</Text>
                    <TouchableOpacity
                      onPress={() => openSetTypeModal(index, setIndex)}
                      style={{ width: 80 }}
                    >
                      <Text style={styles.setDefaultText}>
                        {exerciseSetTypes[index][setIndex] || "Type"}
                      </Text>
                    </TouchableOpacity>
                    <Input
                      style={styles.setDefaultTextInput}
                      placeholder="Reps"
                      keyboardType="numeric"
                      value={repsValues[index][setIndex]}
                      onChangeText={(text) => {
                        const updatedRepsValues = [...repsValues];
                        updatedRepsValues[index][setIndex] = text;
                        setRepsValues(updatedRepsValues);
                      }}
                    />
                    <Input
                      style={styles.setDefaultTextInput}
                      placeholder="Weight"
                      keyboardType="numeric"
                      value={weightValues[index][setIndex]}
                      onChangeText={(text) => {
                        const updatedWeightValues = [...weightValues];
                        updatedWeightValues[index][setIndex] = text;
                        setWeightValues(updatedWeightValues);
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => openRpeModal(index, setIndex)}
                      style={styles.rpeButton}
                    >
                      <Text style={styles.setDefaultText}>
                        {rpeValues[index][setIndex] || "RPE"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )
              )}
            </View>

            <TouchableOpacity
              onPress={() => addSet(index)}
              style={styles.addSetButton}
            >
              <Text style={styles.addSetText}>Add Set</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      {/* Cancel Modal */}
      <DiscardWorkout
        modalVisible={modalVisible}
        onCancel={cancelCancel}
        onConfirm={confirmCancel}
      />
      {/* Set Type Modal */}
      <SetType
        modalVisible={typeModalVisible}
        onClose={() => setTypeModalVisible(false)}
        onSelectType={handleSetTypeSelection}
      />

      {/* RPE Modal */}
      <Rpe
        modalVisible={rpeModalVisible}
        onClose={() => setRpeModalVisible(false)}
        onSelectRpe={handleRpeSelection}
      />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#161a22",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  cancelText: {
    fontSize: 16,
    color: "red",
  },
  finishText: {
    fontSize: 16,
    color: "#6879f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  scrollView: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  exerciseItem: {
    marginBottom: 15,
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  setDefaultContainer: {
    backgroundColor: "#292a3e",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  setDefaultHeader: {
    flexDirection: "row",
    justifyContent: "space-between", // Adjusted alignment
    alignItems: "center",
    marginBottom: 5, // Added margin bottom for separation
  },
  setDefaultHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  setDefaultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  setDefaultText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  setDefaultTextInput: {
    backgroundColor: "#292a3e",
    borderColor: "#6879f8",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    color: "white",
    width: 80,
  },
  addSetButton: {
    backgroundColor: "#292a3e",
    alignSelf: "center",
    width: "100%",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  addSetText: {
    color: "white",
  },
  rpeButton: {
    backgroundColor: "#6879f8",
    width: 50,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});

export default WorkoutDetailsScreen;
