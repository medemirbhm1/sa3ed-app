import GoBackBtn from "@/components/GoBackBtn";
import Rating from "@/components/Rating";
import { ManropeText } from "@/components/StyledText";
import { API_URL } from "@/constants/urls";
import { useAuth } from "@/store/auth";
import { FontAwesome } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { View, ScrollView, StyleSheet, Image, Pressable } from "react-native";

export const getUserDetails = async (id: string | string[]) => {
  try {
    const res = await axios.get(`${API_URL}/users/clients/${id}`);
    console.log(res.data.data);
    return res.data.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default function Page() {
  const currentUser = useAuth.use.user();
  const { id } = useLocalSearchParams();
  const { data: user } = useQuery({
    queryKey: ["clients", id],
    queryFn: getUserDetails.bind(null, id),
  });
  return (
    <ScrollView style={styles.container}>
      <GoBackBtn />
      <View style={styles.header}>
        <Image source={{ uri: user?.imgUrl }} style={styles.userImg} />
        <View style={styles.headerRight}>
          <ManropeText style={styles.fullName} weight={600}>
            {user?.lastname.concat(" ", user?.firstname)}
          </ManropeText>
          <ManropeText style={styles.userCity} weight={400}>
            {user?.city}
          </ManropeText>
          <Rating rating={user?.rating} />
          {currentUser?.id !== user?.id ? (
            <></>
          ) : (
            <Pressable
              style={styles.button}
              onPress={() => {
                router.push(`profile/edit/${id}`);
              }}
            >
              <ManropeText style={styles.buttonText} weight={500}>
                Modifier
              </ManropeText>
            </Pressable>
          )}
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View>
          <ManropeText style={styles.statTitle} weight={700}>
            Total services
          </ManropeText>
          <ManropeText style={styles.statText} weight={400}>
            {user?.totalServices}
          </ManropeText>
        </View>
        <View>
          <ManropeText style={styles.statTitle} weight={700}>
            Total dépensé
          </ManropeText>
          <ManropeText style={styles.statText} weight={400}>
            {user?.totalSpent || 0} DA
          </ManropeText>
        </View>
      </View>
      {user?.description || "h" ? (
        <View>
          <ManropeText style={styles.sectionTitle} weight={700}>
            A propos
          </ManropeText>
          <ManropeText style={styles.description} weight={400}>
            {user?.description}
          </ManropeText>
        </View>
      ) : null}
      {user?.ratings?.length ? (
        <View>
          <ManropeText style={styles.sectionTitle} weight={700}>
            Avis
          </ManropeText>
          {user?.ratings.map((rating) => (
            <View key={rating.id} style={styles.ratingContainer}>
              <Image
                source={{ uri: rating.rater.imgUrl }}
                style={styles.ratingUserImg}
              />
              <View>
                <View style={styles.ratingUserFullName}>
                  <ManropeText
                    style={{
                      fontSize: 16,
                    }}
                    weight={600}
                  >
                    {rating.rater.lastname.concat(" ", rating.rater.firstname)}
                  </ManropeText>
                  <ManropeText weight={400}>
                    {rating.rating}{" "}
                    <FontAwesome name="star" size={15} color="#FED666" />
                  </ManropeText>
                </View>
                <ManropeText style={styles.description} weight={400}>
                  {rating.comment}
                </ManropeText>
              </View>
            </View>
          ))}
        </View>
      ) : null}
      <View
        style={{
          height: 100,
          width: "100%",
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F7",
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 20,
    gap: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  userImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  headerRight: {
    flex: 1,
  },
  fullName: {
    fontSize: 22,
  },
  userCity: {
    fontSize: 14,
    color: "#9DA499",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#2E74AB",
    textAlign: "center",
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 20,
    color: "#2E74AB",
    marginTop: 40,
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    color: "#444",
  },
  statsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  statTitle: {
    fontSize: 18,
    color: "#2E74AB",
    marginBottom: 5,
  },
  statText: {
    fontSize: 16,
    color: "#9DA499",
    textAlign: "center",
  },
  ratingContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  ratingUserImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  ratingUserFullName: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 5,
  },
});
