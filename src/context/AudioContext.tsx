"use client";

import { createContext, useState, ReactNode, useContext } from "react";
import type { SongContextType, Song } from "@/types/context/AudioContextType";

export const SongContext = createContext<SongContextType | undefined>(
  undefined
);

export function SongProvider({ children }: { children: ReactNode }) {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  return (
    <SongContext.Provider value={{ selectedSong, setSelectedSong }}>
      {children}
    </SongContext.Provider>
  );
}

export const useSong = () => {
  const context = useContext(SongContext);
  if (context === undefined) {
    throw new Error("useSong must be used within a SongProvider");
  }

  return context;
};
