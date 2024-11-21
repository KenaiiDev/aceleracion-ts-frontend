"use client";

import React, { createContext, useState, useContext } from "react";

type SongType = {
  id: number;
  title: string;
};

type PlaylistContextType = {
  selectedSongs: SongType[];
  setSelectedSongs: React.Dispatch<React.SetStateAction<SongType[]>>;
};

const PlaylistContext = createContext<PlaylistContextType | undefined>(
  undefined
);

type PlaylistProviderPropsType = {
  children: React.ReactNode;
};

export const PlaylistProvider = ({ children }: PlaylistProviderPropsType) => {
  const [selectedSongs, setSelectedSongs] = useState<SongType[]>([]);

  return (
    <PlaylistContext.Provider value={{ selectedSongs, setSelectedSongs }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => {
  const context = useContext(PlaylistContext);
  if (context === undefined) {
    throw new Error("usePlaylist must be used within a PlaylistProvider");
  }

  return context;
};
