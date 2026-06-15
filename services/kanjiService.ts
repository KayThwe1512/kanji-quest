import kanjiData from "@/assets/data/kanjiData.json";

export function getFlashcardKanji(kanjiIds: string[]) {
  const normalize = (str: string) => str.trim().normalize("NFC");

  const kanjiMap = Object.fromEntries(
    kanjiData.map((k) => [normalize(k.kanji), k]),
  );

  return kanjiIds.map((id) => kanjiMap[normalize(id)]).filter(Boolean);
}
