<template>
  <div class="Tv-shows">
   <div class="container">
      <span class="is-uppercase mb-5 is-size-4 has-text-warning has-text-weight-bold">Popular Tv-shows</span>
     <div class="columns is-multiline mt-2">
        <AllTvShows v-for="movie in movies" :key="movie.id" :movie="movie"/>
     </div>
     <nav class="pagination is-centered p-2" role="navigation" aria-label="pagination">
      <ul class="pagination-list">

        <li><a class="pagination-previous">Previous</a></li>
        <li><a class="pagination-link" aria-label="Goto page 1">1</a></li>
        <li><a class="pagination-link" aria-label="Goto page 86">2</a></li>
        <li><a class="pagination-next">Next page</a></li>
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
      movies: []
    }
  },
  async created() {
    document.title = "Tv-Shows/"
    this.$store.commit('setIsLoading', true)

    await axios.get(`https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=${env.apikey}`)
    .then(response => {
      this.movies = response.data.results
    })
    .catch(error => {
      console.log(error)
    })
    this.$store.commit('setIsLoading', false)
  }
}
</script>