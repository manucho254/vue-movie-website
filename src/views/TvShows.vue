<template>
  <div class="Tv-shows">
   
    <div class="columns is-multiline">
         <AllTvShows v-for="movie in movies" :key="movie.id" :movie="movie"/>
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
      movies: []
    }
  },
  created() {
    document.title = "Tv-Shows/"
    axios.get(`https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=${env.apikey}`)
    .then(response => {
      this.movies = response.data.results
    })
    .catch(error => {
      console.log(error)})
  }
}
</script>