<template>
<div id="wrapper">
 <nav class="navbar is-dark p-3">
       <div class="navbar-brand">
          <router-link to="/" class="navbar-item hero"><h2 class="h2 is-success"><span>Movie</span>Time</h2></router-link>
          <a class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu" @click="showMobileMenu = !showMobileMenu">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
          <div class="is-dark navbar-menu " id="navbar-menu" v-bind:class="{'is-active': showMobileMenu}">
             <div class="navbar-end">
                <router-link to="/" class="navbar-item">Home</router-link>
                <router-link to="/tv-shows/" class="navbar-item">Tv-shows</router-link>
                <router-link to="/movies/" class="navbar-item">Movies</router-link>
                 <div class="navbar-start">
                 <div class="navbar-item">
                    <form method="get" action="/search/">
                      <div class="field has-addons">
                         <div class="contol">
                           <input type="text" class="input border-none is-rounded" 
                              placeholder="what are you looking for?" name="query" v-model="search">
                         </div>
                        <div class="control">
                          <input class="button is-active is-dark" type="submit" value="search">
                        </div>
                      </div>
                    </form>
                 </div>
              </div>
              </div>
          </div>
      </nav>

    <section class="section">
      <!-- <div class="card-content is-flex is-align-items-center is-justify-content-space-between box">
        <h3 class="is-bold is-size-3 mb-4">Popular: </h3>
        <router-link to="/movies/" class="is-dark button"> Movies</router-link>
        <router-link to="/tv-shows/" class="button is-success"> Tv-shows</router-link>
      </div> -->
       <router-view/>
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
input{
  background-color: rgb(195, 224, 195);
}
.footer{
   background-color: rgb(44, 43, 43);
   color: rgb(195, 224, 195);
}
.iframeSizing {
    position: relative;
    width: 100%;
    height: 200px;
}
.iframeSizing iframe{ 
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
}

.imageSize {
  width: 200px;
  height: 300px
}

</style>