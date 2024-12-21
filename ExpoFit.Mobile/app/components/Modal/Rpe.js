import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Rpe = ({ modalVisible, onClose, onSelectRpe }) => {
  return (
    modalVisible && (
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={() => onSelectRpe("6")}>
            <Text style={styles.modalOption}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSelectRpe("7")}>
            <Text style={styles.modalOption}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSelectRpe("7.5")}>
            <Text style={styles.modalOption}>7.5</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSelectRpe("8")}>
            <Text style={styles.modalOption}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSelectRpe("8.5")}>
            <Text style={styles.modalOption}>8.5</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSelectRpe("9")}>
            <Text style={styles.modalOption}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSelectRpe("9.5")}>
            <Text style={styles.modalOption}>9.5</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSelectRpe("10")}>
            <Text style={styles.modalOption}>10</Text>
          </TouchableOpacity>
          {/* Add more options as needed */}
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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

export default Rpe;
