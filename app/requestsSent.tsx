import GoBackBtn from "@/components/GoBackBtn";
import { ManropeText } from "@/components/StyledText";
import { API_URL } from "@/constants/urls";
import { useAuth } from "@/store/auth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { router } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";

const getRequests = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/services/requests/clients/${id}`);
    return res.data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default function requestsSent() {
  const user = useAuth.use.user();

  if (user?.type !== "CLIENT") {
    return router.push("/(artisan-tabs)");
  }
  const { data: requests } = useQuery({
    queryKey: ["requestsSent", user?.id],
    queryFn: () => getRequests(user?.id),
  });

  console.log(requests);

  return (
    <ScrollView style={styles.container}>
      <GoBackBtn />
      <ManropeText style={styles.title} weight={700}>
        Mes demandes envoyées
      </ManropeText>
      {requests?.map((request) => (
        <View key={request.id} style={styles.requestCard}>
          <ManropeText style={styles.requestTitle} weight={600}>
            {request?.title}
          </ManropeText>
          <ManropeText style={styles.requestDescription} weight={400}>
            {request?.description}
          </ManropeText>
          <ManropeText style={styles.requestPrice} weight={400}>
            Budget maximal: {request?.price} DA
          </ManropeText>
          <View style={styles.requestFooter}>
            <Pressable
              onPress={() => {
                router.push(`/profile-artisan/${request?.artisan.id}`);
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                style={styles.userImg}
                source={{ uri: request?.artisan.imgUrl }}
              />

              <ManropeText style={styles.userFullName} weight={600}>
                {request?.artisan.lastname} {request?.artisan.firstname}
              </ManropeText>
            </Pressable>
            <ManropeText style={styles.status} weight={400}>
              {(() => {
                switch (request.status) {
                  case "ACCEPTED":
                    return (
                      <ManropeText
                        weight={400}
                        style={{
                          color: "#5cb85c",
                        }}
                      >
                        Acceptée ✅
                      </ManropeText>
                    );
                  case "REJECTED":
                    return (
                      <ManropeText
                        weight={400}
                        style={{
                          color: "red",
                        }}
                      >
                        Rejetée ❌
                      </ManropeText>
                    );
                  case "PENDING":
                    return (
                      <ManropeText
                        weight={400}
                        style={{
                          color: "gray",
                        }}
                      >
                        En attente ⏳
                      </ManropeText>
                    );
                  case "DONE":
                    return (
                      <ManropeText
                        weight={400}
                        style={{
                          color: "#5cb85c",
                        }}
                      >
                        Terminée ✔️
                      </ManropeText>
                    );
                  case "CANCELED":
                    return (
                      <ManropeText
                        weight={400}
                        style={{
                          color: "red",
                        }}
                      >
                        Annulée ❌
                      </ManropeText>
                    );
                  default:
                    return "";
                }
              })()}
            </ManropeText>
          </View>
          {request.status === "DONE" ? (
            !request.ratings.length ? (
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <Pressable
                  onPress={() => {
                    router.push({
                      pathname: `/addUserRating`,
                      params: {
                        ratedId: request?.artisan.id,
                        requestId: request.id,
                      },
                    });
                  }}
                  style={{
                    backgroundColor: "#2E74AB",
                    padding: 5,
                    borderRadius: 5,
                  }}
                >
                  <ManropeText
                    weight={500}
                    style={{
                      color: "#fff",
                    }}
                  >
                    Donner votre avis
                  </ManropeText>
                </Pressable>
              </View>
            ) : null
          ) : null}
        </View>
      ))}
      <View style={{ height: 100, width: "100%" }}></View>
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
    marginBottom: 20,
  },
  requestCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  requestTitle: {
    fontSize: 20,
    color: "#2E74AB",
    marginBottom: 10,
  },
  requestDescription: {
    fontSize: 14,
    color: "#4A4A4A",
  },
  requestPrice: {
    fontSize: 14,
    color: "#4A4A4A",
  },
  requestFooter: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  userImg: {
    width: 35,
    height: 35,
    borderRadius: 25,
    marginRight: 10,
  },
  userFullName: {
    color: "#2E74AB",
  },
  status: {
    fontSize: 14,
    color: "#4A4A4A",
    marginLeft: "auto",
  },
});
