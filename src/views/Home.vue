<template>
  <div class="home">
      <h3 class="is-bold is-size-3 mb-4">Latest Movies/</h3>
   
    <div class="columns is-multiline">
     <div class="column is-3">
     <router-link to="/about">  
      <div class="card">
       <div class="card-image">
         <figure class="image is-4by8 is-grey">
           <h3 class="is-size-6 is-bold m-2">Movie</h3>
          <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
         </figure>
       </div>
       <div class="card-content is-flex is-justify-content-space-between">
         <h3 class="is-dark">cool</h3>
         <h3 class="is-green">7.8</h3>
      </div>
      </div>
     </router-link>  
     </div>
   </div>
   <!-- <figure class="image is-16by9">
    <iframe class="has-ratio" width="640" height="360" src="https://www.youtube.com/embed/YE7VzlLtp-4" frameborder="0" allowfullscreen></iframe>
   </figure> -->
  </div>
</template>

<script>
export default {
  name: "Home",
  data () {
    return {
      
    }
  }
}
</script>