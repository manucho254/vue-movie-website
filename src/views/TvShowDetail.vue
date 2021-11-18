<template>
<div class="series-detail">
    <div class="container">
        <h1 class="has-text-weight-bold has-text-dark is-size-5 mb-3"> {{ series.name }}</h1>
        <div class="box">
            <figure class="image is-16by9">
                <!-- <iframe class="has-ratio" width="640" height="100"  
                  :src='"https://www.2embed.ru/embed/tmdb/tv?id=" + $route.params.id + "&s=1&e=1"'
                  frameborder="0" allowfullscreen sandbox="allow-scripts allow-same-origin"
                  referrerpolicy="same-origin">
                </iframe> -->
                <iframe class="has-ratio" width="640" height="360" v-for="trailer in trailers" :key="trailer.id" :trailer="trailer" :src='"https://www.youtube.com/embed/" +  trailer.key ' frameborder="0" allowfullscreen>
                </iframe>
            </figure>
        </div>
        <div class="dropdown is-rounded mb-4 mr-5" :class="{'is-active':  showdropdownflag}">
            <div class="dropdown-trigger">
                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu" @click="showDropdown">
                    <span>Season</span>
                    <span class="icon is-small">
                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content"  id="season">
                    <a  class="dropdown-item" :v-model="selected"
                     :key="season.id" v-for="season in series.number_of_seasons">
                     <option v-on:click="alert()" :value="season">{{ season }}</option>
                    </a>
                </div>
            </div>
        </div>
        <div class="dropdown is-rounded  mb-4 ml-5" :class="{'is-active':  showdropdownflag2}">
            <div class="dropdown-trigger">
                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu" @click="showDropdown2">
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
                <div v-if="series.poster_path != null">
                    <img class="imageSize is-hidden-touch" :src="'https://image.tmdb.org/t/p/w1280' + series.poster_path " alt="movie image">
                </div>
                <div v-else>
                    <img class="imageSize" src="@/assets/no-image.jpg" alt="black image">
                </div>
                <!--  -->
                <div class="ml-5 has-text-light is-justify-content-space-evenly  is-align-items-center p-4">
                    <h1 class="has-text-weight-bold is-size-3"> {{ series.name }}</h1>

                    <span class="is-size-5">Rating<i class="fa fa-star star"></i>
                        {{ series.vote_average }}| Released: {{ series.first_air_date }} |
                        <span v-for="genre in series.genres" :key="genre.id" :genre="genre">
                            {{ "," + genre.name }}
                        </span>
                    </span>

                    <p class="mt-5 is-size-5 has-text-light-grey">
                        {{ series.overview }}
                    </p>
                    <hr>
                    <h1 class="has-text-weight-bold has-text- mt-3 is-size-5">Creators</h1>

                    <div class="is-flex mt-3">
                        <div class="mr-5">
                            <h1 :key="creator.id" v-for="creator in series.created_by">
                                {{ creator.name  }}
                            </h1>
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
            series: [],
            trailers: [],
            seasonAndepisodes: [],
            season: 1,
            credits: [],
            selected: ''
        }
    },
    mounted() {
        this.fetchSeries(this.$route.params.id)
        this.getSeriesTrailer(this.$route.params.id)
        this.getSeasonEpisodes(this.$route.params.id, this.season)
        this.getCredits(this.$route.params.id)
    },
    methods: {
        async fetchSeries(seriesID) {
            document.title = `Movie |`
            this.$store.commit('setIsLoading', true)

            axios.get(`/tv/${seriesID}?api_key=${env.apikey}`)
                .then(response => {
                    this.series = response.data
                    console.log(this.series)
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
        async getCredits(seriesID) {
            await axios
                .get(`/tv/${seriesID}/credits?api_key=${env.apikey}`)
                .then(response => {
                    this.credits = response.data
                    console.log(this.credits)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        alert() {
            const anchor = document.querySelectorAll("option")
            console.log(anchor)
            for(let i=1;  i <= anchor.length; i++) {
                if (i != anchor.value) {
                    console.log(i)
                }
            }
            this.getSeasonEpisodes(this.$route.params.id, this.season)
        },
        showModal() {
            this.showModalflag = true;
        },
        showDropdown() {
            if (this.showdropdownflag == false) {
                this.showdropdownflag = true;
            } else {
                this.showdropdownflag = false;
            }
        },
        showDropdown2() {
            if (this.showdropdownflag2 == false) {
                this.showdropdownflag2 = true;
            } else {
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
