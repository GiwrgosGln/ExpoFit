import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import WeeklyWorkoutChart from "../../components/Graphs/WeeklyWorkoutChart";
import BodyWeightChart from "../../components/Graphs/BodyWeightChart";
import OneRepMaxComponent from "../../components/ui/OneRepMax";

export default function GraphsScreen() {
  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="#161a22" color="white" style="light" />
      <Text style={{ color: "white", alignSelf: "center", fontSize: 20 }}>
        Graphs
      </Text>
      <WeeklyWorkoutChart />

      <View
        style={{
          paddingHorizontal: 10,
          marginTop: 20,
          gap: 20,
          marginBottom: 70,
        }}
      >
        <BodyWeightChart />
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
