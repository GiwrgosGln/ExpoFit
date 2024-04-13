import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WeeklyWorkoutChart from "./WeeklyWorkoutChart";
import { useIsFocused } from "@react-navigation/native";

const WorkoutsSummary = () => {
  const [workouts, setWorkouts] = useState([]);
  const uid = useSelector((state) => state.auth.uid);
  const [workoutsLast5Weeks, setWorkoutsLast5Weeks] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(
          `https://ginfitapi.onrender.com/workouts/${uid}`
        );
        if (response.ok) {
          const data = await response.json();
          setWorkouts(data);
        } else {
          console.error("Error fetching workouts:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchWorkouts();
  }, [uid, isFocused]);

  const calculateWorkoutsLast5Weeks = () => {
    const today = new Date();
    const last5Weeks = [];
    for (let i = 0; i < 5; i++) {
      const previousMondayPlusTwoDays = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - today.getDay() - 7 * i + 2
      );
      last5Weeks.push(previousMondayPlusTwoDays.toISOString().split("T")[0]);
    }

    const workoutsLast5Weeks = [];

    last5Weeks.forEach((monday) => {
      const nextMonday = new Date(monday);
      nextMonday.setDate(nextMonday.getDate() + 7);

      const workoutsInWeek = workouts.filter((workout) => {
        const workoutDate = new Date(workout.date);
        return workoutDate >= new Date(monday) && workoutDate < nextMonday;
      });

      workoutsLast5Weeks.push(workoutsInWeek.length);
    });

    console.log("Workouts in the last 5 weeks:", workoutsLast5Weeks);
    setWorkoutsLast5Weeks(workoutsLast5Weeks);
  };

  useEffect(() => {
    if (workouts.length > 0) {
      calculateWorkoutsLast5Weeks();
    }
  }, [workouts]);

  return <WeeklyWorkoutChart workoutData={workoutsLast5Weeks} />;
};

export default WorkoutsSummary;
