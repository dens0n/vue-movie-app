<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
import type MediaItem from '@/assets/types/MovieType'
import MovieModal from './MovieModal.vue'
import MovieCard from './MovieCard.vue'
import Pagination from './Pagination.vue'
import Loader from './Loader.vue'

const props = defineProps<{
    searchQuery: string
    selectedCategory: string
}>()

const options = ref({
    method: 'GET',
    url: 'https://api.themoviedb.org/3/trending/all/week',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
})

const movies = ref<MediaItem[]>([])
const totalPages = ref<number>(0)
const selectedMovie = ref<MediaItem | null>(null)
const currentPage = ref<number>(1) // Start page
const isLoading = ref<boolean>(true)

const selectMovie = (movie: MediaItem) => {
    selectedMovie.value = selectedMovie.value === movie ? null : movie
}

const closeModal = () => {
    selectedMovie.value = null
}

async function fetchData() {
    try {
        console.log(props.selectedCategory)

        isLoading.value = true
        let url = ''
        if (props.searchQuery) {
            url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(props.searchQuery)}&include_adult=false&language=en-US&page=${currentPage.value}`
        } else {
            switch (props.selectedCategory) {
                case 'top_rated':
                    url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${currentPage.value}`
                    break
                case 'upcoming':
                    url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${currentPage.value}`
                    break
                case 'popular':
                    url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${currentPage.value}`
                    break
                default:
                    url = `https://api.themoviedb.org/3/trending/all/week?page=${currentPage.value}&language=en-US`
                    break
            }
        }
        options.value.url = url
        const res = await axios.request(options.value)
        const data = res.data
        movies.value = data.results
        totalPages.value = data.total_pages
    } catch (err) {
        console.log(err)
    } finally {
        isLoading.value = false
    }
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
watch(isLoading, (newVal) => {
    if (newVal) {
        // När isLoading är true, stänger vi modalen och gör sidan oåtkomlig
        selectedMovie.value = null
        document.body.style.overflow = 'hidden'
    } else {
        // När isLoading är false, återställer vi sidan till normalt läge
        document.body.style.overflow = ''
    }
})

watch(
    () => props.selectedCategory,
    () => {
        console.log('Fetching data for category:', props.selectedCategory)
        fetchData()
    },
)

// Fetch data when the currentPage changes
watch(currentPage, () => {
    fetchData()
})

// Initial fetch when component mounts
onMounted(() => {
    fetchData()
})
</script>

<template>
    <main class="container relative z-0 mx-auto min-h-screen">
        <div v-if="isLoading">
            <Loader />
        </div>

        <!-- MODAL -->
        <MovieModal :movie="selectedMovie" @close="closeModal" />
        <!-- CARDS -->
        <MovieCard :movies="movies" @select="selectMovie" />
        <!-- PAGINATION -->
        <Pagination
            :totalPages="totalPages"
            :currentPage="currentPage"
            @update:currentPage="currentPage = $event"
        />
    </main>
</template>
