import { StatusBar } from "expo-status-bar";
import { useColorScheme, LogBox } from "react-native";
import { TamaguiProvider, Theme, YStack } from "tamagui";
import { useFonts } from "expo-font";
import config from "./tamagui.config";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigation from "./app/navigations/TabNavigation";
import LoginScreen from "./app/screens/auth/LoginScreen";
import RegisterScreen from "./app/screens/auth/RegisterScreen";
import AdditionalInfoScreen from "./app/screens/auth/AdditionalInfoScreen";
import SelectExercisesScreen from "./app/screens/exercises/SelectExercisesScreen";
import CreateRoutineScreen from "./app/screens/routines/CreateRoutineScreen";
import AccountScreen from "./app/screens/settings/AccountScreen";
import NotificationsScreen from "./app/screens/settings/NotificationsScreen";
import FrequentlyAskedQuestionsScreen from "./app/screens/settings/FrequentlyAskedQuestionsScreen";
import { Provider } from "react-redux";
import store from "./app/redux/store/store";
import WorkoutDetailsScreen from "./app/screens/routines/WorkoutDetailsScreen";
import WorkoutScreen from "./app/screens/routines/WorkoutScreen";
import EditRoutineScreen from "./app/screens/routines/EditRoutineScreen";
import ContactSupportScreen from "./app/screens/settings/ContactSupportScreen";
import FeatureRequestScreen from "./app/screens/settings/FeatureRequestScreen";

const Stack = createStackNavigator();

export default function App() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });
  if (!loaded) {
    return null;
  }

  // Ignore log notification by message
  LogBox.ignoreLogs(["Warning: ..."]);

  //Ignore all log notifications
  LogBox.ignoreAllLogs();

  const MyTheme = {
    colors: {
      primary: "#f0f0f0",
      card: "#292a3e",
      text: "#f0f0f0",
    },
  };

  return (
    <TamaguiProvider config={config}>
      <Provider store={store}>
        <Theme name={colorScheme === "dark" ? "dark" : "dark"}>
          <YStack f={1} backgroundColor={"#161a22"}>
            <NavigationContainer theme={MyTheme}>
              <Stack.Navigator>
                <Stack.Screen
                  name="Login"
                  component={LoginScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Register"
                  component={RegisterScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="HomeStack"
                  component={TabNavigation}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="AdditionalInfo"
                  component={AdditionalInfoScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Exercises"
                  component={SelectExercisesScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="CreateRoutine"
                  component={CreateRoutineScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="EditRoutine"
                  component={EditRoutineScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="WorkoutDetails"
                  component={WorkoutDetailsScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Workout"
                  component={WorkoutScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Account"
                  component={AccountScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Notifications"
                  component={NotificationsScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="FrequentlyAskedQuestions"
                  component={FrequentlyAskedQuestionsScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ContactSupport"
                  component={ContactSupportScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="FeatureRequest"
                  component={FeatureRequestScreen}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </YStack>
        </Theme>
      </Provider>
    </TamaguiProvider>
  );
}
