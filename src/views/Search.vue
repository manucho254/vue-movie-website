<template>
    <div class="columns is-multiline">
        <Trending v-for="movie in movies" :key="movie.id" :movie="movie"/>
    </div>
</template>

<script>

import { ref } from 'vue'
import axios from "axios"
import env from '@/env.js'
import Trending from "@/components/Trending.vue"

export default {
 name: "search",
 components: {
     Trending
   },
   setup() {
     const search = ref("");
     const movies = ref([]);

     const SearchMovies = () => {
       if (search.value != ""){
         axios
         .get(`
         https://api.themoviedb.org/3/search/multi?api_key=${env.apikey}&language=en-US&query=${search.value}&include_adult=false`)
         .then(response => {
           movies.value = response.data.results
           search.value = ""
           })
        .catch(error => {
             console.log(error)})
        }
     }
     return {
       search,
       movies,
       SearchMovies
     }
     
   }
}
</script>