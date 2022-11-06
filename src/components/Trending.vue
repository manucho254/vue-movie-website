<template>
<div class="movie-card text-capitalize mx-4">
    <router-link :to="'/movie/' + movie.id" class="text-decoration-none" v-if="movie.media_type == 'movie'">
        <div class="d-flex justify-content-between p-2">
            <div>{{ movie.media_type }}</div> 
            <div>{{ movie.release_date }}</div>
        </div>
        <img  class="figure-img" :src="'https://image.tmdb.org/t/p/w1280' + movie.poster_path" alt="movie image">
        <div class="d-flex justify-content-between text-dark">
            <span >{{ movie.title }}</span>
            <span :class="changeRatingColor(movie.vote_average)">★{{ movie.vote_average }}</span>
        </div>
    </router-link>
    <router-link :to="'/tv-show/' + movie.id" class="text-decoration-none" v-else>
        <div class="d-flex justify-content-between p-2">
            <span>{{ movie.media_type }}</span> 
            <span>{{ movie.first_air_date }}</span>
        </div>
        <img  class="figure-img" :src="'https://image.tmdb.org/t/p/w1280' + movie.poster_path" alt="series image">
        <div class="d-flex justify-content-between text-dark">
            <span>{{ movie.name }}</span>
            <span :class="changeRatingColor(movie.vote_average)">★{{ movie.vote_average }}</span>
        </div>
    </router-link>
</div>
</template>

<script>
export default {
    props: {
        movie: Object,
    },
    mounted() {
        this.changeRatingColor()
    },
    methods: {
        changeRatingColor(vote) {
            if (vote >= 8) {
                return 'green';
            } else if (vote >= 5) {
                return 'orange';
            } else {
                return 'red';
            }
        }
    }
}
</script>

<style>
.figure-img {
    width: 200px !important;
    height:250px !important;
}
.figure-img:hover {
    transition: 3s ease-in-out linear;
    cursor: pointer;
}
.movie-card {
    width: 200px !important;
}
</style>
