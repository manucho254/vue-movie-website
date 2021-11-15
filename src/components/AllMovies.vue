<template>
<div class="column is-3">
    <router-link :to="'/movie/' + movie.id">
        <div class="card">
            <div class="card-image">
                <figure class="image is-4by8 is-grey">
                    <div class="is-flex is-justify-content-space-between">
                        <h3 class="is-capitalized is-black has-text-weight-bold m-2">
                            Movie
                        </h3>
                        <h3 class="is-capitalized is-black m-2">
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
            <div class="card-content overflow is-flex is-justify-content-space-between">
                <h3 class="is-dark has-text-black-bis">{{ movie.title }}</h3>
                <h3 class="has-text-weight-bold">★{{ movie.vote_average }}</h3>
            </div>
            <span :key="genre.id" v-for="(genre, index) in movie.genre_ids">
                {{  genreTypeName(genre, index) }}
            </span>
        </div>
    </router-link>
</div>
</template>

<script>
export default {
    props: {
        movie: Object,
        genres: Object
    },
    mounted () {
        this.genreTypeName()
    },
    methods: {
        genreTypeName(genreId, index) {
            for (const item of this.genres) {
                if (item.id == genreId) {
                    if (this.movie.genre_ids.length - 1 == index) {
                        return item.name
                    } else {
                        return item.name + ","
                    }
                }
            }
        }
    }

}
</script>
