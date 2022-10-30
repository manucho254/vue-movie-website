<template>
<div class="movie-card">
    <router-link :to="'/tv-show/' + series.id" class="text-decoration-none">
        <div v-if="series.poster_path != null">
            <img  class="figure-img" :src="'https://image.tmdb.org/t/p/w1280' + series.poster_path " alt="movie image">
        </div>
        <div v-else>
            <img  class="figure-img" src="@/assets/no-image.jpg" alt="no image found">
        </div>
        <div class="d-flex justify-content-between">
            <div class="text-dark">{{ series.name }}</div>
            <div class="text-dark" :class='changeRatingColor(series.vote_average)'>★ {{ series.vote_average }}
            </div>
        </div>
    </router-link>
</div>
</template>

<script>
export default {
    props: {
        series: Object,
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
        },
    }
}
</script>
