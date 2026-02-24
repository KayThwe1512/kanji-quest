export const getQuiz = async (level: string, count = 10) => {
  try {
    const res = await fetch(`/${level.toLowerCase()}quiz.json`);

    if (!res.ok) {
      throw new Error("Failed to fetch quiz file");
    }

    const data = await res.json();
    const shuffled = [...data].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count);

    const quiz = selected.map((item: any) => ({
      kanji: item.word,
      question: item.question,
      options: item.options.map((text: string, i: number) => ({
        id: i,
        text,
      })),
      correctId: item.options.indexOf(item.correct),
    }));

    return quiz;
  } catch (error) {
    console.log("Quiz fetch error:", error);
    return [];
  }
};