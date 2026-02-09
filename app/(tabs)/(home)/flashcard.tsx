// import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_SIZE = width * 0.8;

export default function FlashcardScreen() {
  const [flipped, setFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);

  // Dummy kanji list
  const kanjiList = [
    {
      kanji: "日",
      meaning: "Sun",
      onyomi: "ニチ, ジツ",
      kunyomi: "ひ, -び, -か",
      example: "日本 (にほん) - Japan",
    },
    {
      kanji: "月",
      meaning: "Moon",
      onyomi: "ゲツ, ガツ",
      kunyomi: "つき",
      example: "月曜日 (げつようび) - Monday",
    },
    {
      kanji: "山",
      meaning: "Mountain",
      onyomi: "サン, セン",
      kunyomi: "やま",
      example: "富士山 (ふじさん) - Mt. Fuji",
    },
  ];

  const currentCard = kanjiList[currentIndex];

  const handleNext = () => {
    setFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % kanjiList.length);
  };

  const handlePrev = () => {
    setFlipped(false);
    setCurrentIndex((prev) => (prev === 0 ? kanjiList.length - 1 : prev - 1));
  };

  const toggleFavorite = () => {
    if (favorites.includes(currentIndex)) {
      setFavorites(favorites.filter((i) => i !== currentIndex));
    } else {
      setFavorites([...favorites, currentIndex]);
    }
  };

  const favoriteIcon = () => {
    isFav ? (
      <Ionicons name="heart" color={"red"} />
    ) : (
      <Ionicons name="heart" color={"grey"} />
    );
  };

  const isFav = favorites.includes(currentIndex);
  const progressPercent = ((currentIndex + 1) / kanjiList.length) * 100;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flashcard Practice</Text>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
      </View>

      {/* Flashcard */}
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.card}
        onPress={() => setFlipped(!flipped)}
      >
        {/* Favorite Icon */}
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
      </TouchableOpacity>

      {/* Navigation Buttons */}
      <View style={styles.navRow}>
        <TouchableOpacity style={styles.navButton} onPress={handlePrev}>
          <Text style={styles.buttonText}>Prev</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
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
    backgroundColor: "#87cfeb5b",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 15,
  },
  progressContainer: {
    width: "90%",
    height: 5,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    marginBottom: 20,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 5,
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    backgroundColor: "#FFF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    marginBottom: 20,
    padding: 20,
  },
  kanji: {
    fontSize: 80,
    fontWeight: "bold",
  },
  details: {
    alignItems: "flex-start",
  },
  meaning: {
    fontSize: 18,
    marginBottom: 5,
  },
  reading: {
    fontSize: 16,
    color: "gray",
    marginBottom: 3,
  },
  example: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  navRow: {
    flexDirection: "row",
    gap: 15,
  },
  navButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#87CEEB",
    width: 100,
    height: 50,
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  favIcon: {
    position: "absolute",
    top: 10,
    right: 15,
  },
});
