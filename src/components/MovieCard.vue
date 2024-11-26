<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'
import type { MediaItem } from '@/assets/types/MovieType'
import { Star } from 'lucide-vue-next'

defineProps<{
    movies: MediaItem[]
}>()

const emit = defineEmits(['updateFavorites', 'select'])


const favorites = ref<MediaItem[]>(JSON.parse(localStorage.getItem('favorites') || '[]'))

const toggleFavorite = (movie: MediaItem) => {
    const movieIndex = favorites.value.findIndex((fav: MediaItem) => fav.id === movie.id)

    if (movieIndex === -1) {
        // Lägg till filmen i favoriter
        favorites.value.push(movie)
        console.log('Added to favorites:', movie)
    } else {
        // Ta bort filmen från favoriter
        favorites.value.splice(movieIndex, 1)
        console.log('Removed from favorites:', movie)
    }

    // Uppdatera localStorage och skicka emit
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
    emit('updateFavorites') 
}

const isFavorite = (movie: MediaItem) => {
    return favorites.value.some((fav: MediaItem) => fav.id === movie.id)
}
</script>

<template>
    <div class="z-2 mb-10 grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <div
            v-for="movie in movies"
            :key="movie.id"
            @click="$emit('select', movie)"
            class="hover:z-1 group relative flex transform cursor-pointer flex-col items-center overflow-hidden rounded-lg bg-white p-1 shadow-lg transition-transform hover:scale-105"
        >
            <img
                :src="movie.poster_path ? 'https://image.tmdb.org/t/p/w300/' + movie.poster_path : '/placeholder.jpg'"
                alt="Poster"
                class="h-full w-auto rounded-lg object-cover"
            />
            <div class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black to-transparent px-2 py-5 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                    @click.stop="toggleFavorite(movie)"
                    class="fixed right-5 top-5 z-20"
                >
                    <Star
                        color="orange"
                        :size="30"
                        :fill="isFavorite(movie) ? 'orange' : 'transparent'"
                    />
                </button>
                <h3 class="p-2 text-center text-lg font-semibold text-white">
                    {{ movie.name || movie.title }}
                </h3>
                <p class="px-2 pb-2 text-center text-sm text-white">
                    {{ movie.overview?.slice(0, 100) + (movie.overview?.length > 100 ? '...' : '') }}
                </p>
            </div>
        </div>
    </div>
</template>