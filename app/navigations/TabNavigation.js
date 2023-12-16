import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Settings from "../screens/Settings";
import { Ionicons, FontAwesome5, Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import HomeScreen from "../screens/HomeScreen";
import { StyleSheet } from "react-native";
import ExercisesScreen from "../screens/ExercisesScreen";
import ProfileScreen from "../screens/ProfileScreen";

export default function TabNavigation() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#161a22",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          tabBarActiveTintColor: "white",
          tabBarStyle: {
            backgroundColor: "#161a22",
            borderTopWidth: 0,
          },
        }}
      />
      <Tab.Screen
        name="Exercises"
        component={ExercisesScreen}
        options={{
          tabBarLabel: "Exercises",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="dumbbell" color={color} size={size} />
          ),
          tabBarActiveTintColor: "white",
          tabBarStyle: {
            backgroundColor: "#161a22",
            borderTopWidth: 0,
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
          tabBarActiveTintColor: "white",
          tabBarStyle: {
            backgroundColor: "#161a22",
            borderTopWidth: 0,
          },
        }}
      />
    </Tab.Navigator>
  );
}
