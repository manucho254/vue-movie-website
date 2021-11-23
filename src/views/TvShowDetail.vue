<template>
<div class="series-detail">
    <div class="container ">
        <h1 class="has-text-weight-bold has-text-dark is-size-3 has-text-start"> {{ series.name }} </h1>
        <select class="dropdown" v-model="seasons" @change="seasonSelected($event)">
            <option class="dropdown" selected id="seasons" :key="season.id" v-for="season in series.number_of_seasons" :value="season">Season {{ season }} </option>
        </select>

        <select class="dropdown" v-model="episodes" @change="episodeSelected($event)">
            <option class="dropdown" :key="episode.id" v-for="episode in seasonAndepisodes" :episode="episode" :value="episode.episode_number">Episode {{ episode.episode_number }}</option>
        </select>
        <div class="card mb-5">
            <figure class="image is-16by9">
                <!-- sandbox="allow-scripts allow-same-origin" -->
                <iframe class="has-ratio" width="640" height="100" :src='link' frameborder="0" allowfullscreen>
                </iframe>
            </figure>
        </div>

        <div class="box has-background-dark">
            <div class="is-flex p-4 is-mobile">
                <div v-if="series.poster_path != null">
                    <img class="imageSize is-hidden-touch" :src="'https://image.tmdb.org/t/p/w1280' + series.poster_path " alt="movie image">
                </div>
                <div v-else>
                    <img class="imageSize" src="@/assets/no-image.jpg" alt="black image">
                </div>
                <!--  -->
                <div class="ml-5 has-text-light p-4">
                    <h1 class="has-text-weight-bold is-size-3"> {{ series.name }}</h1>

                    <span class="is-size-6 has-text-weight-bold"><i class="fa fa-star star"></i>
                        {{ series.vote_average }} | Released: {{ series.first_air_date }}
                        <span v-for="genre in series.genres" :key="genre.id" :genre="genre">
                            {{ " | " + genre.name }}
                        </span>
                    </span>

                    <p class="mt-5 is-size-5 has-text-light-grey is-flex is-justify-content-center">
                        {{ series.overview }}
                    </p>

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
                        <button class="button has-background-black-bis has-text-light my-5" @click="showModal">
                            <i class="fa fa-play-circle "> Trailer</i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <h1 class="has-text-weight-bold is-size-4 mb-2 is-hidden-touch has-text-black"> Cast : </h1>
        <div class="box is-flex has-background-dark has-text-light is-hidden-touch">
            <div class="columns is-multiline mt-3">
                <div class="column is-1" :key="cast.id" v-for="cast in credits">
                    <figure class="image is-12by5">
                        <div v-if="cast.profile_path != null">
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
    name: "TvSeriesDetail",
    data() {
        return {
            showModalflag: false,
            series: [],
            trailers: [],
            seasonAndepisodes: [],
            credits: [],
            seasons: 1,
            episodes: 1,
            link: '',
        }
    },
    mounted() {
        this.fetchSeries(this.$route.params.id)
        this.getSeriesTrailer(this.$route.params.id)
        this.getSeasonEpisodes(this.$route.params.id, this.seasons)
        this.getCredits(this.$route.params.id)
        this.getVideoEmbed()
    },
    methods: {
        async fetchSeries(seriesID) {
            document.title = `Tv-series | `
            this.$store.commit('setIsLoading', true)

            axios.get(`/tv/${seriesID}?api_key=${env.apikey}`)
                .then(response => {
                    this.series = response.data
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
                })
                .catch(error => {
                    console.log(error)
                })
            this.$store.commit('setIsLoading', false)
        },
        async getSeasonEpisodes(seriesID) {
            await axios
                .get(`/tv/${seriesID}/season/${this.seasons}?api_key=${env.apikey}`)
                .then(response => {
                    this.seasonAndepisodes = response.data.episodes
                })
                .catch(error => {
                    console.log(error)
                })
        },
        async getCredits(seriesID) {
            await axios
                .get(`/tv/${seriesID}/credits?api_key=${env.apikey}`)
                .then(response => {
                    this.credits = response.data.cast
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getVideoEmbed() {
            this.link = `https://www.2embed.ru/embed/tmdb/tv?id=${this.$route.params.id}&s=${this.seasons}&e=${this.episodes}`
        },
        seasonSelected(event) {
            this.seasons = event.target.value;
            this.getSeasonEpisodes(this.$route.params.id, this.seasons)
            this.link = `https://www.2embed.ru/embed/tmdb/tv?id=${this.$route.params.id}&s=${this.seasons}&e=${this.episodes}`
        },
        episodeSelected(event) {
            this.episodes = event.target.value;
            this.link = `https://www.2embed.ru/embed/tmdb/tv?id=${this.$route.params.id}&s=${this.seasons}&e=${this.episodes}`
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
    color: rgb(77, 180, 36);
}
</style>
