export type Level = {
  id: string;
  name: string;
  description: string;
  totalKanji: number;
};

export const LEVELS: Level[] = [
  { id: "N5", name: "Beginner", description: "Basic Kanji", totalKanji: 103 },
  { id: "N4", name: "Elementary", description: "Daily Use", totalKanji: 181 },
  {
    id: "N3",
    name: "Intermediate",
    description: "General Kanji",
    totalKanji: 370,
  },
  { id: "N2", name: "Advanced", description: "Complex Kanji", totalKanji: 450 },
  { id: "N1", name: "Expert", description: "Native Level", totalKanji: 1232 },
];
