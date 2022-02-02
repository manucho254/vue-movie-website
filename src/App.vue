<template>
<div id="wrapper" class="has-background-light">
    <div class="page-loader" v-if="!pageLoaderIsloaded">
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
    </div>
    <nav class="navbar is-dark p-5">
        <div class="navbar-brand">
            <router-link to="/" class="navbar-item hero">
                <h3 class="h2 is-success"><span>Movie</span>Time</h3>
            </router-link>
        </div>
        <div class="is-flex is-justify-content-space-between">
            <hr>
            <router-link to="/" class="navbar-item"><h5 class="has-text-light">Home</h5></router-link>
            <router-link to="/tv-shows/" class="navbar-item"><h5 class="has-text-light">Tv-shows</h5></router-link>
            <router-link to="/movies/" class="navbar-item"><h5 class="has-text-light">Movies</h5></router-link>
        </div>
        <div class="navbar-end">
            <div class="navbar-item">
                <form method="get" action="/search/">
                    <div class="field has-addons">
                        <div class="control">
                            <input type="text" class="input border-none is-rounded input-size" placeholder="what do you want to watch?" name="query" v-model="search">
                        </div>
                        <div class="control">
                            <input class="button has-background-black is-dark is-rounded" type="submit" value="Search">
                        </div>
                    </div>
                </form>
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


export default {
    data() {
        return {
            showMobileMenu: false,
            pageLoaderIsloaded: false,
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

<style lang="scss">
@import '../node_modules/bulma';

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

.dropdown {
    position: relative;
    width: 200px;
    height: 30px;
    background-color: rgb(58, 61, 58);
    color: white;
    border: hidden;
    border-radius: 20px;
    font-family: inherit;
    font-weight: bold;
    font-weight: 15px;
    margin: 1rem;
    text-align: center;
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
        width: 250px;
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

@keyframes lds-dual-ring {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.is-loading-bar {
    height: 0;
    overflow: hidden;

    -webkit-transition: all 0.3s;
    transition: all 0.3s;

    &.is-loading {
        height: 80px;
    }
}

$colors: #8CC271, #69BEEB, #F5AA39, #E9643B;
  // -----------------------------------------------------
  .page-loader {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #333;
    z-index: 999;
  }
  
  .cube{
    width: 40px;
    height: 40px;
    margin-right: 10px;
    @for $i from 1 through length($colors) {
      &:nth-child(#{$i}) {
        background-color: nth($colors, $i);
      }
    }
    &:first-child {
      animation: left 1s infinite;
    }
    &:last-child {
      animation: right 1s infinite .5s;
    }
  }
  // -----------------------------------------------------
  @keyframes left {
    40% {
      transform: translateX(-60px);
    }
    50% {
      transform: translateX(0);      
    }
  }
  @keyframes right {
    40% {
      transform: translateX(60px);
    }
    50% {
      transform: translateX(0);
    }
  }
</style>
