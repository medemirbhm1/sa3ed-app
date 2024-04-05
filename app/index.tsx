import { useAuth } from "@/store/auth";
import { Redirect } from "expo-router";

export default function index() {
  const status = useAuth.use.status();
  const user = useAuth.use.user();

  if (status === "signOut" || status === "idle") {
    return <Redirect href="/(auth)/login" />;
  }
  if (user?.type === "ARTISAN") {
    return <Redirect href="/(artisan-tabs)/" />;
  }
  return <Redirect href="/(tabs)/" />;
}
