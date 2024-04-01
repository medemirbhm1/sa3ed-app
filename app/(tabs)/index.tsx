import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Pressable,
  FlatList,
} from "react-native";

import { ManropeText } from "@/components/StyledText";
import { useAuth } from "@/store/auth";
import { Link, router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "@/constants/urls";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const links = [
  {
    title: "Publier une  annonce",
    icon: require("../../assets/images/files.png"),
    href: "/hello",
  },
  {
    title: "Trouver un service",
    icon: require("../../assets/images/calendar.png"),
    href: "/world",
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
    const res = await axios.get(`${API_URL}/services/categories`);
    return res.data.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getServices = async () => {
  try {
    const res = await axios.get(`${API_URL}/services`);
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
    queryKey: ["serviceCategories"],
    queryFn: getCategories,
  });
  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });
  console.log(services);
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
        <Pressable
          onPress={() => {
            router.push(`/profile/${user?.id}`);
          }}
        >
          <Image
            source={
              user?.imgUrl
                ? { uri: user.imgUrl }
                : require("../../assets/images/default-avatar.png")
            }
            style={styles.userImg}
          />
        </Pressable>
      </View>
      <ManropeText style={styles.questionText} weight={700}>
        Quels prestataires de services choisiriez-vous aujourd'hui ?
      </ManropeText>
      <ManropeText style={styles.connectText} weight={400}>
        Connectez-vous avec le fournisseur de services le plus talentueux et
        professionnel autour de vous.
      </ManropeText>
      <FlatList
        data={links}
        keyExtractor={(item) => item.href}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.links}
        renderItem={({ item: link }) => (
          <View style={styles.link}>
            <Image source={link.icon} style={styles.linkIcon} />
            <ManropeText style={styles.linkText} weight={400}>
              {link.title}
            </ManropeText>
          </View>
        )}
      />

      <ManropeText style={styles.questionText} weight={700}>
        Top Rated
      </ManropeText>
      <FlatList
        data={topRatedArtisans}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.links}
        renderItem={({ item: user }) => (
          <Pressable
            onPress={() => {
              router.push(`/artisan/${user.id}`);
            }}
          >
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
          </Pressable>
        )}
      />
      <ManropeText style={styles.questionText} weight={700}>
        Catégories
      </ManropeText>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.links}
        renderItem={({ item: category }) => (
          <Pressable
            key={category.id}
            onPress={() => {
              router.push(`/categories/${category.id}`);
            }}
          >
            <LinearGradient
              style={{ borderRadius: 20 }}
              colors={["#2E74AB", "#7FB4D7"]}
            >
              <View key={category.id} style={styles.categroyCard}>
                <ManropeText style={styles.categoryName} weight={600}>
                  {category.name}
                </ManropeText>
                <ManropeText style={styles.categoryDescription} weight={400}>
                  {category.description}
                </ManropeText>
              </View>
            </LinearGradient>
          </Pressable>
        )}
      />

      <ManropeText style={styles.questionText} weight={700}>
        Services
      </ManropeText>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.services}
        renderItem={({ item: service }) => (
          <Pressable
            onPress={() => {
              router.push(`/services/${service.id}`);
            }}
          >
            <View key={service.id} style={styles.serviceCard}>
              <Image
                source={
                  service.imgUrl
                    ? { uri: service.imgUrl }
                    : require("../../assets/images/default-avatar.png")
                }
                style={styles.serviceCardImage}
              />
              <ManropeText style={styles.serviceCardTitle} weight={600}>
                {service.title}
              </ManropeText>
              <ManropeText style={styles.serviceCardDescription} weight={400}>
                {service.description.slice(0, 100)}...
              </ManropeText>
              <View style={styles.serviceCardLocation}>
                <FontAwesome name="map-marker" size={15} color="#9DA499" />
                <ManropeText
                  style={styles.serviceCardLocationText}
                  weight={400}
                >
                  {service.artisan?.city || "N/A"}
                </ManropeText>
              </View>
            </View>
          </Pressable>
        )}
      />
      <View style={{ height: 100, width: "100%" }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F7",
    paddingTop: 80,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
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
    paddingHorizontal: 20,
  },
  connectText: {
    fontSize: 14,
    color: "#9DA499",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  links: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    marginTop: 20,
    paddingLeft: 20,
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
  categroyCard: {
    // backgroundColor: "#2E74AB",
    padding: 20,
    borderRadius: 20,
  },
  categoryName: {
    fontSize: 20,
    color: "white",
    marginBottom: 5,
  },
  categoryDescription: {
    fontSize: 12,
    color: "white",
  },
  services: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    gap: 20,
    marginTop: 20,
    paddingLeft: 20,
  },
  serviceCard: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
    borderRadius: 20,
    width: 200,
  },
  serviceCardImage: {
    width: "100%",
    height: 100,
    objectFit: "cover",
    borderRadius: 10,
  },
  serviceCardTitle: {
    fontSize: 16,
    marginTop: 10,
  },
  serviceCardDescription: {
    fontSize: 12,
    color: "#9DA499",
    marginVertical: 5,
  },
  serviceCardLocation: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "auto",
  },
  serviceCardLocationText: {
    fontSize: 12,
    color: "#9DA499",
    marginLeft: 5,
  },
});
