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
                <router-link to="/tv-shows/" class="navbar-item">Tv-shows</router-link>
                <router-link to="/movies/" class="navbar-item">Movies</router-link>
                 <div class="navbar-start">
                 <div class="navbar-item">
                    <form method="get" action="/search">
                      <div class="field has-addons">
                         <div class="contol">
                           <input type="text" class="input border-none" placeholder="what are you looking for?" name="query">
                         </div>
                        <div class="control">
                          <button class="button is-active is-dark">
                              <i class="fas fa-search"> Search</i>
                          </button>
                        </div>
                      </div>
                    </form>
                 </div>
              </div>
              </div>
          </div>
      </nav>
    <section class="section">
       <router-view/>
    </section>

   <footer class="footer">
     <p class="has-text-centered">Copyright (c) 2021 </p>
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

</style>