import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Movies from '../views/Movies.vue'
import TvShows from '../views/TvShows.vue'
import MovieDetail from '../views/MovieDetail.vue'
import TvShowDetail from '../views/TvShowDetail.vue'
import Search from '../views/Search.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/movies/:',
    name: 'Movies',
    component: Movies
  },

  {
    path: '/tv-shows/:',
    name: 'TvShows',
    component:  TvShows
  },

  {
    path: '/tv-show/:id',
    name: 'TvShowDetail',
    component: TvShowDetail
  },

  {
    path: '/movie/:id',
    name: 'MovieDetail',
    component: MovieDetail
  },
  {
    path: '/search/',
    name: 'Search',
    component: Search
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
