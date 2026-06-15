import colors from "@/theme/colors";
import { Stack, useRouter } from "expo-router";

type SectionParams = {
  level?: string;
};

export default function HomeLayout() {
  const router = useRouter();
  return (
    <Stack screenOptions={{ headerTintColor: colors.primary }}>
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen
        name="practicelevel"
        options={{
          title: "Kanji level",
          headerBackTitle: "Back",
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="section"
        options={({ route }) => {
          const params = route.params as SectionParams;
          const level = params?.level ?? "";

          return {
            title: `${level} Sections`,
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTitleAlign: "center",
          };
        }}
      />
      {/* <Stack.Screen
        name="flashcard"
        options={({ route }) => {
          const params = route.params as SectionParams;
          const level = params?.level ?? "";

          return {
            title: `${level} Sections`,
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTitleAlign: "center",
          };
        }}
      /> */}

      <Stack.Screen
        name="flashcard"
        options={({ route }) => {
          const params = route.params as any;
          const level = params?.level ?? "";
          const fromFavorite = params?.from === "favorite";

          return {
            title: fromFavorite ? "Favorite Flashcards" : `${level} Sections`,
            headerBackVisible: !fromFavorite,
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTitleAlign: "center",
          };
        }}
      />
      <Stack.Screen
        name="quizlevel"
        options={{
          title: "Quiz Level",
          headerBackTitle: "Back",
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="quiz"
        options={({ route }) => {
          const params = route.params as SectionParams;
          const level = params?.level ?? "";

          return {
            title: `${level} Quizz`,
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTitleAlign: "center",
          };
        }}
      />
      <Stack.Screen
        name="result"
        options={{
          title: "Result",
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
