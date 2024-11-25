<script setup lang="ts">
import { Clapperboard } from 'lucide-vue-next'
</script>
<template>
    <nav
        class="sticky top-0 z-10 flex w-full justify-between bg-gray-500/30 p-8 shadow-lg backdrop-blur-sm mb-8"
    >
        <Clapperboard :size="30" />

        <div>Search</div>
        <div>Favorites</div>
    </nav>
</template>
