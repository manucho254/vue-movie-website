<template>
<div id="wrapper" class="has-background-light">
    <nav class="navbar d-flex justify-content-between navbar-expand-lg navbar-dark bg-dark">
        <div class="navbar-brand">
            <router-link to="/" class="navbar-item nav-link">
                <h3 class="h2 is-success"><span>Movie</span>Time</h3>
            </router-link>
        </div>
        <div>
            <form v-on:submit.prevent>
                <input id="search" type="text" @keyup="Search" 
                    class="form-control border-none rounded-pill input-size" 
                    placeholder="search movie" v-model="search">
            </form>
            <div class="card position-absolute w-25 custom-dropdown" v-if="show == true">
                <SearchData :movie="movie" v-for="(movie, index) in movies" :key="index" v-if="show == true"/>
            </div>
        </div>
        <div class="d-flex justify-content-end">
            <router-link to="/" class="navbar-item nav-link">
                <h5 class="text-light">Home</h5>
            </router-link>
            <router-link to="/tv-shows/" class="navbar-item nav-link">
                <h5 class="text-light">Tv-shows</h5>
            </router-link>
            <router-link to="/movies/" class="navbar-item nav-link">
                <h5 class="text-light">Movies</h5>
            </router-link>
        </div>
    </nav>

    <section>
        <router-view />
    </section>
</div>
</template>


<script>

import axios from "axios"
import env from '@/env.js'
import SearchData from "@/components/SearchData"

export default {
    data() {
        return {
            showMobileMenu: false,
            pageLoaderIsloaded: false,
            search: "",
            movies: [],
            show: false,
        }
    },
    components: {SearchData},
    methods: {
        Search(){
            if (this.search == ""){
                this.show = false
                this.movies = []
            }else{
                axios.get(`search/multi?api_key=${env.apikey}&page=1&query=${this.search}&include_adult=false`)
                .then(response => {
                    console.log(response.data.results.length)
                    if (response.data.results.length > 0) {
                        this.show = true
                        this.movies = response.data.results.filter(
                            (item) => item.media_type == 'tv' || item.media_type == 'movie'
                        )
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            }
        },
        changeRatingColor(vote) {
            if (vote >= 8) {
                return 'green';
            } else if (vote >= 5) {
                return 'orange';
            } else {
                return 'red';
            }
        }
    },
    mounted() {
      document.onreadystatechange = () => {
        if (document.readyState == "complete") { 
          this.pageLoaderIsloaded = true;
        } 
      }
    },
}
</script>

<style>

.h2 {
    color: rgb(49, 216, 49);
    font-size: 30px;
    font-weight: bold;
    font-style: italic;
}

.h2 span {
    color: rgb(195, 224, 195);
}

.i {
    color: rgb(195, 224, 195);
}

.img {
    width: 100%;
    height: 50px;
}

.drop_images{
    width: 20px;
    height: 20px;
}

input {
    background-color: rgb(195, 224, 195);
}

.footer {
    background-color: rgb(44, 43, 43);
    color: rgb(195, 224, 195);
}


.imageSize {
    width: 500px;
    height: 300px;
    object-fit: fill;
}

.cast-images {
    border-radius: 50%;
}

.card-c {
    width: 400px;
    height: 550px;
}

.input-size {
    width: 500px;
    height: 40px;
}

 .resize-card-phone {
        width: 100%;
}

@media (max-width: 768px) {
    .card-c {
        width: 180px;
        height: 480px;
    }

    .columns {
        display: flex;
        flex-wrap: wrap;
    }

    .input-size {
        width: 200px;
    }
}

.green {
    color: rgb(10, 219, 45);
}

.orange {
    color: orange;
}

.red {
    color: red;
}

.lds-dual-ring {
    display: inline-block;
    width: 80px;
    height: 80px;
}

.lds-dual-ring:after {
    content: "";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #ccc;
    border-color: #ccc transparent #ccc transparent;
    animation: lds-dual-ring 1.2s linear infinite;
}

.custom-dropdown {
    overflow-y: scroll;
    max-height: 600px;
}

</style>
