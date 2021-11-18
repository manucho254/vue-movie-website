<template>
<div class="series-detail">
    <div class="container">
      <h1 class="has-text-weight-bold has-text-dark is-size-5 mb-3"> {{ movie.name }}</h1>
        <div class="box">
            <figure class="image is-16by9">
                <!-- <iframe class="has-ratio" width="640" height="100"  
                  :src='"https://www.2embed.ru/embed/tmdb/tv?id=" + $route.params.id + "&s=1&e=1"'
                  frameborder="0" allowfullscreen sandbox="allow-scripts allow-same-origin"
                  referrerpolicy="same-origin">
                </iframe> -->
                <iframe class="has-ratio" width="640" height="360" 
                      v-for="trailer in trailers" :key="trailer.id" :trailer="trailer" 
                      :src='"https://www.youtube.com/embed/" +  trailer.key ' frameborder="0" allowfullscreen>
                </iframe>
            </figure>
        </div>
        <div class="dropdown is-rounded mb-4 mr-5" :class="{'is-active':  showdropdownflag}">
            <div class="dropdown-trigger">
                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu"  @click="showDropdown">
                <span>Season</span>
                <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
                </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                <a href="#" class="dropdown-item" :key="season.id" v-for="season in movie.number_of_seasons" :season="season">
                    {{ season }}
                </a>
                </div>
            </div>
        </div>
        <div class="dropdown is-rounded  mb-4 ml-5" :class="{'is-active':  showdropdownflag2}">
            <div class="dropdown-trigger">
                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu"  @click="showDropdown2">
                <span>Episodes</span>
                <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
                </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                <a href="#" class="dropdown-item" :key="episode.id" v-for="episode in seasonAndepisodes" :episode="episode">
                    {{ episode.episode_number }}
                </a>
                </div>
            </div>
        </div>
        <div class="box has-background-dark">
            <div class="is-flex is-flex is-justify-content-center is-align-items-center p-4">
                <div v-if="movie.poster_path != null">
                    <img class="imageSize is-hidden-touch" :src="'https://image.tmdb.org/t/p/w1280' + movie.poster_path " alt="movie image">
                </div>
                <div v-else>
                    <img class="imageSize" src="@/assets/no-image.jpg" alt="black image">
                </div>
                <!--  -->
                <div class="ml-5 has-text-light is-justify-content-space-evenly  is-align-items-center p-4">
                    <h1 class="has-text-weight-bold is-size-3"> {{ movie.name }}</h1>

                    <span class="is-size-5">Rating<i class="fa fa-star star"></i>
                        {{ movie.vote_average }}| Released: {{ movie.first_air_date }} |
                        <span v-for="genre in movie.genres" :key="genre.id" :genre="genre">
                            {{ "," + genre.name }}
                        </span>
                    </span>

                    <p class="mt-5 is-size-5 has-text-light-grey">
                        {{ movie.overview }}
                    </p>
                     <hr>
                    <h1 class="has-text-weight-bold has-text- mt-3 is-size-5">Creators</h1>

                    <div class="is-flex mt-3">
                        <div class="mr-5">
                            <h1 :key="creator.id" v-for="creator in movie.created_by"> 
                                {{ creator.name  }}
                            </h1>
                        </div>
                    </div>

                    <div class="modal" :class="{'is-active': showModalflag}">
                        <div class="modal-background"></div>
                        <div class="modal-content">
                            <figure class="image is-16by9">
                                <iframe class="has-ratio" width="640" height="360" 
                                v-for="trailer in trailers" :key="trailer.id" :trailer="trailer" 
                                :src='"https://www.youtube.com/embed/" +  trailer.key ' frameborder="0" allowfullscreen>
                                </iframe>
                            </figure>
                        </div>
                        <button class="modal-close is-large" aria-label="close" @click="close"></button>
                    </div>
                    <div>
                        <button class="button trailer_btn has-text-light my-3" @click="showModal">
                            <i class="fa fa-play-circle "> </i>Play Trailer
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
    name: "TvSeriesDetail",
    data() {
        return {
            showModalflag: false,
            showdropdownflag: false,
            showdropdownflag2: false,
            movie: [],
            trailers: [],
            seasonAndepisodes: [],
            season: 1
        }
    },
    mounted() {
        this.fetchSeries(this.$route.params.id)
        this.getSeriesTrailer(this.$route.params.id)
        this.getSeasonEpisodes(this.$route.params.id, this.season)
    },
    methods: {
        async fetchSeries(seriesID) {
            document.title = `Movie |`
            this.$store.commit('setIsLoading', true)

            axios.get(`/tv/${seriesID}?api_key=${env.apikey}`)
                .then(response => {
                    this.movie = response.data
                    console.log(this.movie)
                })
                .catch(error => {
                    console.log(error)
                })
            this.$store.commit('setIsLoading', false)
        },
        async getSeriesTrailer(seriesID) {
            this.$store.commit('setIsLoading', true)
            await axios
                .get(`/tv/${seriesID}/videos?api_key=${env.apikey}`)
                .then(response => {
                    this.trailers = response.data.results
                    console.log(this.trailers)
                })
                .catch(error => {
                    console.log(error)
                })
            this.$store.commit('setIsLoading', false)
        },
        async getSeasonEpisodes(seriesID, seasonId) {
            await axios
                .get(`/tv/${seriesID}/season/${seasonId}?api_key=${env.apikey}`)
                .then(response => {
                    this.seasonAndepisodes = response.data.episodes
                    console.log(this.seasonAndepisodes)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        showModal() {
            this.showModalflag = true;
        },
        showDropdown() {
            if (this.showdropdownflag == false) {
                this.showdropdownflag = true;
            }else {
                this.showdropdownflag = false;
            }
        },
        showDropdown2() {
            if (this.showdropdownflag2 == false) {
                this.showdropdownflag2 = true;
            }else {
                this.showdropdownflag2 = false;
            }
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
