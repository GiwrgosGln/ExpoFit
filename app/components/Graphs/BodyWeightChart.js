import { useState, useEffect } from "react";
import { LineChart } from "react-native-gifted-charts";
import { View, Text } from "react-native";

export default function BodyWeightChart() {
  const lineData = [
    { date: "2024-04-01", value: 70, dataPointText: "70" },
    { date: "2024-04-02", value: 20, dataPointText: "20" },
    { date: "2024-04-03", value: 18, dataPointText: "18" },
    { date: "2024-04-04", value: 40, dataPointText: "40" },
    { date: "2024-04-05", value: 36, dataPointText: "36" },
    { date: "2024-04-06", value: 60, dataPointText: "60" },
    { date: "2024-04-07", value: 54, dataPointText: "54" },
    { date: "2024-04-08", value: 85, dataPointText: "85" },
    { date: "2024-04-09", value: 85, dataPointText: "85" },
    { date: "2024-04-10", value: 85, dataPointText: "85" },
    { date: "2024-04-11", value: 85, dataPointText: "85" },
    { date: "2024-04-12", value: 85, dataPointText: "85" },
    { date: "2024-04-13", value: 85, dataPointText: "85" },
    { date: "2024-04-14", value: 70, dataPointText: "70" },
    { date: "2024-04-15", value: 20, dataPointText: "20" },
    { date: "2024-04-16", value: 18, dataPointText: "18" },
    { date: "2024-04-17", value: 40, dataPointText: "40" },
    { date: "2024-04-18", value: 36, dataPointText: "36" },
    { date: "2024-04-19", value: 60, dataPointText: "60" },
    { date: "2024-04-20", value: 54.5, dataPointText: "54.5" },
    { date: "2024-04-21", value: 78, dataPointText: "78" },
    { date: "2024-04-22", value: 79, dataPointText: "79" },
    { date: "2024-04-23", value: 80, dataPointText: "80" },
    { date: "2024-04-24", value: 82, dataPointText: "82" },
    { date: "2024-04-25", value: 84, dataPointText: "84" },
    { date: "2024-04-26", value: 85, dataPointText: "85" },
  ];

  // Function to find the latest date and weight
  const findLatestData = () => {
    const latestDataPoint = lineData[lineData.length - 1];
    return { date: latestDataPoint.date, value: latestDataPoint.value };
  };

  // State variables to hold selected date and value
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  // Set the latest date and weight as default values
  useEffect(() => {
    const { date, value } = findLatestData();
    setSelectedDate(date);
    setSelectedValue(value);
  }, []);

  return (
    <View style={{ backgroundColor: "#292a3e", width: 350 }}>
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
            {selectedDate}
          </Text>
        </View>
        <Text style={{ color: "white", fontSize: 24 }}>{selectedValue}</Text>
      </View>
      <LineChart
        initialSpacing={0}
        data={lineData}
        width={320}
        height={150}
        spacing={50}
        scrollToEnd={true}
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
        maxValue={120}
        startIndex1={0}
        textColor1="white"
        textShiftY={-8}
        textShiftX={-4}
        textFontSize={13}
        thickness={3}
        curved={true}
        isAnimated
        animationDuration={1600}
        hideRules
        hideYAxisText
        hideAxesAndRules
        yAxisColor="#6879f8"
        verticalLinesColor="#6879f8"
        xAxisColor="#6879f8"
        color="#6879f8"
      />
    </View>
  );
}
