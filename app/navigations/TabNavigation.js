import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  FontAwesome5,
  Foundation,
  Feather,
} from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import HomeScreen from "../screens/main/HomeScreen";
import RoutinesScreen from "../screens/main/RoutinesScreen";
import GraphsScreen from "../screens/main/GraphsScreen";
import ProfileScreen from "../screens/main/ProfileScreen";

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
        tabBarHideOnKeyboard: true,
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
          tabBarLabelStyle: {
            fontFamily: "Inter",
          },
          tabBarActiveTintColor: "white",
          tabBarStyle: {
            backgroundColor: "#161a22",
            borderTopWidth: 0,
            height: 50,
          },
        }}
      />
      <Tab.Screen
        name="Routines"
        component={RoutinesScreen}
        options={{
          tabBarLabel: "Routines",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="dumbbell" color={color} size={size} />
          ),
          tabBarLabelStyle: {
            fontFamily: "Inter",
          },
          tabBarActiveTintColor: "white",
          tabBarStyle: {
            backgroundColor: "#161a22",
            borderTopWidth: 0,
            height: 50,
          },
        }}
      />
      <Tab.Screen
        name="Graphs"
        component={GraphsScreen}
        options={{
          tabBarLabel: "Graphs",
          tabBarIcon: ({ color, size }) => (
            <Foundation name="graph-pie" color={color} size={size} />
          ),
          tabBarLabelStyle: {
            fontFamily: "Inter",
          },
          tabBarActiveTintColor: "white",
          tabBarStyle: {
            backgroundColor: "#161a22",
            borderTopWidth: 0,
            height: 50,
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
          tabBarLabelStyle: {
            fontFamily: "Inter",
          },
          tabBarActiveTintColor: "white",
          tabBarStyle: {
            backgroundColor: "#161a22",
            borderTopWidth: 0,
            height: 50,
          },
        }}
      />
    </Tab.Navigator>
  );
}
