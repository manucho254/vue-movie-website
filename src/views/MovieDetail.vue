<template>
  <div class="movie-detail">
   <div class="container">
    <div class="is-flex is-inline-flex">
        <div v-if="movie.poster_path != null">
          <img :src="'https://image.tmdb.org/t/p/w1280' + movie.poster_path " alt="movie image">
        </div>
         <div v-else>
           <img src="@/assets/no-image.jpg" alt="black image">
         </div>
       <div class="ml-5 has-text-grey is-flex-desktop-only">
         <h1 class="has-text-weight-bold has-text-dark is-size-3"> {{ movie.title }}</h1>
           <span class="is-size-5"><i class="fa fa-star star"></i> | {{ movie.release_date }} | {{ movie.genres.name }}</span>
            <p>
              {{ movie.overview }}
            </p>
           <h1 class="has-text-weight-bold has-text-dark mt-3">Featured Cast</h1>
          <div class="is-flex mt-3">
            <div class="mr-5">
              <h1>Scott Silver</h1>
                <p>writer</p>
            </div>
            <div>
              <h1>Scott Silver</h1>
              <p>writer</p>
           </div>
        </div>
            <div class="modal" :class="{'is-active': showModalflag}">
                <div class="modal-background"></div>
                    <div class="modal-content">
                        <figure class="image is-16by9">
                            <iframe class="has-ratio" width="640" height="360" 
                              src="https://www.youtube.com/embed/fYlZDTru55g" 
                              frameborder="0" allowfullscreen>
                            </iframe>
                        </figure>
                      </div>
                    <button class="modal-close is-large" aria-label="close" @click="close"></button>
                  </div>
              <div>
              <button class="button has-background-black has-text-light my-3" @click="showModal">
                <i class="fa fa-play-circle">  </i>Play Trailer
            </button>
          </div>
       </div>
      </div>
    </div>
  </div>
     <!-- <figure class="image is-16by9">
    <iframe class="has-ratio" width="640" height="360" src="https://www.youtube.com/embed/YE7VzlLtp-4" frameborder="0" allowfullscreen></iframe>
   </figure> -->
</template>

<script>

import axios from 'axios'
import env from '@/env.js'

export default {
  name: "MovieDetail",
  data() {
    return {
      showModalflag : false,
      movie: [],
    }
  },
  mounted () {
    this.fetchMovie(this.$route.params.id)
  },
  methods: {
    fetchMovie(movieID) {
     document.title = `Movie | ${this.id}`
     axios
     .get
     (`https://api.themoviedb.org/3/movie/${movieID}?api_key=${env.apikey}`)
     .then
     (response => {
      this.movie = response.data
      console.log(this.movie)
     })
     .catch(error => {
      console.log(error)})
     },
     showModal() {
      this.showModalflag = true;
    },
    close() {
      this.showModalflag = false
    }
   }
}
</script>

<style scoped>
.star {
  color: rgb(219, 192, 18);
}
</style>