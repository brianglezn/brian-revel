export interface Movie {
    id: string;
    title: string;
    description: string;
    poster: string;
    thumbnail: string;
    highlighted: boolean;
    rating: number | null;
    availableDate: string;
    cast: string;
    genre: string;
    trailerUrl: string | null;
    playUrl: string | null;
}

export interface MovieThumbnail {
    id: string;
    title: string;
    thumbnail: string;
    rating: number | null;
}

export interface MoviePoster {
    id: string;
    title: string;
    poster: string;
    availableDate?: string
}

export type MovieHeroProps = {
    poster: string;
    isAvailable: boolean;
    availableDate?: string;
    trailerUrl: string | null;
    playUrl: string | null;
}

export type MovieContentProps = {
    rating: number | null;
    cast: string;
    genreName: string;
    title: string;
    description: string;
    fav: boolean;
};

export interface Genre {
    id: string;
    name: string;
}