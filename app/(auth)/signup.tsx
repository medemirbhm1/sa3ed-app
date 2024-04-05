import { Link, router } from "expo-router";
import { useForm } from "react-hook-form";
import {
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
import Input from "@/components/Input";
import { ManropeText } from "@/components/StyledText";
import Select from "@/components/Select";

export const algerianWilayas = [
  { key: "Adrar", value: "Adrar" },
  { key: "Chlef", value: "Chlef" },
  { key: "Laghouat", value: "Laghouat" },
  { key: "Oum El Bouaghi", value: "Oum El Bouaghi" },
  { key: "Batna", value: "Batna" },
  { key: "Béjaïa", value: "Béjaïa" },
  { key: "Biskra", value: "Biskra" },
  { key: "Béchar", value: "Béchar" },
  { key: "Blida", value: "Blida" },
  { key: "Bouira", value: "Bouira" },
  { key: "Tamanrasset", value: "Tamanrasset" },
  { key: "Tébessa", value: "Tébessa" },
  { key: "Tlemcen", value: "Tlemcen" },
  { key: "Tiaret", value: "Tiaret" },
  { key: "Tizi Ouzou", value: "Tizi Ouzou" },
  { key: "Alger", value: "Alger" },
  { key: "Djelfa", value: "Djelfa" },
  { key: "Jijel", value: "Jijel" },
  { key: "Sétif", value: "Sétif" },
  { key: "Saïda", value: "Saïda" },
  { key: "Skikda", value: "Skikda" },
  { key: "Sidi Bel Abbès", value: "Sidi Bel Abbès" },
  { key: "Annaba", value: "Annaba" },
  { key: "Guelma", value: "Guelma" },
  { key: "Constantine", value: "Constantine" },
  { key: "Médéa", value: "Médéa" },
  { key: "Mostaganem", value: "Mostaganem" },
  { key: "M'Sila", value: "M'Sila" },
  { key: "Mascara", value: "Mascara" },
  { key: "Ouargla", value: "Ouargla" },
  { key: "Oran", value: "Oran" },
  { key: "El Bayadh", value: "El Bayadh" },
  { key: "Illizi", value: "Illizi" },
  { key: "Bordj Bou Arréridj", value: "Bordj Bou Arréridj" },
  { key: "Boumerdès", value: "Boumerdès" },
  { key: "El Tarf", value: "El Tarf" },
  { key: "Tindouf", value: "Tindouf" },
  { key: "Tissemsilt", value: "Tissemsilt" },
  { key: "El Oued", value: "El Oued" },
  { key: "Khenchela", value: "Khenchela" },
  { key: "Souk Ahras", value: "Souk Ahras" },
  { key: "Tipaza", value: "Tipaza" },
  { key: "Mila", value: "Mila" },
  { key: "Aïn Defla", value: "Aïn Defla" },
  { key: "Naâma", value: "Naâma" },
  { key: "Aïn Témouchent", value: "Aïn Témouchent" },
  { key: "Ghardaïa", value: "Ghardaïa" },
  { key: "Relizane", value: "Relizane" },
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
      if (res.data.data.type === "CLIENT") {
        router.replace("/(tabs)/");
      } else {
        router.replace("/(artisan-tabs)/");
      }
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
        />
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
});
