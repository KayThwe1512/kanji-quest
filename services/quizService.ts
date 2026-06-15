import allQuiz from "@/assets/data/jlpt_all.json";

const getLevelData = (level: string) => {
  return allQuiz.filter(
    (item: any) => item.level.toLowerCase() === level.toLowerCase(),
  );
};

function generateSmartOptions(
  item: any,
  levelData: any[],
  field: "word" | "reading" | "meaning",
  correct: string,
) {
  let candidates: string[] = [];

  if (field === "meaning") {
    // Meaning questions -> use similarKanji only
    candidates = levelData
      .filter((x) => item.similarKanji?.includes(x.word))
      .map((x) => x.meaning);
  } else {
    // Reading / Kanji questions
    candidates = levelData
      .filter(
        (x) =>
          item.sameReading?.includes(x.word) ||
          item.similarKanji?.includes(x.word),
      )
      .map((x) => x[field]);
  }

  // remove correct answer & duplicates
  const wrongAnswers = [...new Set(candidates)].filter((x) => x !== correct);

  // fallback if not enough distractors
  const fallback = levelData
    .map((x) => x[field])
    .filter((x) => x !== correct && !wrongAnswers.includes(x));

  while (wrongAnswers.length < 3 && fallback.length > 0) {
    const randomIndex = Math.floor(Math.random() * fallback.length);

    wrongAnswers.push(fallback[randomIndex]);
    fallback.splice(randomIndex, 1);
  }

  const options = [...wrongAnswers.slice(0, 3), correct];

  return options.sort(() => Math.random() - 0.5);
}

function generateOptions(data: any[], field: string, correct: string) {
  const pool = data
    .map((item) => item[field])
    .filter((value) => value !== correct);

  const shuffled = pool.sort(() => Math.random() - 0.5);

  const options = [...shuffled.slice(0, 3), correct];
  return options.sort(() => Math.random() - 0.5);
}

export const getQuiz = async (level: string, count = 10) => {
  try {
    const levelData = getLevelData(level);

    const shuffled = [...levelData].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count);

    const quiz = selected.map((item: any) => {
      const type = Math.floor(Math.random() * 4);

      let prompt = "";
      let question = "";
      let options: string[] = [];
      let correctAnswer = "";
      let promptType = "";

      if (type === 0) {
        //give Kanji ask Reading
        prompt = item.kanji;
        question = "What is the reading of this word?";
        correctAnswer = item.reading;
        options = generateOptions(levelData, "reading", correctAnswer);
        promptType = "kanji";
      }

      if (type === 1) {
        //give Kanji ask Meaning
        prompt = item.kanji;
        question = "What is the meaning of this word?";
        correctAnswer = item.meaning;
        options = generateOptions(levelData, "meaning", correctAnswer);
        promptType = "kanji";
      }

      if (type === 2) {
        //give Meaning ask Kanji
        prompt = item.meaning;
        question = "Which kanji matches this meaning?";
        correctAnswer = item.kanji;
        options = generateOptions(levelData, "kanji", correctAnswer);
        promptType = "meaning";
      }

      if (type === 3) {
        //give Reading ask Kanji
        prompt = item.reading;
        question = "Which kanji matches this reading?";
        correctAnswer = item.kanji;
        options = generateOptions(levelData, "kanji", correctAnswer);
        promptType = "reading";
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
        kanji: item.kanji,
        reading: item.reading,
        meaning: item.meaning,
      };
    });

    return quiz;
  } catch (error) {
    console.log(error);
    return [];
  }
};
