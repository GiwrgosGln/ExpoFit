import React from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";

const Filters = ({ selectedValue, onValueChange, items }) => (
  <View
    style={{
      flex: 1,
      borderRadius: 10,
      overflow: "hidden",
      height: 40,
      justifyContent: "center",
    }}
  >
    <Picker
      selectedValue={selectedValue}
      style={{
        backgroundColor: "#6879f8",
      }}
      onValueChange={(itemValue) => onValueChange(itemValue)}
      dropdownIconColor={"black"}
    >
      {items.map((item) => (
        <Picker.Item
          key={item.value}
          label={item.label}
          value={item.value}
          style={{ fontSize: 16, color: "black" }}
        />
      ))}
    </Picker>
  </View>
);

export default Filters;
