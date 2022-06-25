<template>
<div id="wrapper" class="has-background-light">
    <div class="page-loader" v-if="!pageLoaderIsloaded">
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
    </div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="navbar-brand">
            <router-link to="/" class="navbar-item nav-link">
                <h3 class="h2 is-success"><span>Movie</span>Time</h3>
            </router-link>
        </div>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <router-link to="/" class="navbar-item nav-link"><h5 class="has-text-light">Home</h5></router-link>
            <router-link to="/tv-shows/" class="navbar-item nav-link"><h5 class="has-text-light">Tv-shows</h5></router-link>
            <router-link to="/movies/" class="navbar-item nav-link"><h5 class="has-text-light">Movies</h5></router-link>
            <div class="form-inline my-2 my-lg-0">
                <div class="dropdown is-active">
                    <form v-on:submit.prevent>
                        <div class="d-flex">
                            <div class="control">
                                <input id="search" type="text" @keyup="Search" 
                                class="form-control border-none rounded-pill input-size" 
                                placeholder="search movie" v-model="search">
                            </div>
                        </div>
                    </form>
                    <div class="dropdown-menu w-75" v-if="show == true" id="dropdown-menu" role="menu">
                        <div class="dropdown-content" v-for="movie in movies" :key="movie.id">
                            <hr class="dropdown-divider">
                               <div class="dropdown-item" v-if="movie">
                                  <SearchData :movie="movie"/>
                               </div>
                        </div>
                    </div>
            </div>
        </div>
        </div>
        </nav>
    <div class="is-loading-bar has-text-centered" v-bind:class="{'is-loading': $store.state.isLoading}">
        <div class="lds-dual-ring"></div>
    </div>

    <section class="section">
        <router-view />
    </section>
    <footer class="footer has-text-centered">
        <p class="mb-5 bg-dark">
            This free movies streaming, watch movies online, watch tv-series,
            full hd movies online, free tv-series online, watch hd movies
            free, watch series online, watch the walking dead online,
            watch prison break online, watch family guy online
        </p>
        <p class=" mb-1">Copyright (c) 2021 </p>
    </footer>
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
            show: false
        }
    },
    components: {SearchData},
    methods: {
        checkSearchBox (){
            if (this.search == ""){
                show == false
                this.movies = []
            }
        },
        Search(){
          this.checkSearchBox()
          if (this.search == ""){
            this.movies = []
          }else{
           axios.get(`search/multi?api_key=${env.apikey}&page=1&query=${this.search}&include_adult=false`)
            .then(response => {
                if(response.data.results.length > 0 && this.search !== ""){
                    this.show = true
                    this.movies = response.data.results
                }else{
                    this.show = false
                    this.movies = [] 
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
    width: 300px;
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

    .dropdown {
        width: 100px;
        text-align: center;
        margin: 1rem;
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

.dropdown-menu{
    max-height: 200px;
    overflow-y: scroll;
}

</style>
