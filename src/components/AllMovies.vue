<template>
   <div class="column is-3">
     <router-link :to="'/movie/' + movie.id"> 
       <div class="card">
          <div class="card-image"> 
            <figure class="image is-4by8 is-grey">
              <h3 class="is-size-5 has-text-bod m-2 has-text-light-grey"></h3>
               <div v-if="movie.poster_path != null">
                 <img :src="'https://image.tmdb.org/t/p/w1280' + movie.poster_path " alt="movie image">
               </div>
               <div v-else>
                <img src="@/assets/no-image.jpg" alt="black image">
               </div>
            </figure>
          </div>
          <div class="card-content overflow is-flex is-justify-content-space-between">
            <h5 class="is-dark has-text-start">{{ movie.title }}</h5>
            <h5 class="is-green">{{ movie.vote_average }}</h5>
          </div>
          <span :key="genre.id" v-for="genre in movie.genre_ids">
              <!-- {{  genreTypeName(genre, index) }} -->
          </span>
       </div>
     </router-link>
   </div>
</template>

<script>
export default {
    props: {
        movie: Object,
        genres: Object
    },
    methods: {
       genreTypeName(genreId, index) {
        for(const item of this.genres) {
          if(item.id == genreId) {
            if (this.movie.genre_ids.length - 1 == index) {
              return item.name
            }else {
              return item.name + ","
            }
          }
        }
      }
    }

}
</script>