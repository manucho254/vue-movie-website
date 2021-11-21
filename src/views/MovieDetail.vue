<template>
<div class="movie-detail">
    <div class="container">
        <h1 class="has-text-weight-bold has-text-dark is-size-3 mb-3"> {{ movie.title }}</h1>
        <div class="card mb-5">
            <figure class="image is-16by9">
                <iframe class="has-ratio" width="640" height="100" :src='"https://www.2embed.ru/embed/tmdb/movie?id=" + $route.params.id' frameborder="0" allowfullscreen sandbox="allow-scripts allow-same-origin">
                    <!--sandbox="allow-scripts allow-same-origin"-->
                </iframe>
            </figure>
        </div>
        <div class="box has-background-dark">
            <div class="is-flex  p-4">
                <div v-if="movie.poster_path != null">
                    <img class="imageSize is-hidden-touch" :src="'https://image.tmdb.org/t/p/w1280' + movie.poster_path " alt="movie image">
                </div>
                <div v-else>
                    <img class="imageSize" src="@/assets/no-image.jpg" alt="black image">
                </div>
                <div class="ml-5 has-text-light ">

                    <h1 class="has-text-weight-bold  is-size-4"> {{ movie.title }}</h1>

                    <span class="is-size-6 has-text-weight-bold"><i class="fa fa-star star"></i>
                        {{ movie.vote_average }} | Released: {{ movie.release_date }}
                        <span v-for="genre in movie.genres" :key="genre.id" :genre="genre">
                            {{ " | " + genre.name }}
                        </span>
                    </span>
                    <p class="mt-5 is-size-5 has-text-light-grey">
                        {{ movie.overview }}
                    </p>
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
                        <button class="button has-background-black-bis has-text-light my-5" @click="showModal">
                            <i class="fa fa-play-circle"> Trailer</i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <h1 class="has-text-weight-bold is-size-3 is-hidden-touch"> Cast : </h1>
        <div class="box has-background-dark has-text-light is-hidden-touch">

            <div class="columns is-multiline mt-3">
                <div class="column is-1" :key="cast.id" v-for="cast in credits">
                    <figure class="image is-12by5">
                        <div v-if="cast.profile_path!= null">
                            <img class="is-mobile cast-images" :src="'https://image.tmdb.org/t/p/w1280' + cast.profile_path" alt="movie image">
                        </div>
                        <div v-else>
                            <img class="is-hidden-touch cast-images" src="@/assets/no-image.jpg" alt="black image">
                        </div>
                    </figure>
                    <p class="has-text-weight-bold has-text-centered"> {{ cast.name }} </p>
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
            trailers: [],
            credits: []
        }
    },
    mounted() {
        this.fetchMovie(this.$route.params.id)
        this.getMovieTrailer(this.$route.params.id)
        this.getCredits(this.$route.params.id)
    },

    methods: {
        async fetchMovie(movieID) {
            document.title = `Movie |`

            this.$store.commit('setIsLoading', true)

            await
            axios.get(`/movie/${movieID}?api_key=${env.apikey}`)
                .then(response => {
                    this.movie = response.data
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
                })
                .catch(error => {
                    console.log(error)
                })
            this.$store.commit('setIsLoading', false)
        },
        async getCredits(movieID) {
            await axios
                .get(`/movie/${movieID}/credits?api_key=${env.apikey}`)
                .then(response => {
                    this.credits = response.data.cast
                })
                .catch(error => {
                    console.log(error)
                })
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
