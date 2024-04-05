import GoBackBtn from "@/components/GoBackBtn";
import Input from "@/components/Input";
import { ManropeText } from "@/components/StyledText";
import { API_URL } from "@/constants/urls";
import { useAuth } from "@/store/auth";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { useForm } from "react-hook-form";
import { View, StyleSheet, Pressable, ActivityIndicator } from "react-native";

export default function addUserRating() {
  const queryClient = useQueryClient();
  const user = useAuth.use.user();
  const { ratedId, requestId } = useLocalSearchParams();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${API_URL}/users/ratings`, {
        ...data,
        raterId: user?.id,
        ratedId: parseInt(ratedId),
        serviceRequestId: parseInt(requestId),
        rating: parseInt(data.rating),
      });
      reset();
      if (user?.type === "CLIENT") {
        await queryClient.refetchQueries({
          queryKey: ["requestsSent", user?.id],
        });
        router.push("/requestsSent");
      } else {
        await queryClient.refetchQueries({
          queryKey: ["requestsReceived", user?.id],
        });
        router.push("/requestsReceived");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <GoBackBtn />
      <ManropeText style={styles.title} weight={700}>
        Donner votre avis
      </ManropeText>
      <View>
        <Input
          control={control}
          errors={errors}
          name="comment"
          label="Commentaire"
          placeholder="j'ai bien aimé le travail avec .."
          rules={{
            required: "Vous devez entrer un commentaire",
          }}
        />
        <Input
          control={control}
          errors={errors}
          name="rating"
          label="Note"
          placeholder="0-5"
          rules={{
            required: "Vous devez entrer une note",
            pattern: {
              value: /^[0-5]*$/,
              message: "La note doit être un nombre entre 0 et 5",
            },
          }}
        />
        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          {isSubmitting ? (
            <ActivityIndicator size="small" color="#fffff" />
          ) : (
            <ManropeText style={styles.buttonText} weight={600}>
              Envoyer
            </ManropeText>
          )}
        </Pressable>
      </View>
    </View>
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
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#2E74AB",
    textAlign: "center",
    padding: 12,
    borderRadius: 15,
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
});
