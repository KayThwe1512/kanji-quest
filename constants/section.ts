export type Section = {
  id: string;
  name: string;
  kanji: string;
  kanjiElements: string[];
  completedCard: number;
  totalCards: number;
};

export const SECTIONS: Section[] = [
  {
    id: "1",
    name: "Section 1",
    kanji: "Days of Week",
    kanjiElements: ["月", "火", "水", "木", "金", "土", "日"],
    completedCard: 0,
    totalCards: 7,
  },
  {
    id: "2",
    name: "Section 2",
    kanji: "Numbers 1-5",
    kanjiElements: ["一", "二", "三", "四", "五"],
    completedCard: 0,
    totalCards: 5,
  },
  {
    id: "3",
    name: "Section 3",
    kanji: "Numbers 6-10",
    kanjiElements: ["六", "七", "八", "九", "十"],
    completedCard: 0,
    totalCards: 5,
  },
  {
    id: "4",
    name: "Section 4",
    kanji: "Nature",
    kanjiElements: ["山", "川", "田", "空", "雨"],
    completedCard: 0,
    totalCards: 5,
  },
  {
    id: "5",
    name: "Section 5",
    kanji: "Directions",
    kanjiElements: ["東", "西", "南", "北", "上", "下"],
    completedCard: 0,
    totalCards: 6,
  },
  {
    id: "6",
    name: "Section 6",
    kanji: "Family",
    kanjiElements: ["父", "母", "兄", "姉", "弟", "妹"],
    completedCard: 0,
    totalCards: 6,
  },
  {
    id: "7",
    name: "Section 7",
    kanji: "Time",
    kanjiElements: ["時", "分", "年", "今", "半"],
    completedCard: 0,
    totalCards: 5,
  },
  {
    id: "8",
    name: "Section 8",
    kanji: "School",
    kanjiElements: ["学", "校", "先", "生", "本"],
    completedCard: 0,
    totalCards: 5,
  },
  {
    id: "9",
    name: "Section 9",
    kanji: "People & Life",
    kanjiElements: ["人", "名", "友", "男", "女"],
    completedCard: 0,
    totalCards: 5,
  },
  {
    id: "10",
    name: "Section 10",
    kanji: "Daily Use",
    kanjiElements: ["食", "飲", "見", "行", "買"],
    completedCard: 0,
    totalCards: 5,
  },
];
