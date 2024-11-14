export interface Song {
    // no se como sera song entonces lo dejo asi por el momento
    [key: string]: any
}

export interface SongContextType {
    selectedSong: Song | null;
    setSelectedSong: React.Dispatch<React.SetStateAction<Song | null>>;
}