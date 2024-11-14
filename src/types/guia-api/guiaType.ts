// Podriamos escribir los type que vamos a usar fuera de esta carpeta y esta solo verla de guia
export interface APIEscuchaFacil {
    users: User[];
    songs: Song[];
    albums: Album[];
    artists: Artist[];
    playlists: Playlist[];
}

export interface Album {
    id: number;
    name: string;
    releaseDate: Date;
    imageURL: string;
    createdAtDatetime: Date;
    updatedAtDatetime: Date | null;
    songs: number[];
}

export interface Artist {
    id: number;
    name: string;
    artistsOnSongs: ArtistArtistsOnSong[];
}

export interface ArtistArtistsOnSong {
    songID: number;
}

export interface Playlist {
    id: number;
    name: string;
    createdAtDatetime: Date;
    updatedAtDatetime: Date | null;
    idUser: number;
    songInPlaylist: SongInPlaylist[];
}

export interface SongInPlaylist {
    id: number;
    idSong: number;
}

export interface Song {
    id: number;
    name: string;
    duration: string;
    gender: string;
    imageURL: string;
    releaseDate: Date;
    state: string;
    createdAtDatetime: Date;
    updatedAtDatetime: Date | null;
    albumId: number | null;
    audioURL: string;
    artistsOnSongs: SongArtistsOnSong[];
}

export interface SongArtistsOnSong {
    artistID: number;
}

export interface User {
    id: number;
    email: string;
    password: string;
    state: string;
    birthDayDate: Date;
    firstName: string;
    lastName: string;
    nickName: string;
    imageURL: string | null;
    createdAtDateTime: Date;
    updatedAtDateTime: Date | null;
    historyUser: HistoryUser[];
    playlists: Playlist[];
    preferences: Preferences;
}

export interface HistoryUser {
    idSong: number;
    date: Date;
}

export interface Preferences {
    idUser: number;
    gendersFav: string[];
    artistsFav: string[];
}