<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { Clapperboard, Search } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import type { category } from '@/assets/types/MovieType'

const emit = defineEmits(['search', 'category-change'])
const searchQuery = ref<string>('')
const selectedCategory = ref<category | null | 'favorites'>(null)
const router = useRouter()

const handleSearch = (event: Event) => {
    event.preventDefault()
    emit('search', searchQuery.value)
    searchQuery.value = ''
}

const selectCategory = (category: category | 'favorites') => {
    if (category === 'favorites') {
        selectedCategory.value = category
        return
    }

    selectedCategory.value = category
    console.log(`Selected category: ${category}`)
    emit('category-change', category)
    router.push('/') // Navigera till startsidan
}
</script>

<template>
    <nav
        class="sticky top-0 z-50 mb-8 w-full bg-gray-800/90 px-4 py-4 shadow-md backdrop-blur-sm"
    >
        <div
            class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4"
        >
            <a
                @click.prevent="router.push('/')"
                class="flex items-center space-x-3 text-white hover:cursor-pointer"
            >
                <Clapperboard :size="30" :stroke-width="2" class="text-white" />
                <span class="text-2xl font-semibold">Movie</span>
            </a>

            <div class="hidden gap-6 sm:flex">
                <button
                    @click="selectCategory('top_rated')"
                    :class="
                        selectedCategory === 'top_rated'
                            ? 'text-blue-500 hover:text-blue-400'
                            : 'text-white hover:text-gray-300'
                    "
                    class="text-white transition duration-200 hover:text-gray-300 active:text-blue-500"
                >
                    Top Rated
                </button>
                <button
                    @click="selectCategory('upcoming')"
                    :class="
                        selectedCategory === 'upcoming'
                            ? 'text-blue-500 hover:text-blue-400'
                            : 'text-white hover:text-gray-300'
                    "
                    class="text-white transition duration-200 hover:text-gray-300 active:text-blue-500"
                >
                    Upcoming
                </button>
                <button
                    @click="selectCategory('popular')"
                    :class="
                        selectedCategory === 'popular'
                            ? 'text-blue-500 hover:text-blue-400'
                            : 'text-white hover:text-gray-300'
                    "
                    class="text-white transition duration-200 hover:text-gray-300 active:text-blue-500"
                >
                    Popular
                </button>
                <router-link
                    to="/favorites"
                    @click.prevent="selectCategory('favorites')"
                    :class="
                        selectedCategory === 'favorites'
                            ? 'text-blue-500 hover:text-blue-400'
                            : 'text-white hover:text-gray-300'
                    "
                    class="transition duration-200"
                >
                    Favoriter
                </router-link>
                >
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
