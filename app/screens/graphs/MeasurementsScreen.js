import React, { useState } from "react";
import { StatusBar, Modal, TextInput, Alert } from "react-native";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import BodyWeightChart from "../../components/Graphs/BodyWeightChart";

export default function MeasurementsScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [weight, setWeight] = useState("");
  const [refresh, setRefresh] = useState(false);

  const handleAddMeasurement = async () => {
    try {
      const response = await fetch(
        "https://ginfitapi.onrender.com/create-measurement",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: "GFxKCRB3aBOTaownKuU0BRCYGxa2",
            body_weight: parseFloat(weight),
          }),
        }
      );
      if (response.ok) {
        setModalVisible(false);
        setRefresh(true);
      } else {
        // Handle error
        Alert.alert("Failed to add measurement");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Failed to add measurement");
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#161a22",
        paddingTop: 52,
        paddingHorizontal: 10,
      }}
    >
      <StatusBar backgroundColor="#161a22" color="white" style="light" />
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{ color: "white", fontSize: 20 }}>Measurements</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="add-circle-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
        <BodyWeightChart refresh={refresh} />
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "#292a3e",
              padding: 20,
              borderRadius: 10,
              width: "80%",
            }}
          >
            <Text style={{ fontSize: 20, marginBottom: 20, color: "white" }}>
              Add Measurement
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
                padding: 10,
                marginBottom: 20,
                color: "white",
              }}
              placeholder="Enter weight"
              placeholderTextColor={"white"}
              keyboardType="numeric"
              value={weight}
              onChangeText={(text) => setWeight(text)}
            />
            <TouchableOpacity
              style={{
                backgroundColor: "#6879f8",
                padding: 10,
                borderRadius: 5,
                alignItems: "center",
              }}
              onPress={handleAddMeasurement}
            >
              <Text style={{ color: "white", fontSize: 16 }}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
