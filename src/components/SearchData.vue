<template>
<div class="p-2 border-bottom">
    <router-link :to="'/movie/' + movie.id" class="text-decoration-none" v-if="movie.media_type == 'movie'">
        <div class="d-flex gap-4 text-capitalize">
            <div>
                <span class="text-secondary">{{ movie.media_type }}</span>
                <div v-if="movie.poster_path != null">
                    <img class="drop-image rounded" :src="'https://image.tmdb.org/t/p/w1280' + movie.poster_path " alt="movie image">
                </div>
                <div v-else>
                    <img class="drop-image" src="@/assets/no-image.jpg" alt="no image found">
                </div>
            </div>
            <span class="text-dark">{{ movie.title }}</span>
        </div>
    </router-link>
    <router-link :to="'/tv-show/' + movie.id" 
        class="text-decoration-none" v-else-if="movie.media_type == 'tv'">
        <div class="d-flex gap-4 text-capitalize">
            <div>
                <span class="text-secondary">{{ movie.media_type }}</span>
                <div v-if="movie.poster_path != null">
                    <img class="drop-image rounded" :src="'https://image.tmdb.org/t/p/w1280' + movie.poster_path " alt="movie image">
                </div>
                <div v-else>
                    <img class="drop-image" src="@/assets/no-image.jpg" alt="no image found">
                </div>
            </div>
            <span class="text-dark">{{ movie.name }}</span>
        </div>
    </router-link>
</div>
</template>

<script>
export default {
    props: {
        movie: {
            required: true
        }
    },
}
</script>

<style>
 .drop-image {
    width: 50px !important;
    height: 50px !important;
 }
</style>