<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import { ref } from 'vue'
import type { category } from './assets/types/MovieType'

const searchQuery = ref<string>('')
const selectedCategory = ref<category>('trending')

const updateSearchQuery = (query: string) => {
    searchQuery.value = query
    console.log('(App.vue) search query:', searchQuery.value)
}

const updateCategory = (category: category) => {
    selectedCategory.value = category
    console.log('(App.vue) selected category:', selectedCategory.value)
}
</script>

<template>
    <Navbar @search="updateSearchQuery" @category-change="updateCategory" />
    <router-view
        v-model:searchQuery="searchQuery"
        :selectedCategory="selectedCategory"
    />
</template>
