import { kanjiN5 } from "@/data/kanjiN5";

export type QuizType =
  | "multipleChoiceMeaning"
  | "matchKanjiMeaning"
  | "matchKanjiKunyomi";

// Multiple choice options
export function getMultipleChoiceQuestion() {
  const correct = kanjiN5[Math.floor(Math.random() * kanjiN5.length)];
  const wrongOptions = kanjiN5
    .filter((q) => q.kanji !== correct.kanji)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  const options = [correct.meaning, ...wrongOptions.map((o) => o.meaning)].sort(
    () => 0.5 - Math.random(),
  );

  return {
    kanji: correct.kanji,
    correctAnswer: correct.meaning,
    options,
  };
}

// Matching quiz
export function getMatchingQuestion(field: "meaning" | "kunyomi") {
  const shuffled = [...kanjiN5].sort(() => 0.5 - Math.random()).slice(0, 4);
  const kanji = shuffled.map((q) => q.kanji);
  const answers = shuffled.map((q) => q[field]).sort(() => 0.5 - Math.random());

  return {
    kanji,
    answers,
    correctMapping: shuffled.reduce(
      (acc, q) => ({ ...acc, [q.kanji]: q[field] }),
      {},
    ),
  };
}
