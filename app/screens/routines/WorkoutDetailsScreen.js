import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
} from "react-native";
import { Input } from "tamagui";
import { useNavigation } from "@react-navigation/native";

const WorkoutDetailsScreen = ({ route }) => {
  const { routine } = route.params;
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [setType, setSetType] = useState("Working");
  const [reps, setReps] = useState("");
  const [kg, setKg] = useState("");
  const [rpeModalVisible, setRpeModalVisible] = useState(false);
  const [typeModalVisible, setTypeModalVisible] = useState(false);
  const [rpe, setRpe] = useState("");

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

  const handleSetTypeSelection = (type) => {
    setSetType(type);
    setTypeModalVisible(false);
  };

  const handleRpeSelection = (rpeValue) => {
    setRpe(rpeValue);
    setRpeModalVisible(false);
  };

  return (
    <View style={{ flex: 1, paddingTop: 40, backgroundColor: "#161a22" }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{routine.title}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.finishText}>Finish</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.durationContainer}>
        <View style={styles.durationTextContainer}>
          <Text style={styles.durationLabelText}>Duration</Text>
          <Text style={styles.durationValueText}>25:06</Text>
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        {routine.exercises.map((exercise, index) => (
          <View key={index} style={styles.exerciseItem}>
            <View style={styles.exerciseHeader}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>
            </View>
            {/* Default Set */}
            <View style={styles.setDefaultContainer}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white" }}>Sets</Text>
                <Text style={{ color: "white" }}>Type</Text>
                <Text style={{ color: "white" }}>Reps</Text>
                <Text style={{ color: "white" }}>Weight</Text>
                <Text style={{ color: "white" }}>RPE</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Text style={{ color: "white" }}>1</Text>
                <TouchableOpacity onPress={() => setTypeModalVisible(true)}>
                  <Text style={{ color: "white" }}>{setType}</Text>
                </TouchableOpacity>
                <Input
                  backgroundColor="#292a3e"
                  borderColor={"#6879f8"}
                  placeholder="Reps"
                  placeholderTextColor={"gray"}
                  focusStyle={{ borderColor: "#6879f8" }}
                  size="$4"
                  value={reps}
                  onChangeText={setReps}
                  keyboardType="numeric"
                />
                <Input
                  backgroundColor="#292a3e"
                  borderColor={"#6879f8"}
                  placeholder="Weight"
                  placeholderTextColor={"gray"}
                  focusStyle={{ borderColor: "#6879f8" }}
                  size="$4"
                  value={kg}
                  onChangeText={setKg}
                  keyboardType="numeric"
                />
                <TouchableOpacity
                  onPress={() => setRpeModalVisible(true)}
                  style={{
                    backgroundColor: "#6879f8",
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 5,
                  }}
                >
                  <Text style={styles.modalTriggerText}>{rpe || "RPE"}</Text>
                  {/* Display selected RPE or "RPE" if none selected */}
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.addSetButton}>
              <Text style={styles.addSetText}>Add Set</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      {/* Cancel Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to discard the workout? All the data will be
              removed.
            </Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                onPress={cancelCancel}
                style={[styles.modalButton, styles.cancelButton]}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={confirmCancel}
                style={[styles.modalButton, styles.confirmButton]}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Set Type Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={typeModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => handleSetTypeSelection("Working")}>
              <Text style={styles.modalOption}>Working</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSetTypeSelection("Warm Up")}>
              <Text style={styles.modalOption}>Warm Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSetTypeSelection("Failure")}>
              <Text style={styles.modalOption}>Failure</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* RPE Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={rpeModalVisible}
        onRequestClose={() => setRpeModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => handleRpeSelection("6")}>
              <Text style={styles.modalOption}>6</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRpeSelection("7")}>
              <Text style={styles.modalOption}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRpeSelection("7.5")}>
              <Text style={styles.modalOption}>7.5</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRpeSelection("8")}>
              <Text style={styles.modalOption}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRpeSelection("8.5")}>
              <Text style={styles.modalOption}>8.5</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRpeSelection("9")}>
              <Text style={styles.modalOption}>9</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRpeSelection("9.5")}>
              <Text style={styles.modalOption}>9.5</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRpeSelection("10")}>
              <Text style={styles.modalOption}>10</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    position: "fixed",
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
  durationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    position: "fixed",
  },
  durationTextContainer: {
    alignItems: "center",
  },
  durationLabelText: {
    fontSize: 16,
    color: "white",
  },
  durationValueText: {
    fontSize: 14,
    color: "white",
    fontWeight: "200",
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
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
  setDefaultContainer: {
    backgroundColor: "#292a3e",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  setDefaultText: {
    width: 60, // Adjust the width as needed
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  setDefaultDetails: {
    width: 60, // Adjust the width as needed
    fontSize: 14,
    color: "white",
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
  modalText: {
    fontSize: 16,
    color: "white",
    marginBottom: 20,
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 100,
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: "#6879f8",
  },
  cancelButton: {
    backgroundColor: "#6879f8",
  },
  modalButtonText: {
    color: "white",
  },
});

export default WorkoutDetailsScreen;
