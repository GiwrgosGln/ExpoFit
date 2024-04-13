import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet } from "react-native";

export default function GraphsScreen() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#161a22" color="white" style="light" />
      <Text style={{ color: "white", alignSelf: "center", fontSize: 20 }}>
        Graphs
      </Text>
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
