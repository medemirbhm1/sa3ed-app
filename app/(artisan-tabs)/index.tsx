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
import ServiceCard from "@/components/ServiceCard";

const links = [
  {
    title: "Ajouter un service",
    icon: require("../../assets/images/service.png"),
    href: "/addService",
  },
  {
    title: "Voir les demandes",
    icon: require("../../assets/images/sheet.png"),
    href: "/requestsReceived",
  },
];

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

  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
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
        <Pressable
          onPress={() => {
            router.push(`/profile-artisan/${user?.id}`);
          }}
        >
          <Image source={{ uri: user?.imgUrl }} style={styles.userImg} />
        </Pressable>
      </View>
      <ManropeText style={styles.questionText} weight={700}>
        Pour qui aimeriez vous travailler aujourd'hui ?
      </ManropeText>
      <ManropeText style={styles.connectText} weight={400}>
        Connectez-vous avec des nouveaux clients .
      </ManropeText>
      <FlatList
        data={links}
        keyExtractor={(item) => item.href}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.links}
        renderItem={({ item: link }) => (
          <Pressable
            style={styles.link}
            onPress={() => {
              router.push(link.href);
            }}
          >
            <Image source={link.icon} style={styles.linkIcon} />
            <ManropeText style={styles.linkText} weight={500}>
              {link.title}
            </ManropeText>
          </Pressable>
        )}
      />
      <ManropeText style={styles.questionText} weight={700}>
        Nouveax services
      </ManropeText>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.services}
        renderItem={({ item }) => <ServiceCard service={item} />}
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
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    marginTop: 20,
    paddingLeft: 20,
  },
  link: {
    // alignItems: "center",
    backgroundColor: "white",
    flexDirection: "row",
    padding: 15,
    borderRadius: 20,
    gap: 8,
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
});
