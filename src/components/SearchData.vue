<template>
<div >
    <div v-if="movie.media_type == 'movie'">
        <router-link :to="'/movie/' + movie.id" class="text-decoration-none">
            
            <div class="d-flex justify-content-between">
                <p class="text-secondary">
                    {{ movie.media_type }}
                </p>
                <p class="text-dark">{{ movie.release_date }}</p>
            </div>
            <div class="d-flex justify-content-between">
                <div v-if="movie.poster_path != null">
                    <img class="img-fluid rounded" width="50" height="20" :src="'https://image.tmdb.org/t/p/w1280' + movie.poster_path " alt="movie image">
                </div>
                <div v-else>
                    <img class="img-fluid rounded" width="50" height="20" src="@/assets/no-image.jpg" alt="no image found">
                </div>
                <p class="text-dark">{{ movie.title }}</p>
            </div>
        </router-link>
    </div>
    <div v-else-if="movie.media_type == 'tv'">
        <router-link :to="'/tv-show/' + movie.id" class="text-decoration-none">
            
                <div class="d-flex justify-content-between">
                    <p class="text-secondary">
                        {{ movie.media_type }}
                    </p>
                    <p class="text-secondary">{{ movie.first_air_date }}</p>
                </div>
                <div class="d-flex justify-content-between">
                    <div v-if="movie.poster_path != null">
                        <img class="img-fluid rounded" width="30" height="20" :src="'https://image.tmdb.org/t/p/w1280' + movie.poster_path " alt="movie image">
                    </div>
                    <div v-else>
                        <img class="img-fluid rounded" width="30" height="20" src="@/assets/no-image.jpg" alt="no image found">
                    </div>
                    <p class="text-dark">{{ movie.name }}</p>
                </div>
        </router-link>
    </div>
    <div v-else-if="movie.media_type == 'people'"></div>
</div>

</template>

<script>
export default {
    props: {
        movie: Object,
    },
    data() {
        
    },
}
</script>