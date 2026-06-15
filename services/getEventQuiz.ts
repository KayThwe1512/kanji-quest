import eventData from "../assets/data/eventQuizUpdated.json";

export const getEventQuiz = async (start: number, end: number) => {
  const words = eventData.slice(start, end + 1);

  const selected = [...words].sort(() => Math.random() - 0.5).slice(0, 20);

  return selected.map((item) => {
    const rand = Math.random();

    let prompt = "";
    let question = "";
    let options: string[] = [];
    let correctAnswer = "";
    let promptType = "";

    // 45% Reading → Kanji
    if (rand < 0.7) {
      prompt = item.reading;
      question = "Which kanji matches this reading?";

      correctAnswer = item.kanji;

      const wrongOptions = [
        ...item.distractors.visualKanji,
        ...item.distractors.homophoneKanji,
      ];

      options = [correctAnswer, ...wrongOptions]
        .slice(0, 5)
        .sort(() => Math.random() - 0.5);

      promptType = "reading";
    }

    // 45% Meaning → Kanji
    else if (rand < 0.8) {
      prompt = item.meaning;
      question = "Which kanji matches this meaning?";

      correctAnswer = item.kanji;

      const wrongOptions = [
        ...item.distractors.visualKanji,
        ...item.distractors.homophoneKanji,
      ];

      options = [correctAnswer, ...wrongOptions]
        .slice(0, 5)
        .sort(() => Math.random() - 0.5);

      promptType = "meaning";
    }

    // 10% Kanji → Reading
    else {
      prompt = item.kanji;
      question = "What is the reading of this word?";

      correctAnswer = item.reading;

      options = [correctAnswer, ...item.distractors.readings]
        .slice(0, 5)
        .sort(() => Math.random() - 0.5);

      promptType = "kanji";
    }

    return {
      prompt,
      question,
      options: options.map((text, i) => ({
        id: i,
        text,
      })),
      correctId: options.indexOf(correctAnswer),
      promptType,
      answer: correctAnswer,
      kanji: item.kanji,
      reading: item.reading,
      meaning: item.meaning,
    };
  });
};
