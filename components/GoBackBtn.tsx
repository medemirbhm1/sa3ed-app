import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable } from "react-native";

export default function GoBackBtn() {
  return (
    <Pressable
      onPress={() => {
        router.back();
      }}
    >
      <FontAwesome name="chevron-left" color="#2E74AB" size={25} />
    </Pressable>
  );
}
