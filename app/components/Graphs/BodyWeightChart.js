import React, { useState, useEffect } from "react";
import { LineChart } from "react-native-gifted-charts";
import { View, Text, TouchableOpacity } from "react-native";

export default function BodyWeightChart() {
  // State variables to hold measurement data
  const [measurements, setMeasurements] = useState([]);

  // Fetch data from the endpoint
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://ginfitapi.onrender.com/measurements/GFxKCRB3aBOTaownKuU0BRCYGxa2"
        );
        const data = await response.json();
        setMeasurements(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
          <View style={{ alignItems: "flex-start", flexDirection: "column" }}>
            <Text style={{ color: "white", fontSize: 18 }}>Bodyweight</Text>
            <Text style={{ color: "white", fontSize: 18, fontWeight: 200 }}>
              {selectedDate.slice(0, 10)}
            </Text>
          </View>
          <Text style={{ color: "white", fontSize: 24 }}>{selectedValue}</Text>
        </View>
        <LineChart
          initialSpacing={0}
          data={measurements.map((item) => ({
            date: item.date.slice(0, 10),
            value: item.body_weight,
            dataPointText: item.body_weight.toString(),
          }))}
          width={325}
          height={120}
          spacing={50}
          scrollToEnd={true}
          endSpacing={0}
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
          {measurements
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
              >
                <Text style={{ fontSize: 18, color: "white", marginRight: 10 }}>
                  {item.body_weight}
                </Text>
                <Text style={{ fontSize: 18, color: "white" }}>
                  {item.date.slice(0, 10)}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>
    </View>
  );
}
