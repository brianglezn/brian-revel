export interface Movie {
    id: string;
    title: string;
    description: string;
    poster: string;
    thumbnail: string;
    highlighted: boolean;
    rating: number | null;
    availableDate: string;
    genre: string;
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

export interface Genre {
    id: string;
    name: string;
}