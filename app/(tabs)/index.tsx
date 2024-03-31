import { ScrollView, StyleSheet, View, Image } from "react-native";

import { ManropeText } from "@/components/StyledText";
import { useAuth } from "@/store/auth";
import { Link } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "@/constants/urls";
import { FontAwesome } from "@expo/vector-icons";

const links = [
  {
    title: "Publier une  annonce",
    icon: require("../../assets/images/files.png"),
    href: "/",
  },
  {
    title: "Trouver un service",
    icon: require("../../assets/images/calendar.png"),
    href: "/",
  },
];

const getTopRatedArtisans = async () => {
  try {
    const res = await axios.get(`${API_URL}/users/top-rated-artisans`);
    return res.data.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};
const getCategories = async () => {
  try {
    const res = await axios.get(`${API_URL}/categories`);
    return res.data.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};
export default function TabOneScreen() {
  const user = useAuth.use.user();
  const { data: topRatedArtisans } = useQuery({
    queryKey: ["topRatedArtisans"],
    queryFn: getTopRatedArtisans,
  });
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <ManropeText style={styles.hi} weight={400}>
            Bienvenue ! 👋
          </ManropeText>
          <ManropeText style={styles.fullName} weight={600}>
            {`${user?.firstname} ${user?.lastname}`}
          </ManropeText>
        </View>
        <Image
          source={
            user?.imgUrl
              ? { uri: user.imgUrl }
              : require("../../assets/images/default-avatar.png")
          }
          style={styles.userImg}
        />
      </View>
      <ManropeText style={styles.questionText} weight={700}>
        Quels prestataires de services choisiriez-vous aujourd'hui ?
      </ManropeText>
      <ManropeText style={styles.connectText} weight={400}>
        Connectez-vous avec le fournisseur de services le plus talentueux et
        professionnel autour de vous.
      </ManropeText>
      <ScrollView
        contentContainerStyle={styles.links}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {links.map((link, index) => (
          <View key={index} style={styles.link}>
            <Image source={link.icon} style={styles.linkIcon} />
            <ManropeText style={styles.linkText} weight={400}>
              {link.title}
            </ManropeText>
          </View>
        ))}
      </ScrollView>
      <ManropeText style={styles.questionText} weight={700}>
        Top Rated
      </ManropeText>
      <ScrollView
        contentContainerStyle={styles.links}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {topRatedArtisans?.map((user, index) => (
          <View key={user.id} style={styles.userLink}>
            <Image
              source={
                user.imgUrl
                  ? { uri: user.imgUrl }
                  : require("../../assets/images/default-avatar.png")
              }
              style={styles.userLinkIcon}
            />
            <ManropeText style={styles.userLinkName} weight={400}>
              {user.firstname} {user.lastname}
            </ManropeText>
            <ManropeText style={styles.userLinkJob} weight={400}>
              {user.jobTitle || "Artisan"}
            </ManropeText>
            <View style={styles.userLinkRating}>
              {Array.from({ length: 5 }, (_, i) =>
                i < Math.floor(user.average_rating) ? (
                  <FontAwesome name="star" size={15} color="#FED666" />
                ) : (
                  <FontAwesome name="star" size={15} color="#9DA499" />
                )
              )}
            </View>
          </View>
        ))}
      </ScrollView>
      <ScrollView
        contentContainerStyle={styles.links}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {categories.map((category, index) => (
          <Link key={category.id} href={`/categories/${category.id}`}>
            <ManropeText style={styles.linkText} weight={400}>
              {category.name}
            </ManropeText>
          </Link>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: "100%",
    backgroundColor: "#F9F9F7",
    paddingHorizontal: 20,
    paddingVertical: 80,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  hi: {
    fontSize: 16,
    color: "#2E74AB",
  },
  fullName: {
    fontSize: 22,
    color: "#9DA499",
  },
  userImg: {
    width: 60,
    height: 60,
    borderRadius: 20,
  },
  questionText: {
    fontSize: 22,
    color: "#2E74AB",
    marginTop: 20,
  },
  connectText: {
    fontSize: 14,
    color: "#9DA499",
    marginTop: 10,
  },
  links: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    marginTop: 20,
  },
  link: {
    display: "flex",
    // alignItems: "center",
    backgroundColor: "white",
    flexDirection: "row",
    padding: 15,
    borderRadius: 20,
  },
  linkIcon: {
    width: 33,
    height: 33,
    objectFit: "cover",
    aspectRatio: 1,
    borderRadius: 20,
  },
  linkText: {
    fontSize: 14,
    color: "#2E74AB",
    marginTop: 10,
  },
  userLink: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    padding: 25,
    borderRadius: 20,
  },
  userLinkIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  userLinkName: {
    fontSize: 14,
    marginTop: 10,
  },
  userLinkJob: {
    fontSize: 12,
    color: "#9DA499",
  },
  userLinkRating: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    marginTop: 10,
  },
});
