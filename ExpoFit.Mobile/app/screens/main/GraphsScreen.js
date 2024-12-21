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
          flexDirection: "column",
          gap: 20,
          paddingHorizontal: 10,
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
