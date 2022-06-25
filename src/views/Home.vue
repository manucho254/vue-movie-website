<template>
<div class="home">
    <div class="px-3">
        <p class="h5 mt-3 mb-4">Trending</p>
        <div class="row">
            <Trending v-for="movie in movies" :key="movie.id" :movie="movie" />

        </div>
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
