import colors from "@/theme/colors";
import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: colors.primary,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Profile",
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
