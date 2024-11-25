<script setup lang="ts">
import { ref, computed } from 'vue'

const totalPages = 500 // Antal sidor
const currentPage = ref(1)

function goToPage(page: number) {
    if (page >= 1 && page <= totalPages) {
        currentPage.value = page
    }
}

const pagination = computed(() => {
    const maxVisible = 9 // Max antal synliga sidor (inklusive punkter)
    const pages: (number | string)[] = []

    if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i)
        }
    } else {
        const start = Math.max(1, currentPage.value - 3)
        const end = Math.min(totalPages, currentPage.value + 3)

        if (start > 1) {
            pages.push(1)
            if (start > 2) pages.push('...')
        }

        for (let i = start; i <= end; i++) {
            pages.push(i)
        }

        if (end < totalPages) {
            if (end < totalPages - 1) pages.push('...')
            pages.push(totalPages)
        }
    }

    return pages
})
</script>

<template>
    <div class="flex items-center space-x-1">
        <!-- Föregående -->
        <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="ml-2 rounded-full border border-slate-300 px-3 py-2 text-center text-sm text-slate-600 shadow-sm transition-all hover:border-slate-800 hover:bg-slate-800 hover:text-white hover:shadow-lg focus:border-slate-800 focus:bg-slate-800 focus:text-white active:border-slate-800 active:bg-slate-800 active:text-white disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
            Prev
        </button>

        <!-- Sidnummer -->
        <button
            v-for="page in pagination"
            :key="page"
            @click="typeof page === 'number' && goToPage(page)"
            :class="{
                'border-transparent bg-slate-800 text-white shadow-md':
                    page === currentPage,
                'border-slate-300 text-slate-600 hover:border-slate-800 hover:bg-slate-800 hover:text-white':
                    page !== currentPage,
            }"
            class="ml-2 min-w-9 rounded-full px-3.5 py-2 text-center text-sm shadow-sm transition-all hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            :disabled="page === '...'"
        >
            {{ page }}
        </button>

        <!-- Nästa -->
        <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="ml-2 rounded-full border border-slate-300 px-3 py-2 text-center text-sm text-slate-600 shadow-sm transition-all hover:border-slate-800 hover:bg-slate-800 hover:text-white hover:shadow-lg focus:border-slate-800 focus:bg-slate-800 focus:text-white active:border-slate-800 active:bg-slate-800 active:text-white disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
            Next
        </button>
    </div>
</template>
