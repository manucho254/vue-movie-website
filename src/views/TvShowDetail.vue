<template>
<div class="pt-5">
    <div class="px-3 d-flex flex-column">
        <div class="d-flex gap-5">
            <div class="">
                <figure class="figure">
                    <iframe class="has-ratio" width="640" height="450" 
                        :src='"https://www.youtube.com/embed/" +  trailer.key' frameborder="0" allowfullscreen>
                    </iframe>
                </figure>
            </div>
            <div class="d-flex flex-column">
                <div class="d-flex gap-4">
                    <div v-if="series.poster_path != null">
                        <img class="figure-img rounded" :src="'https://image.tmdb.org/t/p/w1280' + series.poster_path " alt="movie image">
                    </div>
                    <div v-else>
                        <img class="image-size rounded" src="@/assets/no-image.jpg" alt="black image">
                    </div>
                    <div class="d-flex flex-column gap-2">     
                        <h3 class="font-weight-bold"> {{ series.name }}</h3>
                        <span><i class="fa fa-star star"></i> 
                             Rating: {{ series.vote_average }}
                        </span> 
                        <span>Released: {{ series.first_air_date  }}</span>
                        <span> Genres: {{ genres }} </span>
                    </div>
                </div>
                <div class="ml-5 has-text-light ">

                    <span>Overview:</span>
                    <p class="mt-3 text-secondary">
                        {{ series.overview }}
                    </p>
                    <div>
                </div>
            </div>
        </div>
        </div>

        <h3 class="font-weight-bold mb-3"> Cast: </h3>
            <div class="d-flex rounded flex-wrap gap-2">
                <div class="cast-card" v-for="(cast, index) in credits" :key="index">
                    <img class="image-size" :src="'https://image.tmdb.org/t/p/w1280' + cast.profile_path" alt="movie image">
                    <p class="text-start"> {{ cast.name }} </p>
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
            seasonAndepisodes: [],
            credits: [],
            trailer: "",
            genres: {},
        }
    },
    mounted() {
        this.fetchSeries(this.$route.params.id)
        this.getSeriesTrailer(this.$route.params.id)
        this.getCredits(this.$route.params.id)
    },
    methods: {
        async fetchSeries(seriesID) {
            document.title = `Tv-series | `
            this.$store.commit('setIsLoading', true)

            axios.get(`/tv/${seriesID}?api_key=${env.apikey}`)
                .then(response => {
                    this.series = response.data
                    let genres = [];
                    this.series.genres.forEach(
                        (item) => genres.push(item.name)
                    )
                    this.genres = genres.join();
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
                    let trailers = response.data.results
                    this.trailer = trailers[0]
                })
                .catch(error => {
                    console.log(error)
                })
            this.$store.commit('setIsLoading', false)
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
.cast-card {
    width: 100px !important;
    height: 150px !important;
}

.image-size {
    width: 100px !important;
    height: 100px !important;
    border-radius: 4px;
}
.star {
    color: rgb(219, 90, 13);
}
@media (max-width: 768px) {
    iframe {
        width: 100%;
    }
    .box {
        width: 100vw;
        height: 10%;
        font-size: 2px;
    }
}
</style>
