<template>
<div id="wrapper" class="bg-dark text-light">
    <NavbarVue/>
    <section>
        <router-view />
    </section>
</div>
</template>


<script>

import NavbarVue from "./components/Navbar.vue"

export default {
    data() {
        return {
            showMobileMenu: false,
            pageLoaderIsloaded: false,
        }
    },
    components: {NavbarVue},
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
