<template>
  <div class="movie-detail">
   {{ $route.params.id }}
   <div class="container">
    <div class="modal">
       <div class="modal-background"></div>
         <div class="modal-content">
           <figure class="image is-16by9">
               <iframe class="has-ratio" width="640" height="360" 
                src="https://www.youtube.com/embed/fYlZDTru55g" 
                frameborder="0" allowfullscreen>
               </iframe>
           </figure>
        </div>
       <button class="modal-close is-large" aria-label="close">click</button>
   </div>
  </div>
</div>

</template>

<script>

import axios from "axios"
import env from "@/env.js"

export default {
  name: "TvShowDetail",
  data () {
    return {
      trailers: [],
      movies: [],
    }

  },created() {
    axios.get(`https://api.themoviedb.org/tv/2778?api_key=${env.apikey}`)
    .then(response => {
      this.movies = response.data.results
      console.log(this.movies)
    })
    axios.get(`https://api.themoviedb.org/3/tv/3762/videos?api_key=${env.apikey}`)
    .then(response => {
      this.trailers = response.data
    })
    .catch(error => {
      console.log(error)})
  }

}
</script>