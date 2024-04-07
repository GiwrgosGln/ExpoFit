import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
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
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={days}
        nestedScrollEnabled={true}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            style={{
              alignItems: "center",
              backgroundColor: activeDay === item ? "#6879f8" : "#292a3e",
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 8,
              marginRight: 10,
              width: 60,
            }}
            onPress={() => handleDayPress(item)}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
              {item}
            </Text>
            <Text
              style={{
                fontSize: 20,
                marginTop: 5,
                color: "white",
                fontWeight: 700,
              }}
            >
              {currentDate.getDate() + index}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{
          paddingVertical: 10,
        }}
      />
    </View>
  );
};

export default WeeklyCalendar;
