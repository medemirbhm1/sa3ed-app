import { Link, Redirect, Stack, router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { API_URL } from "@/constants/urls";
import { useAuth } from "@/store/auth";
import { SelectList } from "react-native-dropdown-select-list";
import Input from "@/components/Input";
import { ManropeText } from "@/components/StyledText";

const algerianWilayas = [
  { key: 1, value: "Adrar" },
  { key: 2, value: "Chlef" },
  { key: 3, value: "Laghouat" },
  { key: 4, value: "Oum El Bouaghi" },
  { key: 5, value: "Batna" },
  { key: 6, value: "Béjaïa" },
  { key: 7, value: "Biskra" },
  { key: 8, value: "Béchar" },
  { key: 9, value: "Blida" },
  { key: 10, value: "Bouira" },
  { key: 11, value: "Tamanrasset" },
  { key: 12, value: "Tébessa" },
  { key: 13, value: "Tlemcen" },
  { key: 14, value: "Tiaret" },
  { key: 15, value: "Tizi Ouzou" },
  { key: 16, value: "Alger" },
  { key: 17, value: "Djelfa" },
  { key: 18, value: "Jijel" },
  { key: 19, value: "Sétif" },
  { key: 20, value: "Saïda" },
  { key: 21, value: "Skikda" },
  { key: 22, value: "Sidi Bel Abbès" },
  { key: 23, value: "Annaba" },
  { key: 24, value: "Guelma" },
  { key: 25, value: "Constantine" },
  { key: 26, value: "Médéa" },
  { key: 27, value: "Mostaganem" },
  { key: 28, value: "M'Sila" },
  { key: 29, value: "Mascara" },
  { key: 30, value: "Ouargla" },
  { key: 31, value: "Oran" },
  { key: 32, value: "El Bayadh" },
  { key: 33, value: "Illizi" },
  { key: 34, value: "Bordj Bou Arréridj" },
  { key: 35, value: "Boumerdès" },
  { key: 36, value: "El Tarf" },
  { key: 37, value: "Tindouf" },
  { key: 38, value: "Tissemsilt" },
  { key: 39, value: "El Oued" },
  { key: 40, value: "Khenchela" },
  { key: 41, value: "Souk Ahras" },
  { key: 42, value: "Tipaza" },
  { key: 43, value: "Mila" },
  { key: 44, value: "Aïn Defla" },
  { key: 45, value: "Naâma" },
  { key: 46, value: "Aïn Témouchent" },
  { key: 47, value: "Ghardaïa" },
  { key: 48, value: "Relizane" },
];

type FormDataType = {
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  city: string;
  town: string;
  address: string;
  sexe: string;
  birthdate: string;
  password: string;
  type: string;
};

export default function Signup() {
  const signIn = useAuth.use.signIn();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormDataType>({ defaultValues: { email: "", password: "" } });

  const onSubmit = async (data: FormDataType) => {
    try {
      const res = await axios.post(`${API_URL}/users/signup`, {
        ...data,
        type: "CLIENT",
      });
      await signIn(res.data.data);
      router.replace("/(tabs)/");
    } catch (err) {
      console.log(err);
      setError("email", { message: "Email ou mot de passe incorrect" });
    }
  };

  return (
    <SafeAreaView>
      <LinearGradient
        style={styles.backgrond}
        colors={["rgba(0,0,0,0.8)", "transparent"]}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <ManropeText style={styles.heading} weight={700}>
          Inscription
        </ManropeText>
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
          name="phone"
          label="Numéro de téléphone"
          placeholder="0627278388"
          rules={{
            required: "Vous devez entrer votre numéro de téléphone",
          }}
        />
        <ManropeText style={styles.label} weight={600}>
          Wilaya
        </ManropeText>
        <Controller
          control={control}
          render={({ field }) => (
            <View style={styles.dropdownButton}>
              <SelectList
                setSelected={field.onChange}
                data={algerianWilayas}
                save="value"
                placeholder="Selectionner votre wilaya"
                boxStyles={styles.selectInput}
                inputStyles={{
                  fontFamily: "Manrope_400Regular",
                }}
                dropdownTextStyles={{
                  fontFamily: "Manrope_400Regular",
                }}
              />
            </View>
          )}
          name="city"
          rules={{
            required: "Vous devez entrer votre wilaya",
          }}
        />
        {errors.city && (
          <Text style={styles.errorText}>{errors.city.message}</Text>
        )}
        <Input
          control={control}
          errors={errors}
          name="email"
          label="Email"
          placeholder="abc@example.com"
          rules={{
            required: "Vous devez entrer votre email",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Vous devez entrer un email valide",
            },
          }}
        />
        <Input
          control={control}
          errors={errors}
          name="password"
          label="Mot de passe"
          placeholder="Votre mot de passe"
          secureTextEntry={true}
          rules={{
            required: "Vous devez entrer votre mot de passe",
          }}
        />
        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          {isSubmitting ? (
            <ActivityIndicator size="small" color="#fffff" />
          ) : (
            <ManropeText style={styles.buttonText} weight={600}>
              S'inscrire
            </ManropeText>
          )}
        </Pressable>
        <ManropeText style={styles.toLogin} weight={400}>
          Vous avez déjà un compte?
          <Link href="/(auth)/login">
            <ManropeText style={styles.toLoginLink} weight={600}>
              {" "}
              Se connecter
            </ManropeText>
          </Link>
        </ManropeText>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 80,
    justifyContent: "center",
    minHeight: "100%",
    backgroundColor: "#F9F9F7",
  },
  backgrond: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  heading: {
    fontSize: 44,

    marginBottom: 10,
    color: "#2E74AB",
  },
  label: {
    fontSize: 14,
    color: "black",
  },
  input: {
    marginTop: 8,
    borderColor: "gray",
    borderRadius: 12,
    borderWidth: 1.6,
    marginBottom: 10,
    padding: 10,
    paddingLeft: 18,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  selectInput: {
    borderWidth: 0,
    backgroundColor: "#F5F3EF",
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
  toLogin: {
    marginTop: 20,
    textAlign: "center",
  },
  toLoginLink: {
    color: "#2E74AB",
    fontWeight: "500",
  },
  dropdownButton: {
    marginTop: 8,
    marginBottom: 10,
  },
});
