export type JLPTLevel = "N5" | "N4" | "N3" | "N2" | "N1";

export const JLPT_WORD_LIMIT = 20;

export const JLPT_API: Record<JLPTLevel, string> = {
  N5: "https://kanjiapi.dev/v1/kanji/jlpt-5",
  N4: "https://kanjiapi.dev/v1/kanji/jlpt-4",
  N3: "https://kanjiapi.dev/v1/kanji/jlpt-3",
  N2: "https://kanjiapi.dev/v1/kanji/jlpt-2",
  N1: "https://kanjiapi.dev/v1/kanji/jlpt-1",
};
