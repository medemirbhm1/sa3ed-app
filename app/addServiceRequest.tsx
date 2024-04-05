import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { ManropeText } from "@/components/StyledText";
import GoBackBtn from "@/components/GoBackBtn";
import Input from "@/components/Input";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategories } from "./(tabs)";
import Select from "@/components/Select";
import axios from "axios";
import { API_URL } from "@/constants/urls";
import { useAuth } from "@/store/auth";
import { Redirect, router, useLocalSearchParams } from "expo-router";

type FormDataType = {
  title: string;
  description: string;
  clientId: string;
  artisanId: string;
  price: number;
};

export default function AddService() {
  const { artisanId, serviceId, serviceTitle } = useLocalSearchParams();

  const queryClient = useQueryClient();
  const user = useAuth.use.user();
  if (user?.type !== "CLIENT") {
    return <Redirect href="/" />;
  }
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm<FormDataType>({
    defaultValues: {
      title: serviceTitle,
    },
  });

  const onSubmit = async (data: FormDataType) => {
    try {
      const res = await axios.post(`${API_URL}/services/requests`, {
        ...data,
        clientId: parseInt(user?.id),
        artisanId: parseInt(artisanId),
        price: parseInt(data.price),
        serviceId,
      });
      queryClient.refetchQueries({ queryKey: ["requestsSent", user?.id] });
      reset();
      router.push("/requestsSent");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <GoBackBtn />
      <ManropeText style={styles.title} weight={700}>
        Demander un service
      </ManropeText>
      <View style={styles.form}>
        <Input
          control={control}
          errors={errors}
          name="title"
          label="Titre"
          placeholder="Installation des climatiseurs"
          rules={{
            required: "Vous devez entrer le titre du service",
          }}
        />
        <Input
          control={control}
          errors={errors}
          name="description"
          label="Description"
          placeholder="une description de votre demande"
          rules={{
            required: "Vous devez entrer une description de votre demande",
          }}
        />
        <Input
          control={control}
          errors={errors}
          name="price"
          label="Budget maximal"
          placeholder="5000"
          rules={{
            required: "Vous devez entrer budget maximal",
            pattern: {
              value: /^[0-9]*$/,
              message: "Le budget doit être un nombre",
            },
          }}
        />
        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          {isSubmitting ? (
            <ActivityIndicator size="small" color="#fffff" />
          ) : (
            <ManropeText style={styles.buttonText} weight={600}>
              Ajouter
            </ManropeText>
          )}
        </Pressable>
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
    marginVertical: 20,
  },
  form: {},
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
