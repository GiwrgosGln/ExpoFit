import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  NestableScrollContainer,
  NestableDraggableFlatList,
} from "react-native-draggable-flatlist";

const DraggableFlatList = () => {
  const initialData1 = Array.from({ length: 5 }, (_, index) => ({
    key: `item1-${index}`,
    label: `Item 1 - ${index + 1}`,
  }));

  const initialData2 = Array.from({ length: 5 }, (_, index) => ({
    key: `item2-${index}`,
    label: `Item 2 - ${index + 1}`,
  }));

  const initialData3 = Array.from({ length: 5 }, (_, index) => ({
    key: `item3-${index}`,
    label: `Item 3 - ${index + 1}`,
  }));

  const [data1, setData1] = useState(initialData1);
  const [data2, setData2] = useState(initialData2);
  const [data3, setData3] = useState(initialData3);

  const renderItem = ({ item, index, drag, isActive }) => (
    <TouchableOpacity
      style={{
        padding: 16,
        backgroundColor: isActive ? "skyblue" : "#eee",
        marginVertical: 8,
        borderRadius: 8,
      }}
      onLongPress={() => {
        console.log("Long Pressed");
        drag();
      }}
    >
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );

  const keyExtractor = (item) => item.key;

  return (
    <NestableScrollContainer
      style={{
        flex: 1,
        width: "90%",
        marginVertical: 100,
        paddingHorizontal: 20,
      }}
    >
      <View>
        <Text style={{ color: "white" }}>List 1</Text>
      </View>
      <NestableDraggableFlatList
        data={data1}
        renderItem={({ item, index, drag, isActive }) =>
          renderItem({ item, index, drag, isActive })
        }
        keyExtractor={keyExtractor}
        onDragEnd={({ data }) => setData1(data)}
      />
      <View>
        <Text>List 2</Text>
      </View>
      <NestableDraggableFlatList
        data={data2}
        renderItem={({ item, index, drag, isActive }) =>
          renderItem({ item, index, drag, isActive })
        }
        keyExtractor={keyExtractor}
        onDragEnd={({ data }) => setData2(data)}
      />
      <View>
        <Text>List 3</Text>
      </View>
      <NestableDraggableFlatList
        data={data3}
        renderItem={({ item, index, drag, isActive }) =>
          renderItem({ item, index, drag, isActive })
        }
        keyExtractor={keyExtractor}
        onDragEnd={({ data }) => setData3(data)}
      />
    </NestableScrollContainer>
  );
};

export default DraggableFlatList;
