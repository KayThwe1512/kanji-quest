import colors from "@/theme/colors";
import { Stack } from "expo-router";

export default function FavoriteLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: colors.primary,
      }}
    >
      <Stack.Screen
        name="favorite"
        options={{
          title: "Favorite",
          headerBackTitle: "Back",
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
