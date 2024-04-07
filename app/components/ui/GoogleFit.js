import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import google_fit from "../../../assets/images/google_fit.png";

const GoogleFit = () => {
  return (
    <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
      <TouchableOpacity
        style={{
          backgroundColor: "#292a3e",
          padding: 20,
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image source={google_fit} style={{ width: 70, height: 70 }} />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Google Fit Integration
          </Text>
          <Text
            style={{
              color: "#fff",
              fontSize: 14,
            }}
          >
            Connect Google Fit to track your fitness activities and view
            detailed stats.
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default GoogleFit;
