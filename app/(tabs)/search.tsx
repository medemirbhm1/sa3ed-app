import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import { ManropeText } from "@/components/StyledText";
import { FontAwesome } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "@/constants/urls";
import { useDebounce } from "@uidotdev/usehooks";
import Rating from "@/components/Rating";
import { router } from "expo-router";

export default function search() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const { data: artisans } = useQuery({
    queryKey: ["artisansSearch", debouncedSearchText],
    queryFn: async () => {
      try {
        const response = await axios.post(`${API_URL}/users/artisans`, {
          searchText: debouncedSearchText,
        });
        return response.data.data;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
  });
  return (
    <ScrollView style={styles.container}>
      <ManropeText style={styles.title} weight={700}>
        Recherche
      </ManropeText>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(value) => {
            setSearchText(value);
          }}
          style={styles.input}
          placeholder="Rechercher"
        />
        <FontAwesome name="search" size={20} color="black" />
      </View>
      <View>
        {artisans?.map((artisan) => (
          <Pressable
            key={artisan.id}
            style={styles.userContainer}
            onPress={() => {
              router.push(`/profile-artisan/${artisan.id}`);
            }}
          >
            <Image source={{ uri: artisan.imgUrl }} style={styles.userImg} />
            <View>
              <ManropeText style={styles.userFullName} weight={600}>
                {artisan.lastname.concat(" ", artisan.firstname)}
              </ManropeText>
              <ManropeText style={styles.userCity} weight={400}>
                {artisan.city}
              </ManropeText>
              <Rating rating={4} />
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
    minHeight: "100%",
    backgroundColor: "#F9F9F7",
  },
  title: {
    fontSize: 30,
    color: "#2E74AB",
  },
  inputContainer: {
    marginTop: 30,
    marginBottom: 25,
    borderColor: "transparent",
    borderRadius: 12,
    borderWidth: 1.6,
    padding: 10,
    paddingLeft: 18,
    fontFamily: "Manrope_400Regular",
    backgroundColor: "#F5F3EF",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    borderColor: "transparent",
    fontFamily: "Manrope_400Regular",
    flex: 1,
  },
  userContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 25,
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userFullName: {
    fontSize: 16,
  },
  userCity: {
    fontSize: 14,
    color: "#9DA499",
    marginBottom: 5,
  },
});
