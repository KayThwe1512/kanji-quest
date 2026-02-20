import colors from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={colors.primary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(favorite)"
        options={{
          title: "Favorite",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              size={size}
              color={colors.primary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={colors.primary}
            />
          ),
        }}
      />
    </Tabs>
  );
}
