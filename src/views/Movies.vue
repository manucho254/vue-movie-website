<template>
  <div class="Movies">
    <div class="container">
      <span class="is-uppercase mb-5 is-size-4 has-text-warning has-text-weight-bold">Popular Movies</span>
      <div class="columns is-multiline mt-2">
         <AllMovies v-for="movie in movies" :key="movie.id" :movie="movie" :genres="genres"/>
     </div>
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
      page: 1,
      genres: []
    }
  },
  created() {
    document.title = "Movies/"
    axios
    .get
     (`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${env.apikey}&page=${this.page}`)
    .then
    (response => {
      this.movies = response.data.results
    })
    .catch(error => {
      console.log(error)})
  },mounted () {
    this.fetchGenres()
  }
  ,
  methods: {
    async fetchGenres(){
      await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${env.apikey}`)
      .then(response => {
        this.genres = response.data
      })
      .catch(error => {
      console.log(error)})
    }
  }
}
</script>