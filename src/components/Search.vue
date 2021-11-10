<template>
   <div class="column is-2">
     <router-link :to="'/tv-show/' + movie.id"> 
       <div class="card">
          <div class="card-image"> 
            <figure class="image is-4by8 is-grey">
              <h3 class="is-size-6 is-bold m-2"></h3>
              <img :src="'https://image.tmdb.org/t/p/w1280' + movie.poster_path" alt="movie image">
            </figure>
          </div>
          <div class="card-content is-flex is-justify-content-space-between">
            <h3 class="is-dark">{{ movie.name }}</h3>
            <h3 class="is-green">{{ movie.vote_average }}</h3>
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