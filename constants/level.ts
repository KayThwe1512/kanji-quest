export type Level = {
  id: string;
  name: string;
  description: string;
  totalKanji: number;
  completedKanji: number;
};

export const LEVELS: Level[] = [
  {
    id: "N5",
    name: "Beginner",
    description: "Basic Kanji",
    totalKanji: 103,
    completedKanji: 20,
  },
  {
    id: "N4",
    name: "Elementary",
    description: "Daily Use",
    totalKanji: 181,
    completedKanji: 50,
  },
  {
    id: "N3",
    name: "Intermediate",
    description: "General Kanji",
    totalKanji: 370,
    completedKanji: 120,
  },
  {
    id: "N2",
    name: "Advanced",
    description: "Complex Kanji",
    totalKanji: 450,
    completedKanji: 80,
  },
  {
    id: "N1",
    name: "Expert",
    description: "Native Level",
    totalKanji: 1232,
    completedKanji: 10,
  },
];
