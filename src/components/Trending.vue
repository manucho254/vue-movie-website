<template>
<div class="col-md-2 col-sm-6">
    <div v-if="movie.media_type == 'movie'">
        <router-link :to="'/movie/' + movie.id" class="text-decoration-none">
            <div class="card">
                <figure class="figure">
                    <div class="d-flex justify-content-between">
                        <p class="text-secondary">
                            {{ movie.media_type }}
                        </p>
                        <p class="text-secondary">
                            {{ movie.first_air_date }} {{ movie.release_date }}
                        </p>
                    </div>
                    <img  class="figure-img img-fluid rounded" :src="'https://image.tmdb.org/t/p/w1280' + movie.poster_path" alt="movie image">
                </figure>
                <div class="card-content overflow is-flex is-justify-content-space-between">
                    <h5 class="has-text-black-bis has-text-weight-bold">{{ movie.title }}{{ movie.name }}</h5>
                    <h3 class="has-text-weight-bold" :class="changeRatingColor(movie.vote_average)">★{{ movie.vote_average }}</h3>
                </div>
            </div>
        </router-link>
    </div>
    <div v-else>
        <router-link :to="'/tv-show/' + movie.id" class="text-decoration-none">
            <div class="card">
                <div class="card-image">
                    <figure class="figure">
                        <h5 class="">{{ movie.media_type }}</h5>
                        <img  class="figure-img img-fluid rounded" :src="'https://image.tmdb.org/t/p/w1280' + movie.poster_path" alt="movie image">
                    </figure>
                </div>
                <div class="card-content d-flex justify-content-between">
                    <p class="text-dark">{{ movie.title }}{{ movie.name }}</p>
                    <p class="text-dark" 
                    :class="changeRatingColor(movie.vote_average)">★{{ movie.vote_average }}</p>
                </div>
            </div>
        </router-link>
    </div>
</div>
</template>

<script>
export default {
    props: {
        movie: Object,
        popularMovies: Object,
        popularTvShows: Object,
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
