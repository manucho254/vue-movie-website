<template>
<div>
    <div v-if="movie.media_type == 'movie'">
        <router-link :to="'/movie/' + movie.id">
            
            <div class="is-flex is-justify-content-space-between">
                <h3 class="is-capitalized has-text-weight-bold mb-2">
                    {{ movie.media_type }}
                </h3>
                <span>{{ movie.release_date }}</span>
            </div>
            <div class="is-flex is-justify-content-space-between">
                <div v-if="movie.poster_path != null">
                    <img width="50" height="20" :src="'https://image.tmdb.org/t/p/w1280' + movie.poster_path " alt="movie image">
                </div>
                <div v-else>
                    <img width="50" height="20" src="@/assets/no-image.jpg" alt="no image found">
                </div>
                <h5 class="has-text-black-bis has-text-weight-bold">{{ movie.title }}</h5>
            </div>
        </router-link>
    </div>
    <div v-else-if="movie.media_type == 'tv'">
        <router-link :to="'/tv-show/' + movie.id" class="dropdown-item">
            
                <div class="is-flex is-justify-content-space-between">
                    <h3 class="is-capitalized has-text-weight-bold mb-2">
                        {{ movie.media_type }}
                    </h3>
                    <span>{{ series.first_air_date }}</span>
                </div>
                <div class="is-flex is-justify-content-space-between">
                    <div v-if="movie.poster_path != null">
                        <img width="30" height="20" :src="'https://image.tmdb.org/t/p/w1280' + movie.poster_path " alt="movie image">
                    </div>
                    <div v-else>
                        <img  width="30" height="20" src="@/assets/no-image.jpg" alt="no image found">
                    </div>
                    <h5 class="has-text-black-bis has-text-weight-bold">{{ movie.name }}</h5>
                </div>
        </router-link>
    </div>
    <div v-else-if="movie.media_type == 'people'"></div>
</div>

</template>

<script>
export default {
    props: {
        movie: Object
    },
    data() {
        
    },
}
</script>