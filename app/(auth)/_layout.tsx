import { useAuth } from "@/store/auth";
import { Redirect, Stack } from "expo-router";

export default function Layout() {
  const status = useAuth.use.status();

  if (status === "signIn") {
    return <Redirect href="/(tabs)/" />;
  }
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
    </Stack>
  );
}
