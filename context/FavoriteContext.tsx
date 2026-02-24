import { getFavorite, saveFavorite } from "@/services/favoriteStorage";
import { createContext, useContext, useEffect, useState } from "react";

export type KanjiItem = {
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

  useEffect(() => {
    const loadFavorites = async () => {
      const stored = await getFavorite();
      setFavorites(stored);
    };
    loadFavorites();
  }, []);

  const toggleFavorite = async (kanjiItem: KanjiItem) => {
    console.log("Saving item:", kanjiItem);
    setFavorites((prev) => {
      const exists = prev.find((k) => k.kanji === kanjiItem.kanji);

      let updated;
      if (exists) {
        updated = prev.filter((k) => k.kanji !== kanjiItem.kanji);
      } else {
        updated = [...prev, kanjiItem];
      }

      saveFavorite(updated);
      return updated;
    });
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
