import { FavoriteProvider } from "@/context/FavoriteContext";
import { ProgressProvider } from "@/context/ProgressContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <FavoriteProvider>
        <ProgressProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </ProgressProvider>
      </FavoriteProvider>
    </>
  );
}
