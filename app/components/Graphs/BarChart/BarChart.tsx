import {
  Canvas,
  Path,
  runTiming,
  Skia,
  Text,
  useComputedValue,
  useValue,
  useFont,
} from "@shopify/react-native-skia";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Easing, Button } from "react-native";
import { useSelector } from "react-redux";

import * as d3 from "d3";

const GRAPH_MARGIN = 20;
const CanvasHeight = 200;
const CanvasWidth = 350;
const graphHeight = CanvasHeight - 2 * GRAPH_MARGIN;
const graphWidth = CanvasWidth - 2;

interface RootState {
  auth: {
    uid: string;
  };
}

export const BarChart = () => {
  const animationState = useValue(0);
  const font = useFont(require("../../../../assets/fonts/Roboto-Bold.ttf"), 10);
  const [workoutData, setWorkoutData] = useState([]);

  // Fetch data from the API
  const uid = useSelector((state: RootState) => state.auth.uid);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://ginfitapi.onrender.com/workouts/${uid}`
        );
        const data = await response.json();
        setWorkoutData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [uid]);

  // Calculate the number of workouts in the last 5 weeks
  const currentDate = new Date();
  const fiveWeeksAgo = new Date(
    currentDate.getTime() - 5 * 7 * 24 * 60 * 60 * 1000
  ); // 5 weeks ago
  const lastFiveWeeksData = workoutData.filter(
    (workout) => new Date(workout.date) >= fiveWeeksAgo
  );

  // Aggregate data by week
  const dataByWeek = d3.rollup(
    lastFiveWeeksData,
    (v) => v.length,
    (d) => d3.timeWeek.floor(new Date(d.date))
  );

  const weeklyData = Array.from(dataByWeek, ([date, workoutCount]) => ({
    date,
    workoutCount,
  }));

  // Sort weeklyData by date in ascending order
  weeklyData.sort((a, b) => a.date.getTime() - b.date.getTime());

  const xDomain = weeklyData.map((d) => d.date);
  const xRange = [0, graphWidth];
  const x = d3
    .scaleBand()
    .domain(xDomain.map((d) => d.toISOString())) // Convert dates to ISO strings for compatibility
    .range([0, graphWidth])
    .padding(0.1); // Adjust the padding as needed

  const yDomain = [
    0,
    d3.max(weeklyData, (dataPoint) => dataPoint.workoutCount) || 0,
  ];

  const yRange = [0, graphHeight];
  const y = d3.scaleLinear().domain(yDomain).range(yRange);

  const animate = () => {
    animationState.current = 0;

    runTiming(animationState, 1, {
      duration: 1600,
      easing: Easing.inOut(Easing.exp),
    });
  };

  const path = useComputedValue(() => {
    const newPath = Skia.Path.Make();

    weeklyData.forEach((dataPoint) => {
      const rect = Skia.XYWHRect(
        x(dataPoint.date.toISOString())!,
        graphHeight,
        x.bandwidth(),
        y(dataPoint.workoutCount * animationState.current) * -1
      );

      const rrect = Skia.RRectXY(rect, 8, 8);
      newPath.addRRect(rrect);
    });

    return newPath;
  }, [animationState]);

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    return `${day} ${month}`;
  };

  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas}>
        <Path path={path} color="#6879f8" />
        {weeklyData.map((dataPoint) => (
          <React.Fragment key={dataPoint.date.toString()}>
            <Text
              font={font}
              x={x(dataPoint.date.toISOString())! + x.bandwidth() / 2 - 14}
              y={CanvasHeight - 25}
              text={formatDate(dataPoint.date)}
              color="white"
            />
            <Text
              font={font}
              x={x(dataPoint.date.toISOString())! + x.bandwidth() / 2 - 20}
              y={CanvasHeight - 10}
              text={String(dataPoint.workoutCount + " workouts")}
              color="white"
            />
          </React.Fragment>
        ))}
      </Canvas>
      <Button title="Animate!" onPress={animate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#161a22",
  },
  canvas: {
    height: CanvasHeight,
    width: CanvasWidth,
  },
});
