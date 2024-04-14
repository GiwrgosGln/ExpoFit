import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

export default function WeeklyWorkoutChart() {
  const [workoutData, setWorkoutData] = useState({});
  const uid = useSelector((state) => state.auth.uid);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchWorkoutData = async () => {
      try {
        const response = await fetch(
          `https://ginfitapi.onrender.com/workouts-last5weeks/${uid}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch workout data");
        }
        const data = await response.json();
        setWorkoutData(data);
      } catch (error) {
        console.error("Error fetching workout data:", error);
      }
    };

    fetchWorkoutData();
  }, [uid, isFocused]);

  // Format date to "DD/MM" format
  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day.padStart(2, "0")}/${month.padStart(2, "0")}`;
  };

  // Transform workoutData into the desired format for barData
  const barData = Object.values(workoutData).map((value) => ({
    value: value,
    topLabelComponent: () => <Text style={{ color: "white" }}>{value}</Text>,
  }));

  // Get the dates from the response object and format them for the X-axis labels
  const xAxisLabels = Object.keys(workoutData).map((date) => formatDate(date));

  return (
    <View
      style={{
        padding: 10,
        marginHorizontal: 10,
        marginTop: 20,
        backgroundColor: "#292a3e",
        borderRadius: 5,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "white", fontSize: 18, alignSelf: "center" }}>
          Frequency
        </Text>
        <Text style={{ color: "white", fontSize: 18, alignSelf: "center" }}>
          Last 5 Weeks
        </Text>
      </View>

      <BarChart
        frontColor={"#6879f8"}
        barWidth={35}
        disableScroll={true}
        data={barData} // Pass the transformed barData to the BarChart
        dashWidth={0}
        isAnimated
        maxValue={8}
        height={100}
        width={280}
        barTopLabelColor={"white"} // Set color for the number on top of the bars
        barTopLabelTexts={Object.values(workoutData).map((data) =>
          data.toString()
        )} // Use the values as labels on top of the bars
        xAxisLabelTexts={xAxisLabels}
        xAxisColor={"#292a3e"}
        yAxisColor={"#292a3e"}
        yAxisTextStyle={{ color: "#292a3e" }}
        xAxisLabelTextStyle={{ color: "white" }}
        topLabelTextStyle={{ color: "white" }}
      />
      <Text
        style={{
          color: "white",
          alignSelf: "center",
          marginTop: 20,
          fontSize: 18,
        }}
      >
        Workouts Per Week
      </Text>
    </View>
  );
}
