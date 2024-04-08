import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

const WeeklyCalendar = ({ setSelectedDate }) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const currentDate = new Date();
  const currentDayIndex = (currentDate.getDay() + 6) % 7;
  const [activeDay, setActiveDay] = useState(days[currentDayIndex]);

  const handleDayPress = (day) => {
    setActiveDay(day);
    const selectedDate = new Date(currentDate);
    const daysUntilSelectedDay = (days.indexOf(day) - currentDayIndex + 7) % 7;
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
                fontWeight: "700", // Changed to string since React Native doesn't support numeric fontWeight
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
