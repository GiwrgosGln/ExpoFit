import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import WeeklyWorkoutChart from "../../components/Graphs/WeeklyWorkoutChart";
import BodyWeightChart from "../../components/Graphs/BodyWeightChart";

export default function GraphsScreen() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#161a22" color="white" style="light" />
      <Text style={{ color: "white", alignSelf: "center", fontSize: 20 }}>
        Graphs
      </Text>
      <View
        style={{
          paddingHorizontal: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#292a3e",
            paddingVertical: 10,
            width: "48%",
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white", alignSelf: "center", fontSize: 18 }}>
            Statistics
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#292a3e",
            paddingVertical: 10,
            width: "48%",
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white", alignSelf: "center", fontSize: 18 }}>
            Measurements
          </Text>
        </TouchableOpacity>
      </View>
      <WeeklyWorkoutChart />

      <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
        <BodyWeightChart />
      </View>
    </View>
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
