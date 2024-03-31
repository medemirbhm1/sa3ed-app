import { Link, Redirect, Stack, router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { API_URL } from "@/constants/urls";
import { useAuth } from "@/store/auth";
import Input from "@/components/Input";
import { ManropeText } from "@/components/StyledText";

type FormDataType = {
  email: string;
  password: string;
};

export default function Login() {
  const signIn = useAuth.use.signIn();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormDataType>({ defaultValues: { email: "", password: "" } });
  const [submittedData, setSubmittedData] = useState(null);

  const onSubmit = async (data: FormDataType) => {
    try {
      const res = await axios.post(`${API_URL}/users/login`, data);
      await signIn(res.data.data);
      router.replace("/(tabs)/");
    } catch (err) {
      setError("email", { message: "Email ou mot de passe incorrect" });
    }
  };

  return (
    <SafeAreaView>
      <LinearGradient
        style={styles.backgrond}
        colors={["rgba(0,0,0,0.8)", "transparent"]}
      />
      <View style={styles.container}>
        <ManropeText style={styles.heading} weight={700}>
          Connexion
        </ManropeText>
        <Input
          control={control}
          errors={errors}
          label="Email"
          placeholder="abc@example.com"
          name="email"
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
          label="Mot de passe"
          placeholder="Votre mot de passe"
          name="password"
          rules={{ required: "Vous devez entrer votre mot de passe" }}
          secureTextEntry={true}
        />

        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          {isSubmitting ? (
            <ActivityIndicator size="small" color="#fffff" />
          ) : (
            <ManropeText style={styles.buttonText} weight={600}>
              Se connecter
            </ManropeText>
          )}
        </Pressable>
        <ManropeText style={styles.toSignup} weight={400}>
          Vous n'avez pas un compte,
          <Link href="/(auth)/signup">
            <ManropeText style={styles.toSignupLink} weight={600}>
              {" "}s'inscrire
            </ManropeText>
          </Link>
        </ManropeText>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {},
  container: {
    padding: 20,
    justifyContent: "center",
    height: "100%",
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
    fontSize: 16,
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
  toSignup: {
    marginTop: 20,
    textAlign: "center",
  },
  toSignupLink: {
    color: "#2E74AB",
    fontWeight: "500",
  },
});
