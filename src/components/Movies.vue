<script setup lang="ts">
import { ref, watch, onMounted, defineEmits } from 'vue'
import axios from 'axios'
import type { category, MediaItem } from '@/assets/types/MovieType'
import MovieModal from './MovieModal.vue'
import MovieCard from './MovieCard.vue'
// import Pagination from './Pagination.vue'
import Loader from './Loader.vue'

const props = defineProps<{
    searchQuery: string
    selectedCategory: category
}>()
const emit = defineEmits(['update:searchQuery'])

const options = ref({
    method: 'GET',
    url: 'https://api.themoviedb.org/3/trending/all/week',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
})

const movies = ref<MediaItem[]>([])
const selectedMovie = ref<MediaItem | null>(null)
const isLoading = ref<boolean>(true)

const selectMovie = (movie: MediaItem) => {
    selectedMovie.value = selectedMovie.value === movie ? null : movie
}

const closeModal = () => {
    selectedMovie.value = null
}

async function fetchData() {
    try {
        console.log('Fetching data with searchQuery:', props.searchQuery)
        console.log(
            'Fetching data with selectedCategory:',
            props.selectedCategory,
        )

        isLoading.value = true
        let url = ''
        if (props.searchQuery) {
            url = `https://api.themoviedb.org/3/search/movie?query=${props.searchQuery}&include_adult=false&language=en-US`
        } else {
            switch (props.selectedCategory) {
                case 'top_rated':
                    url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US`
                    break
                case 'upcoming':
                    url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&region=US`
                    break
                case 'popular':
                    url = `https://api.themoviedb.org/3/movie/popular?language=en-US`
                    break
                default:
                    url = `https://api.themoviedb.org/3/trending/movie/week?language=en-US`
                    break
            }
        }
        options.value.url = url
        console.log('Final URL:', options.value.url)

        const res = await axios.request(options.value)
        const data = res.data
        console.log('API Response:', data)

        movies.value = data.results
    } catch (err) {
        console.error('Error fetching data:', err)
    } finally {
        isLoading.value = false

        // Kontrollera att `emit` körs
        if (props.searchQuery) {
            console.log('Resetting searchQuery to empty string.')
            emit('update:searchQuery', '')
        }
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
    () => props.searchQuery,
    () => {
        if (props.searchQuery) {
            console.log('Fetching data for search:', props.searchQuery)
            fetchData()
        }
    },
)

watch(
    () => props.selectedCategory,
    () => {
        console.log('Fetching data for category:', props.selectedCategory)
        fetchData()
    },
)

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
        <MovieCard :movies="movies || []" @select="selectMovie" />
        <!-- PAGINATION -->
        <!-- <Pagination
            :totalPages="totalPages"
            :currentPage="currentPage"
            @update:currentPage="currentPage = $event"
        /> -->
    </main>
</template>
