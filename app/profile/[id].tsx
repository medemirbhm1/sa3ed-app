import { API_URL } from "@/constants/urls";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function Page() {
  const { id } = useLocalSearchParams();
  const { data } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      try {
        const res = await axios.post(`${API_URL}/users/${id}`);
        return res.data.data;
      } catch (err) {
        return null;
      }
    },
  });
  return (
    <View>
      <Text>Page</Text>
    </View>
  );
}
