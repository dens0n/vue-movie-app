<template>
    <div class="favorites-container">
        <h1 class="mb-8 text-center text-2xl font-bold">Favoriter</h1>
        <div v-if="favorites.length === 0">Inga favoriter tillagda.</div>
        <div v-else>
            <MovieCard
                :movies="favorites"
                @select="selectMovie"
                @updateFavorites="fetchFavorites"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MovieCard from './MovieCard.vue'
import type { MediaItem } from '@/assets/types/MovieType'

const favorites = ref<MediaItem[]>(
    JSON.parse(localStorage.getItem('favorites') || '[]'),
)

const fetchFavorites = () => {
    favorites.value = JSON.parse(localStorage.getItem('favorites') || '[]')
}

const selectMovie = (movie: MediaItem) => {
    // Logik för att hantera val av film
}

// Initial fetch of favorites
fetchFavorites()
</script>

<style scoped>
.favorites-container {
    padding: 20px;
}
</style>
