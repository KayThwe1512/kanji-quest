import colors from "@/theme/colors";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FavoriteButton from "./FavoriteButton";

const { width } = Dimensions.get("window");
const CARD_SIZE = width * 0.8;

type FlashcardProps = {
  card: any;
  isFavorite: boolean;
  ontoggleFavorite: () => void;
};

export default function ThemeFlashcard({
  card,
  isFavorite,
  ontoggleFavorite,
}: FlashcardProps) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [flipped, setFlipped] = useState(false);

  const flipCard = () => {
    Animated.timing(animatedValue, {
      toValue: flipped ? 0 : 180,
      duration: 400,
      useNativeDriver: Platform.OS !== "web",
    }).start();

    setFlipped(!flipped);
  };

  const frontRotate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const backRotate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  useEffect(() => {
    animatedValue.setValue(0);
    setFlipped(false);
  }, [card]);

  return (
    <TouchableOpacity activeOpacity={1} onPress={flipCard}>
      <View style={styles.cardWrapper}>
        <Animated.View
          style={[
            styles.card,
            styles.face,
            { transform: [{ rotateY: frontRotate }] },
          ]}
        >
          <View style={styles.favIcon}>
            <FavoriteButton
              isFavorite={isFavorite}
              toggleFavorite={ontoggleFavorite}
            />
          </View>

          <Text style={styles.kanji}>{card.kanji}</Text>
          <Text style={styles.smallReading}>
            {card.kun_readings?.[0] ?? ""}
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.card,
            styles.face,
            styles.backFace,
            { transform: [{ rotateY: backRotate }] },
          ]}
        >
          <View style={styles.favIcon}>
            <FavoriteButton
              isFavorite={isFavorite}
              toggleFavorite={ontoggleFavorite}
            />
          </View>

          <View style={styles.details}>
            <View style={styles.section}>
              <Text style={styles.label}>Meaning</Text>
              <Text style={styles.sectionText}>
                {card.meanings?.join(", ") ?? "-"}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Onyomi</Text>
              <Text style={styles.sectionText}>
                {card.on_readings?.join(", ") ?? "-"}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Kunyomi</Text>
              <Text style={styles.sectionText}>
                {card.kun_readings?.join(", ") ?? "-"}
              </Text>
            </View>
          </View>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },

  face: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
  },

  backFace: {
    transform: [{ rotateY: "180deg" }],
  },

  favIcon: {
    position: "absolute",
    top: 12,
    right: 15,
    zIndex: 10,
  },
  cardWrapper: {
    width: CARD_SIZE,
    height: CARD_SIZE,
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    backgroundColor: colors.white,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: colors.accent,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  kanji: {
    fontSize: 90,
    fontWeight: "bold",
    color: colors.primary,
  },
  smallReading: {
    marginTop: 10,
    fontSize: 18,
    color: colors.textSecondary,
  },
  details: {
    width: "95%",
  },

  section: {
    marginBottom: 18,
  },

  label: {
    alignSelf: "flex-start",
    backgroundColor: colors.accent,
    color: colors.white,
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 6,
    overflow: "hidden",
  },

  sectionText: {
    fontSize: 16,
    color: colors.textPrimary,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
});
