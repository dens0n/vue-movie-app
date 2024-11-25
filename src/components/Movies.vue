<script setup lang="ts">
import { ref, watch } from 'vue'
import axios from 'axios'

const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/trending/all/week?language=en-US',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYTNlNjgzNDdiZTYxNjFjYTQ3MTVhNzVjOGJlZjNjNCIsIm5iZiI6MTczMjUzMjI1My44OTIwMTg4LCJzdWIiOiI2NzQ0NTc4MWMyNDc2NWZhMmYyZGUxYjgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.L_gbyIKtXgmMgUqd8MWaWmuAl9d0d0i6OUoq00BWdSo',
    },
}

interface MediaItem {
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
}

const movies = ref<MediaItem[]>([])
const selectedMovie = ref<MediaItem | null>(null)

function selectMovie(movie: MediaItem) {
    selectedMovie.value = selectedMovie.value === movie ? null : movie
}

watch(selectedMovie, (newVal) => {
    if (newVal) {
        // Beräkna bredden på scrollbaren
        const scrollbarWidth =
            window.innerWidth - document.documentElement.clientWidth
        document.body.style.overflow = 'hidden'
        document.body.style.paddingRight = `${scrollbarWidth}px`
    } else {
        // Återställ när modalen stängs
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
    }
})

async function fetchData() {
    try {
        const res = await axios.request(options)
        const data = res.data
        console.log(data)
        movies.value = data.results
        console.log(movies.value)
    } catch (err) {
        console.log(err)
    }
}
</script>

<template>
    <main class="container z-0 mx-auto min-h-screen">
        <!-- MODAL -->
        <div
            v-for="movie in movies"
            :key="movie.id"
            @click="selectMovie(movie)"
        >
            <div
                v-if="selectedMovie?.id === movie.id"
                class="fixed right-0 top-0 z-20 flex h-screen w-full items-center justify-center backdrop-blur-sm"
            >
                <div
                    class="flex h-1/2 w-2/3 items-center justify-center bg-white/80"
                >
                    {{ movie.title || movie.name }}
                </div>
            </div>
        </div>

        <!-- CARDS -->

        <div
            class="z-2 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
            <div
                v-for="movie in movies"
                :key="movie.id"
                @click="selectMovie(movie)"
                class="hover:z-1 group relative flex transform cursor-pointer flex-col items-center overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105"
            >
                <img
                    :src="
                        movie.poster_path
                            ? 'https://image.tmdb.org/t/p/w300/' +
                              movie.poster_path
                            : '/placeholder.jpg'
                    "
                    :alt="movie.name || movie.original_name || 'Unknown Movie'"
                    class="h-auto w-full rounded-lg object-cover"
                />
                <div
                    class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black to-transparent px-2 py-5 opacity-0 transition-opacity group-hover:opacity-100"
                >
                    <h3
                        class="p-2 text-center text-lg font-semibold text-white"
                    >
                        {{ movie.name || movie.original_name || movie.title }}
                    </h3>
                    <p class="px-2 pb-2 text-center text-sm text-white">
                        {{
                            movie.overview.slice(0, 100) +
                            (movie.overview.length > 100 ? '...' : '')
                        }}
                    </p>
                </div>
            </div>
        </div>
        <button
            @click="fetchData"
            class="mx-auto mt-10 block rounded-lg bg-blue-500 px-6 py-2 font-bold text-white hover:bg-blue-600"
        >
            Fetch Data
        </button>
    </main>
</template>
