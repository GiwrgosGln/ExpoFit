import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const SetType = ({ modalVisible, onClose, onSelectType }) => {
  if (!modalVisible) {
    return null; // Return null if modalVisible is false to hide the modal
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={() => onSelectType("Warm Up")}>
            <Text style={styles.modalOption}>Warm Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSelectType("Working")}>
            <Text style={styles.modalOption}>Working</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onSelectType("Failure")}>
            <Text style={styles.modalOption}>Failure</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    width: 200,
  },
  modalOption: {
    fontSize: 16,
    color: "white",
    marginBottom: 10,
    textAlign: "center", // Center align the text
  },
  closeButton: {
    fontSize: 16,
    color: "#6879f8",
    marginTop: 10,
    textAlign: "center",
  },
});

export default SetType;
