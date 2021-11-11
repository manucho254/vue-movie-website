<template>
  <div class="home">
   <div class="container">
     <span class="is-uppercase mb-5 is-size-4 has-text-warning has-text-weight-bold">Trending</span>
     <div class="columns is-multiline mt-2">
         <Trending v-for="movie in movies" :key="movie.id" :movie="movie"/>
     </div>
   </div>
  </div>
</template>

<script>
import Trending from '@/components/Trending.vue'
import axios from 'axios'
import env from "@/env.js"

export default {
  name: "Home",
  components: {
    Trending
  },
  data() {
    return {
      movies: []
    }
  },
  async created() {
    document.title = "Home/"
    this.$store.commit('setIsLoading', true)
    await axios
    .get(`https://api.themoviedb.org/3/trending/all/day?api_key=${env.apikey}&language=en-US`)
    .then(response => {
      this.movies = response.data.results
      console.log(this.movies)
    })
    .catch(error => {
      console.log(error)})
    this.$store.commit('setIsLoading', false)
  }
}
</script>