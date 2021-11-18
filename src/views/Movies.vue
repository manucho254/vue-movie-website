<template>
<div class="Movies">
    <div class="container">
        <span class="is-uppercase mb-5 is-size-4 has-text-black-bis has-text-weight-bold">Popular Movies</span>
        <div class="columns is-multiline mt-2">
            <AllMovies v-for="movie in movies" :key="movie.id" :movie="movie" :genres="genres" />
        </div>
        <nav class="pagination is-centered p-2" role="navigation" aria-label="pagination">
            <ul class="pagination-list">

                <li><a class="pagination-previous" v-on:click="getPreviousPage()">Previous</a></li>
                <li><a class="pagination-link" aria-label="Goto page 1">{{ currentPage }}</a></li>
                <li><a class="pagination-next" v-on:click="getNextPage()">Next page</a></li>
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

            await axios.get(`/discover/movie?sort_by=popularity.desc&api_key=${env.apikey}&include_adult=false&page=` + this.currentPage)
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
            } else {
                return
            }
        },
    },
}
</script>
