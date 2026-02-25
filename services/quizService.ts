import n1quiz from "@/assets/data/n1quiz.json";
import n2quiz from "@/assets/data/n2quiz.json";
import n3quiz from "@/assets/data/n3quiz.json";
import n4quiz from "@/assets/data/n4quiz.json";
import n5quiz from "@/assets/data/n5quiz.json";

const quizDataMap: Record<string, any[]> = {
  n1: n1quiz,
  n2: n2quiz,
  n3: n3quiz,
  n4: n4quiz,
  n5: n5quiz,
};

export const getQuiz = async (level: string, count = 10) => {
  try {
    const data = quizDataMap[level.toLowerCase()];

    if (!data) {
      throw new Error("Quiz level not found");
    }

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
    console.log("Quiz load error:", error);
    return [];
  }
};
