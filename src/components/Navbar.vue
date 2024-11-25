<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['search', 'categoryChange']);
const searchQuery = ref('');

const updateSearch = () => {
    emit('search', searchQuery.value);
}

const selectCategory = (category: string) => {
    console.log(`Selected category: ${category}`);
    emit('categoryChange', category);
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
            <div class="relative">
                <input
                    type="text"
                    placeholder="Search movies..."
                    v-model="searchQuery"
                    @input="updateSearch"
                    class="w-80 rounded-full bg-gray-700 px-4 py-2 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div
                    class="absolute right-1 top-1/2 -translate-y-1/2 transform p-2 text-gray-300 hover:cursor-pointer"
                >
                    <Search :size="19" />
                </div>
            </div>
        </div>
    </nav>
</template>
