import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import WeeklyWorkoutChart from "../../components/Graphs/WeeklyWorkoutChart";
import BodyWeightChart from "../../components/Graphs/BodyWeightChart";
import OneRepMaxComponent from "../../components/ui/OneRepMax";
import { useNavigation } from "@react-navigation/core";

export default function GraphsScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="#161a22" color="white" style="light" />
      <Text style={{ color: "white", alignSelf: "center", fontSize: 20 }}>
        Graphs
      </Text>
      <WeeklyWorkoutChart />
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#292a3e",
            width: "46%",
            paddingVertical: 10,
            borderRadius: 5,
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("Measurements")}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Measurements</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#292a3e",
            width: "46%",
            paddingVertical: 10,
            borderRadius: 5,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Exercises</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          marginTop: 20,
          gap: 20,
          marginBottom: 70,
        }}
      >
        <OneRepMaxComponent />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161a22",
    paddingTop: 52,
    paddingHorizontal: 10,
  },
});
