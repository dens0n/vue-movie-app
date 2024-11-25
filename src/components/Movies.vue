<script setup lang="ts">
import { ref, watch } from 'vue'
import axios from 'axios'
import type MediaItem from '@/assets/types/MovieType'
import MovieModal from './MovieModal.vue'
import MovieCard from './MovieCard.vue'

const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/trending/all/week?page=3&language=en-US',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
}

const movies = ref<MediaItem[]>([])
const selectedMovie = ref<MediaItem | null>(null)

function selectMovie(movie: MediaItem) {
    selectedMovie.value = selectedMovie.value === movie ? null : movie
}

function closeModal() {
    selectedMovie.value = null
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
        <MovieModal :movie="selectedMovie" @close="closeModal" />
        <!-- CARDS -->
        <MovieCard :movies="movies" @select="selectMovie" />

        <button
            @click="fetchData"
            class="mx-auto mt-10 block rounded-lg bg-blue-500 px-6 py-2 font-bold text-white hover:bg-blue-600"
        >
            Fetch Data
        </button>
    </main>
</template>
