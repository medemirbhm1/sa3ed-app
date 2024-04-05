import { ManropeText } from "@/components/StyledText";
import { useAuth } from "@/store/auth";
import { FontAwesome } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { Image, View, StyleSheet, Pressable } from "react-native";

function other() {
  const user = useAuth.use.user();
  const signout = useAuth.use.signOut();

  const handleSignout = async () => {
    await signout();
    router.push("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.header}
        onPress={() => {
          router.push(`/profile-artisan/${user?.id}`);
        }}
      >
        <Image source={{ uri: user.imgUrl }} style={styles.userImg} />
        <View>
          <ManropeText style={styles.userFullName} weight={600}>
            {user?.lastname.concat(" ", user.firstname)}
          </ManropeText>
          <ManropeText style={styles.userEmail} weight={400}>
            {user?.email}
          </ManropeText>
        </View>
      </Pressable>
      <View>
        <Pressable
          style={styles.linkContainer}
          onPress={() => {
            router.push("/requestsReceived");
          }}
        >
          <FontAwesome name="envelope" size={24} color="#2E74AB" />
          <ManropeText style={styles.linkText} weight={500}>
            Mes demandes
          </ManropeText>
          <FontAwesome name="chevron-right" size={24} color="#2E74AB" />
        </Pressable>
        <Pressable
          style={styles.linkContainer}
          onPress={() => {
            router.push("/addService");
          }}
        >
          <FontAwesome name="file" size={24} color="#2E74AB" />
          <ManropeText style={styles.linkText} weight={500}>
            Ajouter un service
          </ManropeText>
          <FontAwesome name="chevron-right" size={24} color="#2E74AB" />
        </Pressable>
        <Pressable style={styles.linkContainer} onPress={handleSignout}>
          <FontAwesome name="arrow-left" size={24} color="#2E74AB" />
          <ManropeText style={styles.linkText} weight={500}>
            Se déconnecter
          </ManropeText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 100,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 25,
  },
  userImg: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  userFullName: {
    fontSize: 20,
  },
  userEmail: {
    fontSize: 14,
  },
  linkContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  linkText: {
    flex: 1,
    marginLeft: 25,
  },
});
export default other;
