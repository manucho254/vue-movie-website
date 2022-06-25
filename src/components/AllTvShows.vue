<template>
<div class="col-md-2 col-sm-6">
    <router-link :to="'/tv-show/' + series.id" class="text-decoration-none">
        <div class="card">
            <figure class="figure">
                <div class="d-flex justify-content-between">
                    <p class="text-secondary">
                        Tv-Show
                    </p>
                    <p class="text-secondary">
                        {{ series.first_air_date }}
                    </p>
                </div>
                <div v-if="series.poster_path != null">
                    <img  class="figure-img img-fluid rounded" :src="'https://image.tmdb.org/t/p/w1280' + series.poster_path " alt="movie image">
                </div>
                <div v-else>
                    <img  class="figure-img img-fluid rounded" src="@/assets/no-image.jpg" alt="no image found">
                </div>
            </figure>
            <div class="card-content d-flex justify-content-between">
                <p class="text-dark">{{ series.name }}</p>
                <p class="text-dark" :class='changeRatingColor(series.vote_average)'>★ {{ series.vote_average }}
                </p>
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
