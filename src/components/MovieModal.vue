<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { X } from 'lucide-vue-next'
import type MediaItem from '@/assets/types/MovieType'

// Props som modalen behöver
defineProps<{
    movie: MediaItem | null // Null om modal ej syns
}>()

// För event för att meddela huvudkomponenten
defineEmits(['close'])
</script>

<template>
    <div
        v-if="movie"
        class="fixed inset-0 z-30 flex items-center justify-center backdrop-blur-sm"
        @click="$emit('close')"
    >
        <div
            class="relative w-11/12 max-w-4xl rounded-lg bg-white shadow-lg"
            @click.stop
        >
            <!-- Modal Header -->
            <div class="flex items-center justify-between border-b p-4">
                <h2 class="text-lg font-semibold">
                    {{ movie.title || movie.name }}
                </h2>
                <button @click="$emit('close')" class="h-8 w-8"><X /></button>
            </div>

            <!-- Modal Content -->
            <div class="flex flex-col p-6 sm:flex-row">
                <img
                    :src="
                        movie.poster_path
                            ? 'https://image.tmdb.org/t/p/w500/' +
                              movie.poster_path
                            : '/placeholder.jpg'
                    "
                    alt="Poster"
                    class="w-full rounded-lg shadow-md sm:w-1/3"
                />
                <div class="mt-4 sm:ml-6 sm:mt-0">
                    <p class="text-gray-700">
                        <strong>Overview:</strong>
                        {{ movie.overview }}
                    </p>
                    <p class="mt-2 text-gray-700">
                        <strong>Release Date:</strong>
                        {{
                            movie.release_date || movie.first_air_date || 'N/A'
                        }}
                    </p>
                    <p class="mt-2 text-gray-700">
                        <strong>Vote Average:</strong>
                        {{ movie.vote_average }}
                    </p>
                    <p class="mt-2 text-gray-700">
                        <strong>Vote Count:</strong>
                        {{ movie.vote_count }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
