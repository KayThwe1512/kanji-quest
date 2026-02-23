import { getFavorite, saveFavorite } from "@/services/favoriteStorage";
import { createContext, useContext, useEffect, useState } from "react";

type KanjiItem = {
  kanji: string;
  meanings: string[];
  onyomi: string[];
  kunyomi: string[];
};

type FavoriteContextType = {
  favorites: KanjiItem[];
  toggleFavorite: (kanjiItem: KanjiItem) => void;
};

const FavoriteContext = createContext<FavoriteContextType | null>(null);

export const FavoriteProvider = ({ children }: any) => {
  const [favorites, setFavorites] = useState<KanjiItem[]>([]);

  // Load favorites when app starts
  useEffect(() => {
    const loadFavorites = async () => {
      const stored = await getFavorite();
      setFavorites(stored);
    };
    loadFavorites();
  }, []);

  const toggleFavorite = async (kanjiItem: KanjiItem) => {
    const exists = favorites.find((k) => k.kanji === kanjiItem.kanji);

    let updated;

    if (exists) {
      updated = favorites.filter((k) => k.kanji !== kanjiItem.kanji);
    } else {
      updated = [...favorites, kanjiItem];
    }

    setFavorites(updated);
    await saveFavorite(updated);
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (!context) throw new Error("useFavorite must be inside FavoriteProvider");
  return context;
};
