<template>
<div class="Tv-shows">
    <div class="container">
        <span class="is-uppercase mb-5 is-size-4 has-text-warning has-text-weight-bold">Popular Tv-shows</span>
        <div class="columns is-multiline mt-2">
            <AllTvShows v-for="movie in movies" :key="movie.id" :movie="movie" />
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
import AllTvShows from '@/components/AllTvShows.vue'
import axios from 'axios'
import env from "@/env.js"

export default {
    name: "TvShows",
    components: {
        AllTvShows
    },
    data() {
        return {
            movies: [],
            genres: [],
            currentPage: 1,
        }
    },
    mounted() {
        this.getSeries()
        this.getNextPage()
        this.getPreviousPage()
        this.scrollUp()
        this.getSeriesGenres()
    },
    methods: {
        async getSeries() {
            document.title = "Tv-Shows/"
            this.$store.commit('setIsLoading', true)

            await axios.get(`/discover/tv?sort_by=popularity.desc&api_key=${env.apikey}&page=` + this.currentPage)
                .then(response => {
                    this.movies = response.data.results
                })
                .catch(error => {
                    console.log(error)
                })
            this.$store.commit('setIsLoading', false)
        },
        async getSeriesGenres() {
            await axios
                .get(`/genre/tv/list?api_key=${env.apikey}`)
                .then(response => {
                    this.genres = response.data.genres
                })
                .catch(error => {
                    console.log(error)
                })
        },
        scrollUp() {
            window.scrollTo(0, 0);
        },
        getNextPage() {
            this.currentPage += 1
            this.getSeries()
            this.scrollUp()
        },
        getPreviousPage() {
            if (this.currentPage > 1) {
                this.currentPage -= 1
                this.getSeries()
                this.scrollUp()
            } else {
                return
            }
        },
    }
}
</script>
