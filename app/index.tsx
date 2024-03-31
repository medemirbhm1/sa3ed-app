import { useAuth } from "@/store/auth";
import { Redirect } from "expo-router";

export default function index() {
  const status = useAuth.use.status();
  if (status === "signOut" || status === "idle") {
    return <Redirect href="/(auth)/login" />;
  }
  return <Redirect href="/(tabs)/" />;
}
