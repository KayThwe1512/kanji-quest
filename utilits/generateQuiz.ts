export const generateQuiz = (words: any[]) => {
  const validWords = words.filter(
    (w) => w.japanese?.[0] && w.senses?.[0]?.english_definitions?.[0],
  );

  if (validWords.length < 4) return [];

  const shuffleArray = (array: any[]) => {
    const newArray = [...array];

    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray;
  };

  const shuffledQuestions = shuffleArray(validWords).slice(0, 10);

  return shuffledQuestions.map((correct) => {
    const wrongPool = validWords.filter((w) => w !== correct);
    const wrongOptions = shuffleArray(wrongPool).slice(0, 3);

    const allOptions = shuffleArray([correct, ...wrongOptions]);

    return {
      kanji: correct.japanese[0].word || correct.japanese[0].reading,
      question: "Choose the correct meaning",
      options: allOptions.map((item, index) => ({
        id: index,
        text: item.senses[0].english_definitions[0],
      })),
      correctId: allOptions.findIndex((item) => item === correct),
    };
  });
};
