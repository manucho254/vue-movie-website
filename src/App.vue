<template>
<div id="wrapper">
    <nav class="navbar is-dark p-5">
        <div class="navbar-brand">
            <router-link to="/" class="navbar-item hero">
                <h3 class="h2 is-success"><span>Movie</span>Time</h3>
            </router-link>
            <a class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu" @click="showMobileMenu = !showMobileMenu">
                <div v-if="!showMobileMenu">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </div>
                <div class="has-text-centered is-size-4 mt-2" v-else>
                    <i class="fas fa-times"></i>
                </div>
            </a>
        </div>
        <div class="navbar-menu is-hoverable" id="navbar-menu" v-bind:class="{'is-active': showMobileMenu}">
            <div class="navbar-end">
                <router-link to="/" class="navbar-item">Home</router-link>
                <router-link to="/tv-shows/" class="navbar-item ">Tv-shows</router-link>
                <router-link to="/movies/" class="navbar-item">Movies</router-link>
                <div class="navbar-start">
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
    }

    .resize-card-phone {
        width: 100%;
        padding: 0;
        margin: 0;
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
</style>
