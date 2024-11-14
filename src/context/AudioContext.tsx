'use client'

import { createContext, useState,ReactNode } from 'react';
import type{SongContextType,Song} from "@/types/context/AudioContextType"

export const SongContext = createContext<SongContextType | undefined>(undefined);

export function SongProvider({ children }: { children: ReactNode }) {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  return (
    <SongContext.Provider value={{ selectedSong, setSelectedSong }}>
      {children}
    </SongContext.Provider>
  );
}