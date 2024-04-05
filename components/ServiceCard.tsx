import { Image, Pressable, StyleSheet, View } from "react-native";
import { ManropeText } from "./StyledText";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

export default function ServiceCard({ service }) {
  return (
    <Pressable
      onPress={() => {
        router.push(`/services/${service.id}`);
      }}
    >
      <View key={service.id} style={styles.serviceCard}>
        <Image
          source={{ uri: service.imgUrl }}
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
          <ManropeText style={styles.serviceCardLocationText} weight={400}>
            {service.artisan?.city || "N/A"}
          </ManropeText>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
