<template>
<div id="wrapper">
    <nav class="navbar is-dark p-5">
        <div class="navbar-brand">
            <router-link to="/" class="navbar-item hero">
                <h2 class="h2 is-success"><span>Movie</span>Time</h2>
            </router-link>
            <a class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu" @click="showMobileMenu = !showMobileMenu">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div class="navbar-menu has-background-dark" id="navbar-menu" v-bind:class="{'is-active': showMobileMenu}">
            <div class="navbar-end">
                <router-link to="/" class="navbar-item has-text-light">Home</router-link>
                <router-link to="/tv-shows/" class="navbar-item has-text-light">Tv-shows</router-link>
                <router-link to="/movies/" class="navbar-item has-text-light">Movies</router-link>
                <div class="navbar-start">
                    <div class="navbar-item">
                        <form method="get" action="/search/">
                            <div class="field has-addons">
                                <div class="contol">
                                    <input type="text" class="input border-none is-rounded input-size" placeholder="what are you looking for?" name="query" v-model="search">
                                </div>
                                <div class="control">
                                    <input class="button is-active is-dark" type="submit" value="Search">
                                </div>
                            </div>
                        </form>
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
        <h3 class="is-size-5 mb-5 bg-dark has">
            This free movies streaming, watch movies online, watch tv-series,
            full hd movies online, free tv-series online, watch hd movies
            free, watch series online, watch the walking dead online,
            watch prison break online, watch family guy online
        </h3>
        <p class=" mb-1">Copyright (c) 2021 </p>
    </footer>
</div>
</template>

<script>
export default {
    data() {
        return {
            showMobileMenu: false,
        }
    }
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

.nav-item {
    color: rgb(195, 224, 195);
}

i {
    color: rgb(195, 224, 195);
}

input {
    background-color: rgb(195, 224, 195);
}

.footer {
    background-color: rgb(44, 43, 43);
    color: rgb(195, 224, 195);
}

.imageSize {
    width: 300px;
    height: 300px; 
}

.card-c {
    width: 400px;
    height: 550px;
}

@media (max-width: 768px){
  .card-c {
    width: 180px;
    height: 480px;
  }
  .columns {
      display: flex;
      flex-wrap: wrap;
  }
   .input-size {
     width: 300px;
    }
  router-link:hover {
      background-color: black;
      color: black;
  }
}

.green{
    color: rgb(10, 219, 45);
}
.orange{
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
</style>
