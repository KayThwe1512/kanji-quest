import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type MatchingData = {
  kanji: string[];
  answers: string[];
  correctMapping: { [kanji: string]: string };
};

type Props = {
  data: MatchingData;
  onMatch: () => void;
};

export default function MatchingQuestion({ data, onMatch }: Props) {
  const [selectedKanji, setSelectedKanji] = useState<string | null>(null);
  const [matched, setMatched] = useState<any>({});
  const [wrong, setWrong] = useState<any>(null);

  const handlePress = (value: string, side: "kanji" | "answer") => {
    if (side === "kanji") {
      if (matched[value]) return;
      setSelectedKanji(value);
    } else {
      if (!selectedKanji) return;

      const correct = data.correctMapping[selectedKanji] === value;

      if (correct) {
        setMatched((p: any) => ({ ...p, [selectedKanji]: value }));
        onMatch(); // notify QuizScreen to increase score
      } else {
        setWrong({ kanji: selectedKanji, ans: value });
        setTimeout(() => setWrong(null), 500);
      }
      setSelectedKanji(null);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        {data.kanji.map((k: string) => (
          <TouchableOpacity
            key={k}
            style={[
              styles.card,
              selectedKanji === k && styles.selected,
              matched[k] && styles.correct,
              wrong?.kanji === k && styles.wrong,
            ]}
            disabled={matched[k]}
            onPress={() => handlePress(k, "kanji")}
          >
            <Text style={styles.kanji}>{k}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.column}>
        {data.answers.map((ans: string) => {
          const matchedKanji = Object.keys(matched).find(
            (k) => matched[k] === ans,
          );
          return (
            <TouchableOpacity
              key={ans}
              style={[
                styles.card,
                matchedKanji && styles.correct,
                wrong?.ans === ans && styles.wrong,
              ]}
              disabled={!!matchedKanji}
              onPress={() => handlePress(ans, "answer")}
            >
              <Text>{ans}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", justifyContent: "space-between" },
  column: { flex: 1, alignItems: "center" },
  card: {
    width: "90%",
    padding: 14,
    margin: 6,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  selected: { borderWidth: 2, borderColor: "#4da6ff" },
  correct: { backgroundColor: "#9be7a1" },
  wrong: { backgroundColor: "#ff9b9b" },
  kanji: { fontSize: 26, textAlign: "center" },
});
