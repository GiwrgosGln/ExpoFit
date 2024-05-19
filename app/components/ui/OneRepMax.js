import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { Picker } from "@react-native-picker/picker";
import { useSelector } from "react-redux";
import exerciseData from "../../../data/exercises.json";

const OneRepMaxComponent = () => {
  const [lineData, setLineData] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState("Select Exercise");
  const uid = useSelector((state) => state.auth.uid);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://ginfitapi.onrender.com/one-rep-max?userid=${uid}&exercise=${selectedExercise}`
        );
        const data = await response.json();
        console.log("API Response:", data);
        if (data && data.length > 0) {
          // Check if data is not null or empty
          const formattedData = data.map(({ date, max }) => ({
            date,
            value: max,
            dataPointText: `${max.toFixed(2)}`,
          }));

          // Sort the formattedData array by date
          formattedData.sort((a, b) => new Date(a.date) - new Date(b.date));

          console.log("Formatted Data:", formattedData);
          setLineData(formattedData);

          // Extracting dates from the sorted data to use as x-axis labels
          const xLabels = formattedData.map(({ date }) => {
            const [year, month, day] = date.split("-");
            return (
              <Text style={{ color: "white", fontSize: 12 }}>
                {day}/{month}
              </Text>
            );
          });

          // Set the xLabels state
          setXLabels(xLabels);
        } else {
          console.error("Error: Response data is null or empty.");
          // If data is null or empty, set lineData to an empty array
          setLineData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (selectedExercise !== "Select Exercise") {
      fetchData();
    }
  }, [selectedExercise, uid]);

  // Define xLabels state
  const [xLabels, setXLabels] = useState([]);

  const exerciseOptions = [
    "Select Exercise",
    ...exerciseData.map((exercise) => exercise.name),
  ];

  return (
    <View style={{ backgroundColor: "#292a3e" }}>
      <Picker
        selectedValue={selectedExercise}
        style={{
          color: "white",
          width: 350,
          backgroundColor: "#292a3e",
          height: 10,

          borderRadius: 10,
        }}
        onValueChange={(itemValue, itemIndex) => setSelectedExercise(itemValue)}
      >
        {exerciseOptions.map((exercise, index) => (
          <Picker.Item
            key={index}
            label={exercise}
            value={exercise}
            color={index === 0 ? "#7e7e7e" : "black"}
          />
        ))}
      </Picker>

      {selectedExercise === "Select Exercise" ? (
        <View
          style={{
            backgroundColor: "#292a3e",
            width: 350,
            height: 250,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              textAlign: "center",
              fontWeight: 100,
              paddingHorizontal: 50,
            }}
          >
            Select an Exercise to check your one rep max
          </Text>
        </View>
      ) : lineData.length === 0 ? (
        <View
          style={{
            backgroundColor: "#292a3e",
            width: 350,
            height: 250,
            marginTop: 20,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              textAlign: "center",
              fontWeight: 100,
              paddingHorizontal: 50,
              marginBottom: 80,
            }}
          >
            No data for this exercise
          </Text>
        </View>
      ) : (
        <View
          style={{
            backgroundColor: "#292a3e",
            width: 350,
            height: 260,
            marginTop: 20,

            borderRadius: 10,
          }}
        >
          <LineChart
            data={lineData}
            width={325}
            height={120}
            spacing={50}
            scrollToEnd={true}
            initialSpacing={30}
            endSpacing={30}
            xAxisLabelTexts={xLabels}
            maxValue={400}
            startIndex1={0}
            textColor1="white"
            textShiftY={-8}
            textShiftX={-17}
            textFontSize={13}
            thickness={5}
            curved={true}
            dataPointsColor="white"
            isAnimated
            animationDuration={1600}
            startFillColor={"#161a22"}
            endFillColor={"#6879f8"}
            areaChart
            hideRules
            hideYAxisText
            hideAxesAndRules
            color="#6879f8"
            xAxisLabelContainerStyle={(color = "red")}
            rotateLabel
          />
          <Text
            style={{
              marginTop: 30,
              alignSelf: "center",
              color: "white",
              fontSize: 18,
            }}
          >
            One Rep Max
          </Text>
        </View>
      )}
    </View>
  );
};

export default OneRepMaxComponent;
