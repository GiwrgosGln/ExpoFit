import React from "react";
import { Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

export default function WeeklyWorkoutChart({ workoutData }) {
  console.log("Workout data:", workoutData);

  // Function to get the first day of the week for the last 5 weeks
  const getWeekStartDates = () => {
    const today = new Date();
    const weekStartDates = [];

    for (let i = 0; i < 5; i++) {
      const firstDayOfWeek = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - today.getDay() - i * 7
      );
      weekStartDates.push(firstDayOfWeek);
    }

    return weekStartDates.reverse(); // Reverse the array
  };

  // Format date to "DD/MM" format
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}`;
  };

  const weekStartDates = getWeekStartDates();

  // Reverse the workoutData array before passing it to the chart
  const reversedWorkoutData = [...workoutData].reverse();

  // Transform workoutData into the desired format for barData
  const barData = reversedWorkoutData.map((value) => ({
    value: value,
    topLabelComponent: () => <Text style={{ color: "white" }}>{value}</Text>,
  }));

  console.log("Bar data:", barData);

  return (
    <View
      style={{
        padding: 10,
        marginHorizontal: 10,
        marginTop: 20,
        backgroundColor: "#292a3e",
        borderRadius: 20,
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
        barTopLabelTexts={reversedWorkoutData.map((data) => data.toString())} // Use the values as labels on top of the bars
        xAxisLabelTexts={weekStartDates.map((date) => formatDate(date))}
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
