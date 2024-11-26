export interface MediaItem {
    backdrop_path: string // Path to the backdrop image
    id: number // Unique identifier for the media item
    name?: string // Name of the media item
    title?: string // title of the movie
    original_name: string // Original name of the media item
    overview: string // Summary or description of the media item
    poster_path: string // Path to the poster image
    media_type: string // Type of media (e.g., "tv", "movie")
    adult: boolean // Indicates if the media is for adults
    original_language: string // Original language code (e.g., "en")
    genre_ids: number[] // Array of genre IDs
    popularity: number // Popularity score
    first_air_date: string // Date of first airing
    vote_average: number // Average vote rating
    vote_count: number // Total number of votes
    origin_country: string[] // List of origin countries
    release_date: string
}

export type category = 'top_rated' | 'upcoming' | 'popular' | 'trending'
