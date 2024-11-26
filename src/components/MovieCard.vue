<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { MediaItem } from '@/assets/types/MovieType'

defineProps<{
    movies: MediaItem[]
}>()

defineEmits(['select'])
</script>
<template>
    <div
        class="z-2 mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
        <div
            v-for="movie in movies"
            :key="movie.id"
            @click="$emit('select', movie)"
            class="hover:z-1 group relative flex transform cursor-pointer flex-col items-center overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105"
        >
            <img
                :src="
                    movie.poster_path
                        ? 'https://image.tmdb.org/t/p/w300/' + movie.poster_path
                        : '/placeholder.jpg'
                "
                alt="Poster"
                class="h-full w-auto rounded-lg object-cover"
            />
            <div
                class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black to-transparent px-2 py-5 opacity-0 transition-opacity group-hover:opacity-100"
            >
                <h3 class="p-2 text-center text-lg font-semibold text-white">
                    {{ movie.name || movie.title }}
                </h3>
                <p class="px-2 pb-2 text-center text-sm text-white">
                    {{
                        movie.overview?.slice(0, 100) +
                        (movie.overview?.length > 100 ? '...' : '')
                    }}
                </p>
            </div>
        </div>
    </div>
</template>
