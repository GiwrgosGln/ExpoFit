import React, { useState, useEffect } from "react";
import { LineChart } from "react-native-gifted-charts";
import { View, Text, TouchableOpacity, Modal, Alert } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";

export default function BodyWeightChart({ refresh }) {
  // State variables to hold measurement data
  const [measurements, setMeasurements] = useState([]);
  const uid = useSelector((state) => state.auth.uid);
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMeasurementId, setSelectedMeasurementId] = useState("");

  // Fetch data for the bodyweight graph
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://ginfitapi.onrender.com/measurements/${uid}`
        );
        const data = await response.json();
        setMeasurements(data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setMeasurements([]);
      }
    };

    fetchData();
  }, [uid, isFocused, refresh, modalVisible]);

  // Function to find the latest date and weight
  const findLatestData = () => {
    if (measurements.length > 0) {
      const latestDataPoint = measurements[measurements.length - 1];
      return { date: latestDataPoint.date, value: latestDataPoint.body_weight };
    } else {
      return { date: "", value: "" };
    }
  };

  // State variables to hold selected date and value
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  // Set the latest date and weight as default values
  useEffect(() => {
    const { date, value } = findLatestData();
    setSelectedDate(date);
    setSelectedValue(value);
  }, [measurements]);

  const openModal = (itemId) => {
    console.log("Selected Measurement ID:", itemId);
    setSelectedMeasurementId(itemId);
    setModalVisible(true);
  };

  const handleDeleteMeasurement = async () => {
    try {
      const response = await fetch(
        `https://ginfitapi.onrender.com/delete-measurement/${selectedMeasurementId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setModalVisible(false);
      } else {
        Alert.alert("Failed to delete measurement");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Failed to delete measurement");
    }
  };

  return (
    <View>
      <View
        style={{ backgroundColor: "#292a3e", width: 350, borderRadius: 10 }}
      >
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: 200 }}>
            {selectedDate.slice(0, 10)}
          </Text>
          <Text style={{ color: "white", fontSize: 24 }}>{selectedValue}</Text>
        </View>
        <LineChart
          data={measurements.map((item) => ({
            date: item.date.slice(0, 10),
            value: item.body_weight,
            dataPointText: item.body_weight.toString(),
          }))}
          width={325}
          height={120}
          spacing={50}
          scrollToEnd={true}
          initialSpacing={30}
          endSpacing={30}
          pointerConfig={{
            pointerStripHeight: 160,
            pointerStripColor: "#6879f8",
            pointerStripWidth: 1,
            pointerColor: "#6879f8",
            radius: 6,
            pointerLabelWidth: 100,
            activatePointersOnLongPress: true,
            autoAdjustPointerLabelPosition: false,
            pointerLabelComponent: (items) => {
              // Update selected date and value when hovering over a data point
              setSelectedDate(items[0].date);
              setSelectedValue(items[0].value);
              return (
                <View
                  style={{
                    height: 90,
                    width: 100,
                    justifyContent: "center",
                    marginTop: -30,
                    marginLeft: -40,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 14,
                      marginBottom: 6,
                      textAlign: "center",
                    }}
                  >
                    {items[0].date}
                  </Text>
                  <View
                    style={{
                      paddingHorizontal: 14,
                      paddingVertical: 6,
                      borderRadius: 16,
                      backgroundColor: "white",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                      {"$" + items[0].value + ".0"}
                    </Text>
                  </View>
                </View>
              );
            },
          }}
          maxValue={200}
          startIndex1={0}
          textColor1="white"
          textShiftY={-8}
          textShiftX={-17}
          textFontSize={13}
          thickness={5}
          curved={true}
          dataPointsColor="white"
          startFillColor={"#161a22"}
          endFillColor={"#6879f8"}
          areaChart
          hideRules
          hideYAxisText
          hideAxesAndRules
          yAxisColor="#6879f8"
          verticalLinesColor="#6879f8"
          xAxisColor="#6879f8"
          color="#6879f8"
        />
      </View>

      {/* Map with measurements */}
      <View
        style={{
          marginTop: 20,
          marginBottom: 80,
          borderRadius: 10,
        }}
      >
        <View>
          {measurements.length > 0 ? (
            measurements
              .slice()
              .reverse()
              .map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 10,
                    backgroundColor: "#292a3e",
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 10,
                  }}
                  onPress={() => openModal(item._id)}
                >
                  <Text
                    style={{ fontSize: 18, color: "white", marginRight: 10 }}
                  >
                    {item.body_weight}
                  </Text>
                  <Text style={{ fontSize: 18, color: "white" }}>
                    {item.date.slice(0, 10)}
                  </Text>
                </TouchableOpacity>
              ))
          ) : (
            <Text style={{ color: "white", textAlign: "center" }}>
              No measurements available.
            </Text>
          )}
        </View>
      </View>

      {/* Modal for confirming deletion */}
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
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              width: "80%",
            }}
          >
            <Text style={{ fontSize: 20, marginBottom: 20 }}>
              Delete Measurement
            </Text>
            <Text style={{ marginBottom: 20 }}>
              Do you want to delete the measurement?
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#007bff",
                  padding: 10,
                  borderRadius: 5,
                  alignItems: "center",
                  width: "40%",
                }}
                onPress={handleDeleteMeasurement}
              >
                <Text style={{ color: "white", fontSize: 16 }}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#ff4444",
                  padding: 10,
                  borderRadius: 5,
                  alignItems: "center",
                  width: "40%",
                }}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: "white", fontSize: 16 }}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
