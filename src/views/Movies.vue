<template>
  <div class="Movies">

    <div class="columns is-multiline">
         <AllMovies v-for="movie in movies" :key="movie.id" :movie="movie"/>
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
      page: 1
    }
  },
  created() {

    document.title = "Movies/"
    axios.get(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${env.apikey}&page=1`)
    .then(response => {
      this.movies = response.data.results
    })
    .catch(error => {
      console.log(error)})
  }
}
</script>