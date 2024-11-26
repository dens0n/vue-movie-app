import { createRouter, createWebHistory } from 'vue-router'
import Movies from '../components/Movies.vue'
import Favorites from '../components/Favorites.vue'

const routes = [
    { path: '/', component: Movies },
    { path: '/favorites', component: Favorites },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router