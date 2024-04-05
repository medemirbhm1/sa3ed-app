import { ManropeText } from "@/components/StyledText";
import { API_URL } from "@/constants/urls";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { upload } from "cloudinary-react-native";
import { Cloudinary } from "@cloudinary/url-gen";
import { pickImage } from "../profile/edit/[id]";
import { useAuth } from "@/store/auth";
import { FontAwesome } from "@expo/vector-icons";
import GoBackBtn from "@/components/GoBackBtn";

const getService = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/services/${id}`);
    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};

export default function Service() {
  const user = useAuth.use.user();
  const queryClient = useQueryClient();
  const { id } = useLocalSearchParams();
  const { data: service } = useQuery({
    queryKey: ["services", id],
    queryFn: getService.bind(null, id),
  });

  const handleImageChange = async () => {
    if (user?.id !== service?.artisan.id) return;
    const cld = new Cloudinary({
      cloud: {
        cloudName: "ddrigh0zp",
        apiKey: "921134219599183",
        apiSecret: "x88Uqa9dla85Tgqq5YDrUfUBhko",
      },
    });
    const uri = await pickImage();
    if (uri) {
      await upload(cld, {
        file: uri,
        callback: async (error, result) => {
          if (error) {
            console.log(error);
          } else {
            try {
              await axios.put(`${API_URL}/services/${id}/update-image`, {
                imgUrl: result?.url,
              });
              queryClient.refetchQueries({
                queryKey: ["services", id],
              });
            } catch (err) {
              console.log(err);
            }
          }
        },
      });
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Image source={{ uri: service?.imgUrl }} style={styles.img} />
        {user?.id === service?.artisan.id ? (
          <Pressable style={styles.editImg} onPress={handleImageChange}>
            <FontAwesome name="edit" color="white" size={20} />
          </Pressable>
        ) : null}
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
          flex: 1,
        }}
      >
        <GoBackBtn />
        <ManropeText weight={600} style={styles.title}>
          {service?.title}
        </ManropeText>
        <ManropeText weight={400} style={styles.description}>
          {service?.description}
        </ManropeText>
        <ManropeText weight={500} style={styles.price}>
          A partir de {service?.price} DA
        </ManropeText>
        <Pressable
          style={styles.userContainer}
          onPress={() => {
            router.push(`/profile-artisan/${service?.artisan.id}`);
          }}
        >
          <Image
            source={{ uri: service?.artisan.imgUrl }}
            style={styles.userImg}
          />
          <View>
            <ManropeText style={styles.userFullName} weight={600}>
              {service?.artisan.lastname.concat(
                " ",
                service?.artisan.firstname
              )}
            </ManropeText>
            <ManropeText style={styles.userCity} weight={400}>
              {service?.artisan.city}
            </ManropeText>
          </View>
        </Pressable>
        {user?.type === "CLIENT" ? (
          <Pressable
            style={styles.button}
            onPress={() => {
              router.push({
                pathname: "/addServiceRequest",
                params: {
                  serviceId: id,
                  serviceTitle: service.title,
                  artisanId: service.artisan.id,
                },
              });
            }}
          >
            <ManropeText weight={500} style={styles.buttonText}>
              Demander
            </ManropeText>
          </Pressable>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F7",
  },
  img: {
    width: "100%",
    height: 300,
    objectFit: "cover",
  },
  title: {
    paddingTop: 30,
    paddingBottom: 20,
    fontSize: 24,
  },
  description: {
    fontSize: 14,
    color: "#4A4A4A",
  },
  price: {
    fontSize: 18,
    color: "#2E74AB",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#2E74AB",
    textAlign: "center",
    padding: 12,
    borderRadius: 15,
    marginTop: "auto",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  userContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 25,
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
  editImg: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#2E74AB",
    padding: 12,
    borderRadius: 50,
  },
});
