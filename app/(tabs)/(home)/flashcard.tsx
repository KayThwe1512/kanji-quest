import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function FlashcardScreen() {
  const [flipped, setFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const progressPercent = ((currentIndex + 1) / kanjiList.length) * 100;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flashcard Practice</Text>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
      </View>

      {/* Flashcard */}
      <View style={styles.card}>
        <Text style={styles.kanji}>{currentCard.kanji}</Text>

        {flipped && (
          <View style={styles.details}>
            <Text style={styles.meaning}>Meaning: {currentCard.meaning}</Text>
            <Text style={styles.reading}>Onyomi: {currentCard.onyomi}</Text>
            <Text style={styles.reading}>Kunyomi: {currentCard.kunyomi}</Text>
            <Text style={styles.example}>Example: {currentCard.example}</Text>
          </View>
        )}
      </View>

      {/* Flip / Next */}
      <TouchableOpacity
        style={styles.flipButton}
        onPress={() => setFlipped(!flipped)}
      >
        <Text style={styles.buttonText}>
          {/* {flipped ? "Hide Details" : "Show Details"} */}
          Flip Card
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.buttonText}>Next Card</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  progressContainer: {
    width: "100%",
    height: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    marginBottom: 20,
  },
  progressFill: { height: "100%", backgroundColor: "#4CAF50", borderRadius: 5 },
  card: {
    backgroundColor: "#FFF",
    padding: 30,
    borderRadius: 15,
    alignItems: "center",
    elevation: 3,
    marginBottom: 30,
    minWidth: 250,
  },
  kanji: { fontSize: 80, fontWeight: "bold" },
  details: { marginTop: 20, alignItems: "flex-start" },
  meaning: { fontSize: 18, marginBottom: 5 },
  reading: { fontSize: 16, color: "gray", marginBottom: 3 },
  example: { fontSize: 16, color: "#555", marginTop: 5 },
  flipButton: {
    backgroundColor: "#FF9800",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: 200,
  },
  nextButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    width: 200,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
