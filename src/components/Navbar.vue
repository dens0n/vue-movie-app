<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { Clapperboard, Search } from 'lucide-vue-next'
import type { category } from '@/assets/types/MovieType'

const emit = defineEmits(['search', 'category-change'])
const searchQuery = ref<string>('')

// Sökning triggas vid form-submission
const handleSearch = (event: Event) => {
    event.preventDefault() // Förhindra sidladdning
    emit('search', searchQuery.value)
    searchQuery.value = ''
}

const selectCategory = (category: category) => {
    console.log(`Selected category: ${category}`)
    emit('category-change', category)
}
</script>

<template>
    <nav
        class="sticky top-0 z-50 mb-8 w-full bg-gray-800/90 px-4 py-4 shadow-md backdrop-blur-sm"
    >
        <div
            class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4"
        >
            <a href="" class="flex items-center space-x-3 text-white">
                <Clapperboard :size="30" :stroke-width="2" class="text-white" />
                <span class="text-2xl font-semibold">Movie</span>
            </a>

            <div class="hidden gap-6 sm:flex">
                <button
                    @click="selectCategory('top_rated')"
                    class="text-white transition duration-200 hover:text-gray-300"
                >
                    Top Rated
                </button>
                <button
                    @click="selectCategory('upcoming')"
                    class="text-white transition duration-200 hover:text-gray-300"
                >
                    Upcoming
                </button>
                <button
                    @click="selectCategory('popular')"
                    class="text-white transition duration-200 hover:text-gray-300"
                >
                    Popular
                </button>
            </div>

            <!-- Search Bar -->
            <form @submit="handleSearch" class="relative">
                <input
                    type="text"
                    placeholder="Search movies..."
                    v-model="searchQuery"
                    class="w-80 rounded-full bg-gray-700 px-4 py-2 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                    type="submit"
                    class="absolute right-1 top-1/2 -translate-y-1/2 transform p-2 text-gray-300 hover:cursor-pointer"
                >
                    <Search :size="19" />
                </button>
            </form>
        </div>
    </nav>
</template>
