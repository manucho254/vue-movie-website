<template>
<div class="column is-3">
    <router-link :to="'/movie/' + movie.id">
        <div class="card has-text-centered">
            <div class="card-image">
                <figure class="image is-4by8 is-grey">
                    <div class="is-flex is-justify-content-space-between">
                        <h3 class="is-capitalized is-black has-text-weight-bold m-2">
                            Movie
                        </h3>
                        <h3 class="is-capitalized has-text-weight-bold m-2">
                            {{ movie.release_date }}
                        </h3>
                    </div>
                    <div v-if="movie.poster_path != null">
                        <img :src="'https://image.tmdb.org/t/p/w1280' + movie.poster_path " alt="movie image">
                    </div>
                    <div v-else>
                        <img src="@/assets/no-image.jpg" alt="no image found">
                    </div>
                </figure>
            </div>

            <div class="card-content is-flex is-justify-content-space-between">
                <h3 class="is-dark has-text-weight-bold">{{ movie.title }}</h3>
                <h3 class="has-text-weight-bold" :class="changeRatingColor(movie.vote_average)">★{{ movie.vote_average }}</h3>
            </div>
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
