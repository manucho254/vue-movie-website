<template>
<div class="column is-3 ">
    <router-link :to="'/tv-show/' + series.id">
        <div class="card has-text-centered">
            <div class="card-image">
                <figure class="image is-4by8 is-grey" >
                    <div class="is-flex is-justify-content-space-between">
                        <h3 class="is-capitalized is-black has-text-weight-bold m-2">
                            Tv-Show
                        </h3>
                        <h3 class="is-capitalized has-text-weight-bold m-2">
                            {{ series.first_air_date }}
                        </h3>
                    </div>
                    <div v-if="series.poster_path != null">
                        <img  class="image" :src="'https://image.tmdb.org/t/p/w1280' + series.poster_path " alt="movie image">
                    </div>
                    <div v-else>
                        <img  class="image" src="@/assets/no-image.jpg" alt="no image found">
                    </div>
                </figure>
            </div>
            <div class="card-content is-flex is-justify-content-space-between">
                <h3 class="has-text-black-bis has-text-weight-bold">{{ series.name }}</h3>
                <h3 class="has-text-weight-bold " :class='changeRatingColor(series.vote_average)'>★ {{ series.vote_average }}
                </h3>
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
