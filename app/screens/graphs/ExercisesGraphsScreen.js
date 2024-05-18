import { StatusBar } from "react-native";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { AntDesign } from "@expo/vector-icons";
import OneRepMaxComponent from "../../components/ui/OneRepMax";

export default function ExercisesGraphsScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#161a22",
        paddingTop: 52,
        paddingHorizontal: 10,
      }}
    >
      <StatusBar backgroundColor="#161a22" color="white" style="light" />
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{ color: "white", fontSize: 20 }}>Exercises</Text>
        <View style={{ width: 24 }}></View>
      </View>
      <View style={{ marginTop: 40, paddingHorizontal: 10 }}>
        <OneRepMaxComponent />
      </View>
    </ScrollView>
  );
}
