<template>
    <nav class="navbar d-flex justify-content-between navbar-expand-lg navbar-dark bg-dark">
        <div class="navbar-brand">
            <router-link to="/" class="navbar-item nav-link">
                <h3 class="h2 is-success"><span>Movie</span>Time</h3>
            </router-link>
        </div>
        <div>
            <form v-on:submit.prevent>
                <input id="search" type="text" @keyup="search" 
                    class="form-control border-none rounded-pill input-size" 
                    placeholder="search movie" v-model="search_value">
            </form>
            <div class="card position-absolute custom-dropdown" v-if="show == true">
                <SearchData :movie="movie" v-for="(movie, index) in movies" :key="index" v-if="show == true"/>
            </div>
        </div>
        <div class="d-flex justify-content-end">
            <router-link to="/" class="navbar-item nav-link">
                <h5 class="text-light">Home</h5>
            </router-link>
            <router-link to="/tv-shows/" class="navbar-item nav-link">
                <h5 class="text-light">Tv-shows</h5>
            </router-link>
            <router-link to="/movies/" class="navbar-item nav-link">
                <h5 class="text-light">Movies</h5>
            </router-link>
        </div>
    </nav>
</template>

<script>
    import axios from "axios"
    import env from '@/env.js'
    import SearchData from "@/components/SearchData"

    export default {
        props: {

        },
        components: {SearchData},
        data: () => {
            return {
                search_value: "",
                movies: [],
                show: false,
            }
        },
        methods: {
            search(){
                if (this.search_value == ""){
                    this.show = false
                    this.movies = []
                }else{
                    axios.get(`search/multi?api_key=${env.apikey}&page=1&query=${this.search_value}&include_adult=false`)
                    .then(response => {
                        console.log(response.data.results.length)
                        if (response.data.results.length > 0) {
                            this.show = true
                            this.movies = response.data.results.filter(
                                (item) => item.media_type == 'tv' || item.media_type == 'movie'
                            )
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
                }
            },
    }
  }
</script>

<style scoped>
.custom-dropdown {
    width: 500px !important;
}
</style>