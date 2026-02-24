import colors from "@/theme/colors";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function StatItem({ icon, color, label, value }: any) {
  return (
    <View style={styles.statItem}>
      <Ionicons name={icon} size={22} color={color} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
     statItem: {
        alignItems: "center",
        flex: 1,
      },
      statValue: {
        fontSize: 18,
        fontWeight: "700",
        marginTop: 4,
      },
      statLabel: {
        fontSize: 12,
        color: colors.textSecondary,
      },
})