import { API_URL } from "@/constants/urls";
import { useAuth } from "@/store/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { getUserDetails } from "../[id]";
import { useForm } from "react-hook-form";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { algerianWilayas } from "@/app/(auth)/signup";
import DateInput from "@/components/DateInput";
import { ManropeText } from "@/components/StyledText";
import { upload } from "cloudinary-react-native";
import { Cloudinary } from "@cloudinary/url-gen";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import GoBackBtn from "@/components/GoBackBtn";

type FormDataType = {
  firstname: string;
  lastname: string;
  description: string;
  phone: string;
  city: string;
  town: string;
  address: string;
  sexe: string;
  birthdate: string;
  type: string;
};

export const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    allowsMultipleSelection: false,
    aspect: [4, 4],
    quality: 1,
  });
  if (!result.canceled) {
    return result.assets[0].uri;
  }
  return null;
};

export default function EditScreen() {
  const queryClient = useQueryClient();
  const currentUser = useAuth.use.user();
  const { id } = useLocalSearchParams();

  const { data: user } = useQuery({
    queryKey: ["clients", id],
    queryFn: getUserDetails.bind(null, id),
  });

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormDataType>({
    defaultValues: {
      firstname: user?.firstname,
      lastname: user?.lastname,
      description: user?.description,
      phone: user?.phone,
      city: user?.city,
      address: user?.address,
      sexe: user?.sexe,
      birthdate: user?.birthdate,
    },
  });
  const onSubmit = async (data: FormDataType) => {
    try {
      await axios.put(`${API_URL}/users/clients/${id}`, data);
      queryClient.refetchQueries({
        queryKey: ["clients", id],
      });
    } catch (error) {
      console.log(error);
    }
  };
  const [isUpdatingImage, setIsUpdatingImage] = useState(false);
  const updateUserImage = async () => {
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
              await axios.put(`${API_URL}/users/${id}/update-image`, {
                imgUrl: result?.url,
              });
              queryClient.refetchQueries({
                queryKey: ["clients", id],
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
    <ScrollView style={styles.container}>
      <GoBackBtn />
      <Pressable style={styles.imgContainer} onPress={updateUserImage}>
        <Image style={styles.userImg} source={{ uri: user.imgUrl }} />
      </Pressable>
      <View style={styles.form}>
        <Input
          control={control}
          errors={errors}
          label="Nom"
          placeholder="Doe"
          name="lastname"
          rules={{
            required: "Vous devez entrer votre nom",
          }}
        />
        <Input
          control={control}
          errors={errors}
          name="firstname"
          label="Prenom"
          placeholder="John"
          rules={{
            required: "Vous devez entrer votre prenom",
          }}
        />
        <Input
          control={control}
          errors={errors}
          name="description"
          label="Déscription"
          placeholder="Dites nous quelque choses sur vous"
          rules={{}}
        />
        <Select
          control={control}
          errors={errors}
          data={[
            { key: "MALE", value: "MALE" },
            { key: "FMEALE", value: "FEMALE" },
          ]}
          label={"Sexe"}
          name="sexe"
          defaultValue={user?.sexe}
          rules={{}}
        />
        <Input
          control={control}
          errors={errors}
          name="phone"
          label="Numéro de téléphone"
          placeholder="0627278388"
          rules={{
            required: "Vous devez entrer votre numéro de téléphone",
          }}
        />
        <Select
          control={control}
          errors={errors}
          data={algerianWilayas}
          placeholder="Votre wilaya"
          label={"Wilaya"}
          name="city"
          rules={{
            required: "Vous devez choisir votre wilaya",
          }}
          defaultValue={user?.city}
        />
        <Input
          control={control}
          errors={errors}
          name="address"
          label="Adresse"
          placeholder="12 rue de la paix"
          rules={{}}
        />
        <DateInput
          control={control}
          label="Date de naissance"
          name="birthdate"
          rules={{}}
          defaultValue={user.birthdate}
        />
        <Pressable
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting || !isDirty}
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color="#fffff" />
          ) : (
            <ManropeText style={styles.buttonText} weight={600}>
              Sauvegarder
            </ManropeText>
          )}
        </Pressable>
      </View>
      <View style={{ height: 100, width: "100%" }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
    backgroundColor: "#F9F9F7",
    minHeight: "100%",
  },
  imgContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  userImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
