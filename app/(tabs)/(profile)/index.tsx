import { Bar } from "@/component/bar";
import { StatCard } from "@/component/StatCard";
import colors from "@/theme/colors";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const barData = [
  { value: 5, label: "Mon", frontColor: colors.secondary },
  { value: 8, label: "Tue", frontColor: colors.secondary },
  { value: 5, label: "Wed", frontColor: colors.secondary },
  { value: 10, label: "Thu", frontColor: colors.secondary },
  { value: 6, label: "Fri", frontColor: colors.secondary },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.header}>
          <Text style={styles.progressTitle}>
            Your <Text style={{ color: colors.secondary }}>Progress!</Text>
          </Text>
          <Text style={styles.subtitle}>Track your learning day by day!</Text>
          <Text style={styles.date}>Tuesday, Febuary 10, 2026</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.cardGrid}>
            <StatCard number="150" label="Total Learned" title="Words" />
            <StatCard number="5" label="Current Streak" title="Days" />
            <StatCard number="7" label="Longest Streak" title="Days" />
            <StatCard number="Febuary 7" label="Last Word Learned" title="" />
          </View>

          <Text style={styles.sectionTitle}>Weekly Progress</Text>
          <View style={styles.chart}>
            <Bar data={barData} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    padding: 24,
    paddingTop: 30,
  },

  progressTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primary,
  },

  subtitle: {
    color: colors.accent,
    marginTop: 6,
  },

  date: {
    color: colors.accent,
    marginTop: 4,
    fontSize: 12,
  },

  content: {
    backgroundColor: colors.white,
    borderRadius: 30,
    borderTopRightRadius: 30,
    padding: 15,
    margin: 10,
    borderWidth: 5,
    borderColor: colors.border,
  },

  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 12,
    color: colors.primary,
  },

  chart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 230,
  },
});
