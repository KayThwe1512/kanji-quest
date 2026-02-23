import { getFavorite, saveFavorite } from "@/services/favoriteStorage";
import { createContext, useContext, useEffect, useState } from "react";

type FavoriteContextType = {
  favorites: string[];
  toggleFavorite: (kanji: string) => void;
};

const FavoriteContext = createContext<FavoriteContextType | null>(null);

export const FavoriteProvider = ({ children }: any) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const data = await getFavorite();
      setFavorites(data);
    };
    loadFavorites();
  }, []);

  const toggleFavorite = async (kanji: string) => {
    let updated;

    if (favorites.includes(kanji)) {
      updated = favorites.filter((k) => k !== kanji);
    } else {
      updated = [...favorites, kanji];
    }

    setFavorites(updated);
    await saveFavorite(updated);
    // setFavorites((prev) =>
    //   prev.includes(kanji) ? prev.filter((k) => k !== kanji) : [...prev, kanji],
    // );
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
