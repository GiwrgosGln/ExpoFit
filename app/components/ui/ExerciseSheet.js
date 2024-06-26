import React, { useRef, useEffect, useState } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { Image } from "expo-image";

const ExerciseSheet = ({ exercise, onClose }) => {
  const sheetRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (sheetRef.current) {
      sheetRef.current.snapToIndex(0);
    }
  }, [exercise]);

  const handleSheetChange = (index) => {
    console.log("handleSheetChange", index);
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <BottomSheet
      ref={sheetRef}
      index={0}
      snapPoints={["70%", "90%"]}
      enablePanDownToClose={true}
      onClose={() => onClose()}
      onChange={handleSheetChange}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          {...props}
        />
      )}
      backgroundStyle={{ backgroundColor: "#292a3e" }}
      handleIndicatorStyle={{ backgroundColor: "#6879f8" }}
    >
      <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
        <View
          style={{
            backgroundColor: "white",
            justifyContent: "center",
          }}
        >
          {exercise && exercise.gifurl ? (
            <>
              {loading && (
                <ActivityIndicator
                  style={{
                    position: "absolute",
                    alignSelf: "center",
                  }}
                  size="large"
                  color="#6879f8"
                />
              )}
              <Image
                source={{ uri: exercise.gifurl }}
                style={{
                  height: 250,
                  width: 250,
                  alignSelf: "center",
                  resizeMode: "contain",
                  zIndex: 200,
                }}
                onLoad={handleImageLoad}
              />
            </>
          ) : (
            <Text>No image available</Text>
          )}
        </View>
        <Text
          style={{
            color: "white",
            alignSelf: "center",
            marginTop: 10,
            fontSize: 30,
            marginHorizontal: 20,
            textAlign: "center",
            marginBottom: 5,
            fontFamily: "Inter",
          }}
        >
          {exercise.name}
        </Text>
        <Text
          style={{
            color: "white",
            alignSelf: "center",
            fontSize: 16,
            fontFamily: "Inter",
          }}
        >
          Target Muscle: {exercise.target}
        </Text>
        <View
          style={{
            gap: 20,
            paddingHorizontal: 20,
          }}
        >
          {exercise.instructions.map((instruction, index) => (
            <Text
              key={index}
              style={{ fontSize: 16, color: "white", fontFamily: "Inter" }}
            >
              {index + 1}. {instruction}
            </Text>
          ))}
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: "#292a3e",
    paddingBottom: 20,
  },
});

export default ExerciseSheet;
