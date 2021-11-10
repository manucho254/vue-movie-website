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
    path: '/Search/',
    name: 'Search',
    component: Search
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
