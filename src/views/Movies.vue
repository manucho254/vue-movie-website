<template>
<div class="Movies">
    <div class="px-2 pt-5">
        <div class="d-flex gap-2">
            <AllMovies v-for="(movie, index) in movies" :key="index" :movie="movie" :genres="genres" />
        </div>
        <nav>
            <ul class="pagination d-flex gap-2">
                <li><a class="btn btn-dark" v-on:click="getPreviousPage()">Prev</a></li>
                <li><a class="btn btn-light" aria-label="Goto page 1">{{ currentPage }}</a></li>
                <li><a class="btn btn-dark" v-on:click="getNextPage()">Next</a></li>
            </ul>
        </nav>
    </div>
</div>
</template>

<script>
import AllMovies from '@/components/AllMovies.vue'
import axios from 'axios'
import env from "@/env.js"

export default {
    name: "Movies",
    components: {
        AllMovies
    },
    data() {
        return {
            movies: [],
            genres: [],
            currentPage: 1,
        }
    },
    mounted() {
        this.getMoviesGenres()
        this.getMovies()
        this.getNextPage()
        this.getPreviousPage()
        this.scrollUp()
    },
    methods: {
        async getMoviesGenres() {
            await axios.get(`/genre/movie/list?api_key=${env.apikey}`)
                .then(response => {
                    this.genres = response.data.genres
                })
                .catch(error => {
                    console.log(error)
                })
        },
        async getMovies() {
            document.title = "Movies/"
            this.$store.commit('setIsLoading', true)

            await axios.get(`/discover/movie?api_key=${env.apikey}&include_adult=false&page=` + this.currentPage)
                .then(response => {
                    this.movies = response.data.results
                })
                .catch(error => {
                    console.log(error)
                })
            this.$store.commit('setIsLoading', false)
        },
        scrollUp() {
            window.scrollTo(0, 0);
        },
        getNextPage() {
            this.currentPage += 1
            this.getMovies()
            this.scrollUp()
        },
        getPreviousPage() {
            if (this.currentPage > 1) {
                this.currentPage -= 1
                this.getMovies()
                this.scrollUp()
            } else if (this.currentPage === 1) {
                return null
            }
        },
    },
}
</script>
