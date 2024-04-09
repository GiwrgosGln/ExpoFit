import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

const WeeklyCalendar = ({ setSelectedDate }) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const currentDate = new Date();
  const currentDayIndex = currentDate.getDay();
  const currentMondayDate = new Date(currentDate);
  const offset =
    currentMondayDate.getDate() -
    currentDayIndex +
    (currentDayIndex === 0 ? -6 : 1);
  currentMondayDate.setDate(offset);
  const [activeDay, setActiveDay] = useState(days[currentDayIndex - 1]);

  const handleDayPress = (day) => {
    setActiveDay(day);
    const selectedDate = new Date(currentMondayDate);
    const daysUntilSelectedDay =
      (days.indexOf(day) - days.indexOf("Mon") + 7) % 7;
    selectedDate.setDate(currentMondayDate.getDate() + daysUntilSelectedDay);
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
        renderItem={({ item, index }) => {
          const dayIndex = (currentDayIndex + index) % 7;
          const date = new Date(currentMondayDate);
          date.setDate(currentMondayDate.getDate() + index);

          return (
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
              <Text
                style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
              >
                {item}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  marginTop: 5,
                  color: "white",
                  fontWeight: "700",
                }}
              >
                {date.getDate()}
              </Text>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={{
          paddingVertical: 10,
        }}
      />
    </View>
  );
};

export default WeeklyCalendar;
