import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import WorkoutsSummary from "../../components/Graphs/WorkoutSummary";

export default function GraphsScreen() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#161a22" color="white" style="light" />
      <Text style={{ color: "white", alignSelf: "center", fontSize: 20 }}>
        Graphs
      </Text>
      <WorkoutsSummary />
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
          <Text style={{ color: "white", alignSelf: "center", fontSize: 20 }}>
            Calendar
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
          <Text style={{ color: "white", alignSelf: "center", fontSize: 20 }}>
            Measurements
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161a22",
    paddingTop: 52,
  },
});
