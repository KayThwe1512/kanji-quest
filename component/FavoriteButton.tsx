import colors from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

type FavoriteProps = {
  isFavorite: boolean;
  toggleFavorite: () => void;
};

export default function FavoriteButton({
  isFavorite,
  toggleFavorite,
}: FavoriteProps) {
  return (
    <TouchableOpacity style={styles.favIcon} onPress={toggleFavorite}>
      {isFavorite ? (
        <Ionicons name="heart" color={colors.primary} size={26} />
      ) : (
        <Ionicons name="heart-outline" color={colors.primary} size={26} />
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  favIcon: {
    position: "absolute",
    top: 12,
    right: 15,
    zIndex: 10,
  },
});
