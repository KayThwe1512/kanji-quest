// import { useState } from "react";
import colors from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useMemo, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_SIZE = width * 0.8;

export default function FlashcardScreen() {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [flipped, setFlipped] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);

  const { data } = useLocalSearchParams();

  const kanjiList = useMemo(() => {
    if (!data) return [];
    return JSON.parse(data as string);
  }, [data]);

  const flipCard = () => {
    Animated.timing(animatedValue, {
      toValue: flipped ? 0 : 180,
      duration: 400,
      useNativeDriver: true,
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

  const currentCard = kanjiList[currentIndex];
  const isFirstCard = currentIndex === 0;
  const isLastCard = currentIndex === kanjiList.length - 1;

  // const handleNext = () => {
  //   setFlipped(false);
  //   setCurrentIndex((prev) => (prev + 1) % kanjiList.length);
  // };

  // const handlePrev = () => {
  //   setFlipped(false);
  //   setCurrentIndex((prev) => (prev === 0 ? kanjiList.length - 1 : prev - 1));
  // };

  const handleNext = () => {
    if (!isLastCard) {
      setFlipped(false);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirstCard) {
      setFlipped(false);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const toggleFavorite = () => {
    if (favorites.includes(currentIndex)) {
      setFavorites(favorites.filter((i) => i !== currentIndex));
    } else {
      setFavorites([...favorites, currentIndex]);
    }
  };

  const isFav = favorites.includes(currentIndex);
  const progressPercent = ((currentIndex + 1) / kanjiList.length) * 100;
  if (!kanjiList.length) {
    return (
      <View style={styles.container}>
        <Text>No flashcards found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flashcard Practice</Text>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
      </View>

      {/* <TouchableOpacity
        activeOpacity={0.9}
        style={styles.card}
        onPress={() => setFlipped(!flipped)}
      >
        <TouchableOpacity style={styles.favIcon} onPress={toggleFavorite}>
          <Text style={{ fontSize: 26 }}>
            {isFav ? (
              <Ionicons name="heart" color={"red"} size={25} />
            ) : (
              <Ionicons name="heart" color={"grey"} size={25} />
            )}
          </Text>
        </TouchableOpacity>

        {!flipped ? (
          <Text style={styles.kanji}>{currentCard.kanji}</Text>
        ) : (
          <View style={styles.details}>
            <Text style={styles.meaning}>Meaning: {currentCard.meaning}</Text>
            <Text style={styles.reading}>Onyomi: {currentCard.onyomi}</Text>
            <Text style={styles.reading}>Kunyomi: {currentCard.kunyomi}</Text>
            <Text style={styles.example}>Example: {currentCard.example}</Text>
          </View>
        )}
      </TouchableOpacity> */}

      <TouchableOpacity activeOpacity={1} onPress={flipCard}>
        <View style={styles.cardWrapper}>
          {/* FRONT */}
          <Animated.View
            style={[
              styles.card,
              styles.face,
              { transform: [{ rotateY: frontRotate }] },
            ]}
          >
            <TouchableOpacity style={styles.favIcon} onPress={toggleFavorite}>
              {isFav ? (
                <Ionicons name="heart" color={colors.primary} size={26} />
              ) : (
                <Ionicons
                  name="heart-outline"
                  color={colors.primary}
                  size={26}
                />
              )}
            </TouchableOpacity>
            <View style={styles.details}>
              <Text style={styles.kanji}>{currentCard.kanji}</Text>
            </View>
          </Animated.View>

          {/* BACK */}
          <Animated.View
            style={[
              styles.card,
              styles.face,
              styles.backFace,
              { transform: [{ rotateY: backRotate }] },
            ]}
          >
            <TouchableOpacity style={styles.favIcon} onPress={toggleFavorite}>
              {isFav ? (
                <Ionicons name="heart" color={colors.primary} size={26} />
              ) : (
                <Ionicons
                  name="heart-outline"
                  color={colors.primary}
                  size={26}
                />
              )}
            </TouchableOpacity>
            <View style={styles.details}>
              <Text style={styles.meaning}>Meaning: {currentCard.meaning}</Text>
              <Text style={styles.reading}>Onyomi: {currentCard.onyomi}</Text>
              <Text style={styles.reading}>Kunyomi: {currentCard.kunyomi}</Text>
              <Text style={styles.example}>Example: {currentCard.example}</Text>
            </View>
          </Animated.View>
        </View>
      </TouchableOpacity>

      {/* Navigation Buttons */}
      <View style={styles.navRow}>
        {!isFirstCard && (
          <TouchableOpacity style={styles.navButton} onPress={handlePrev}>
            <Text style={styles.buttonText}>Prev</Text>
          </TouchableOpacity>
        )}

        {!isLastCard && (
          <TouchableOpacity style={styles.navButton} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: 15,
  },
  progressContainer: {
    width: "90%",
    height: 5,
    backgroundColor: colors.border,
    borderRadius: 5,
    marginBottom: 20,
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.secondary,
    borderRadius: 5,
  },
  cardWrapper: {
    width: CARD_SIZE,
    height: CARD_SIZE,
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

  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    backgroundColor: colors.border,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    // elevation: 5,
    marginBottom: 20,
    padding: 20,
  },
  kanji: {
    fontSize: 80,
    fontWeight: "bold",
    color: colors.primary,
  },
  details: {
    alignItems: "flex-start",
    color: colors.primary,
  },
  meaning: {
    fontSize: 18,
    marginBottom: 5,
    color: colors.primary,
  },
  reading: {
    fontSize: 16,
    color: colors.primary,
    marginBottom: 3,
  },
  example: {
    fontSize: 16,
    color: colors.primary,
    marginTop: 5,
  },
  navRow: {
    flexDirection: "row",
    gap: 15,
    marginVertical: 20,
  },
  navButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    width: 100,
    height: 50,
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  },
  buttonText: {
    color: colors.white,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
