<template>
    <div class="columns is-multiline">
        <Search v-for="movie in movies" :key="movie.id" :movie="movie"/>
    </div>
</template>

<script>

import axios from "axios"
import env from '@/env.js'
import Search from "@/components/Search.vue"

export default {
    name: "search",
    data () {
        return{
            movies: [],
            query: ''}
         },
        components: {
            Search
            },
            mounted () {
                let uri = window.location.search.substring(1)
                let params = new URLSearchParams(uri)
                
                if (params.get('query')) {
                    this.query = params.get('query')
                    this.performSearch()
                    }
                    console.log(this.query)
            },
            methods: {
                performSearch() {
                    axios
                    .get(`https://api.themoviedb.org/3/search/multi?api_key=${env.apikey}&language=en-US&page=1&query=${this.query}&include_adult=false`)
                    .then(response => {
                        this.movies = response.data
                        })
                    .catch(error => {
                            console.log(error)
                             })
                             }         
                    } 
}
</script>