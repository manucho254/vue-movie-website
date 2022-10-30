<template>
<div class="home px-2 pt-2">
    <span class="h5 mt-3 mb-4">Trending</span>
    <div class="trending d-flex justify-items-space-beween gap-3">
        <Trending v-for="(movie, index) in movies" :key="index" :movie="movie" />
    </div>
</div>
</template>

<script>
import Trending from '@/components/Trending.vue'
import axios from 'axios'
import env from "@/env.js"

export default {
    name: "Home",
    components: {
        Trending
    },
    data() {
        return {
            movies: [],
            popularMovies: [],
            popularTvShows: [],
        }
    },
    mounted() {
        this.getTrending()
    },
    methods: {
        async getTrending() {
            document.title = "Home/"

            this.$store.commit('setIsLoading', true)

            await axios
                .get(`/trending/all/day?api_key=${env.apikey}`)
                .then(response => {
                    this.movies = response.data.results
                })
                .catch(error => {
                    console.log(error)
                })
            this.$store.commit('setIsLoading', false)
        },
        async getPopularMovies() {
            await axios.get(`/discover/tv?sort_by=popularity.desc&api_key=${env.apikey}`)
                .then(response => {
                    this.popularMovies = response.data.results
                })
                .catch(error => {
                    console.log(error)
                })
        },
        async getPopularTvShows() {
            await axios.get(`/discover/movie?sort_by=popularity.desc&api_key=${env.apikey}`)
                .then(response => {
                    this.popularTvShows = response.data.results
                })
                .catch(error => {
                    console.log(error)
                })
        },
    },

}
</script>

<style>
.trending {
    overflow-x: scroll;
}
</style>
