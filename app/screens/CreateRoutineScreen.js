import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import useRoutineOrderStore from "../../state/routineOrderStore";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CreateRoutineScreen = ({ route }) => {
  const { selectedExercises } = route.params;
  const navigation = useNavigation();
  const routineOrderStore = useRoutineOrderStore();

  useEffect(() => {
    routineOrderStore.loadRoutineOrder();
  }, []);

  const saveRoutineOrder = async (order) => {
    try {
      routineOrderStore.setRoutineOrder(order);
    } catch (error) {
      console.error("Error saving routine order to storage:", error);
    }
  };

  const renderItem = ({ item, index, drag, isActive }) => (
    <TouchableOpacity
      style={{
        padding: 16,
        backgroundColor: isActive ? "skyblue" : "#eee",
        marginVertical: 8,
        borderRadius: 8,
      }}
      onLongPress={drag}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  const keyExtractor = (item) => item._id.toString();

  const onDragEnd = ({ data }) => {
    console.log("Drag End - Updated Order:", data);
    saveRoutineOrder(data);
  };

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        backgroundColor: "#161a22",
        paddingTop: 20,
        marginTop: 20,
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{ color: "white", fontSize: 24 }}>Create Routine</Text>
        <FontAwesome name="save" size={24} color="white" />
      </View>
      <DraggableFlatList
        data={routineOrderStore.routineOrder}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onDragEnd={onDragEnd}
        activationDistance={10}
        dragHitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
      />
    </View>
  );
};

export default CreateRoutineScreen;
