<template>
<div class="movie-card has-text-centered">
    <router-link :to="'/movie/' + movie.id" class="text-decoration-none">
        <div v-if="movie.poster_path != null">
            <img class="figure-img " :src="'https://image.tmdb.org/t/p/w1280' + movie.poster_path " alt="movie image">
        </div>
        <div v-else>
            <img class="figure-img" src="@/assets/no-image.jpg" alt="no image found">
        </div>

        <div class="card-content d-flex justify-content-between">
            <p class="text-dark">{{ movie.title }}</p>
            <p class="text-dark" 
            :class="changeRatingColor(movie.vote_average)">★{{ movie.vote_average }}</p>
        </div>
    </router-link>
</div>
</template>

<script>
export default {
    props: {
        movie: Object,
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
        },
    }

}
</script>
