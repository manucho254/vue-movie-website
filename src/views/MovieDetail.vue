<template>
<div class="movie-detail">
    <div class="container">
        <div class="iframeSizing">
            <h1 class="has-text-weight-bold has-text-dark is-size-5 mb-3"> {{ movie.title }}</h1>
            <!-- <figure class="image is-16by9">
          <iframe class="has-ratio" width="640" height="100"  
            :src='"https://www.2embed.ru/embed/tmdb/movie?id=" + $route.params.id + "&s=1&e=1"'
            frameborder="0" allowfullscreen sandbox="allow-scripts allow-same-origin">
          </iframe>
       </figure> -->
        </div>
        <div class="box">
            <div class="is-flex is-justify-content-center is-align-items-center p-4">
                <div v-if="movie.poster_path != null">
                    <img class="imageSize is-hidden-touch" :src="'https://image.tmdb.org/t/p/w1280' + movie.poster_path " alt="movie image">
                </div>
                <div v-else>
                    <img src="@/assets/no-image.jpg" alt="black image">
                </div>
                <div class="ml-5 has-text-grey">

                    <h1 class="has-text-weight-bold has-text-dark is-size-3"> {{ movie.name }}</h1>

                    <span class="is-size-5"><i class="fa fa-star star">
                            {{ movie.vote_average }} </i> | Released: {{ movie.release_date }} |
                        <span v-for="genre in movie.genres" :key="genre.id" :genre="genre">
                            {{ "," + genre.name }}
                        </span>
                    </span>
                    <p class="mt-5 is-size-5">
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
                                <iframe class="has-ratio" width="640" height="360" v-for="trailer in trailers" :key="trailer.id" :trailer="trailer" :src='"https://www.youtube.com/embed/" +  trailer.key ' frameborder="0" allowfullscreen>
                                </iframe>
                            </figure>
                        </div>
                        <button class="modal-close is-large" aria-label="close" @click="close"></button>
                    </div>
                    <div>
                        <button class="button trailer_btn my-3" @click="showModal">
                            <i class="fa fa-play-circle"> </i>Play Trailer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import env from '@/env.js'

export default {
    name: "MovieDetail",
    data() {
        return {
            showModalflag: false,
            movie: [],
            trailers: []
        }
    },
    mounted() {
        this.fetchMovie(this.$route.params.id),
            this.getMovieTrailer(this.$route.params.id)
    },
    methods: {
        async fetchMovie(movieID) {
            document.title = `Movie | ${this.movie.title}`
            this.$store.commit('setIsLoading', true)

            await
            axios.get(`/movie/${movieID}?api_key=${env.apikey}`)
                .then(response => {
                    this.movie = response.data
                    console.log(this.movie)
                })
                .catch(error => {
                    console.log(error)
                })
            this.$store.commit('setIsLoading', false)
        },
        async getMovieTrailer(movieID) {
            this.$store.commit('setIsLoading', true)
            await axios
                .get(`/movie/${movieID}/videos?api_key=${env.apikey}`)
                .then(response => {
                    this.trailers = response.data.results
                    console.log(this.trailers)
                })
                .catch(error => {
                    console.log(error)
                })
            this.$store.commit('setIsLoading', false)
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
    color: rgb(219, 90, 13);
}
</style>
