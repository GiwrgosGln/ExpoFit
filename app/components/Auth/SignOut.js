import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { resetUser } from "../../redux/user/authSlice";
import { MaterialIcons } from "@expo/vector-icons";

export default function SignOut() {
  const auth = getAuth();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(resetUser());
        navigation.navigate("Login");
      })
      .catch((error) => alert(error.message));
  };

  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity onPress={handleSignOut}>
        <MaterialIcons name="logout" size={30} color="#ff6b6b" />
      </TouchableOpacity>
    </View>
  );
}
