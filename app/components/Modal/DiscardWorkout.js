import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const DiscardWorkout = ({ modalVisible, onCancel, onConfirm }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onCancel}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            Are you sure you want to discard the workout? All the data will be
            removed.
          </Text>
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity
              onPress={onCancel}
              style={[styles.modalButton, styles.cancelButton]}
            >
              <Text style={styles.modalButtonText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onConfirm}
              style={[styles.modalButton, styles.confirmButton]}
            >
              <Text style={styles.modalButtonText}>Yes</Text>
            </TouchableOpacity>
          </View>
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

export default DiscardWorkout;
