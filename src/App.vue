<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Movies from './components/Movies.vue'
import { ref } from 'vue'

const searchQuery = ref<string>('')
const selectedCategory = ref<string>('trending')


const updateSearchQuery = (query: string) => {
    searchQuery.value = query
}

const updateCategory = (category: string) => {
    selectedCategory.value = category
}
</script>

<template>
    <Navbar @search="updateSearchQuery" @categoryChange="updateCategory" />
    <Movies :searchQuery="searchQuery" :selectedCategory="selectedCategory" />
</template>
