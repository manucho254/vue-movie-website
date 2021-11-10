<template>
   <div class="column is-2 is-fullheight">
     <router-link :to="'/movie/' + movie.id"> 
       <div class="card">
          <div class="card-image"> 
            <figure class="image is-4by8 is-grey">
              <h3 class="is-capitalized is-black has-text-weight-bold m-2">{{ movie.media_type }}</h3>
              <img :src="'https://image.tmdb.org/t/p/w1280' + movie.poster_path" alt="movie image">
            </figure>
          </div>
          <div class="card-content overflow is-flex is-justify-content-space-between">
            <h5 class="is-dark has-text-start">{{ movie.title }}</h5>
            <h5 class="is-green">{{ movie.vote_average }}</h5>
          </div>
       </div>
     </router-link>
   </div>
</template>

<script>
export default {
    props: {
        movie: Object
    }
}
</script>