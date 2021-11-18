<template>
<div class="container">
    <span class="is-uppercase mb-5 is-size-4 has-text-warning has-text-weight-bold">Results for {{ query }}</span>
    <div class="columns is-multiline mt-2">
        <Search v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
</div>
</template>

<script>
import axios from "axios"
import env from '@/env.js'
import Search from "@/components/SearchAll.vue"

export default {
    name: "search",
    data() {
        return {
            movies: [],
            query: ''
        }
    },
    components: {
        Search
    },
    mounted() {
        let uri = window.location.search.substring(1)
        let params = new URLSearchParams(uri)

        if (params.get('query')) {
            this.query = params.get('query')
            this.performSearch()
        }
    },
    methods: {

        async performSearch() {

            this.$store.commit('setIsLoading', true)
            await axios
                .get(`/search/multi?api_key=${env.apikey}&page=1&query=${this.query}&include_adult=false`)
                .then(response => {
                    this.movies = response.data.results
                })
                .catch(error => {
                    console.log(error)
                })
            this.$store.commit('setIsLoading', false)
        }
    }
}
</script>
