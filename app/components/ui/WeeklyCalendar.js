import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const WeeklyCalendar = ({ setSelectedDate }) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDate = new Date();
  const [activeDay, setActiveDay] = useState(days[currentDate.getDay()]); // Initialize with current day

  const handleDayPress = (day) => {
    setActiveDay(day);
    const selectedDate = new Date();
    const daysUntilSelectedDay = days.indexOf(day) - currentDate.getDay();
    selectedDate.setDate(currentDate.getDate() + daysUntilSelectedDay);
    setSelectedDate(selectedDate);
    console.log(`You pressed ${day}`);
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          paddingVertical: 10,
        }}
      >
        {days.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={{
              alignItems: "center",
              backgroundColor: activeDay === day ? "#6879f8" : "#292a3e",
              paddingHorizontal: 8,
              paddingVertical: 3,
              borderRadius: 5,
              width: 45,
            }}
            onPress={() => handleDayPress(day)}
          >
            <Text style={{ fontSize: 14, fontWeight: "bold", color: "white" }}>
              {day}
            </Text>
            <Text style={{ fontSize: 14, marginTop: 5, color: "white" }}>
              {currentDate.getDate() + index}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default WeeklyCalendar;
