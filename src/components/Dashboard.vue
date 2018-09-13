<template>
  <div class="hello">




    <div class="container-fluid containerStyle">
      <div class="row">
        <div class="col12">

        </div>
      </div>

      <img class="imgSize imageLocation" :src="picture" alt="" srcset="">
      <div class="row">
        <div class="col-2">
          {{weather.main.temp}}
          {{weather.weather.icon}}
          <p>{{weather.name}}</p>
        </div>
      </div>

    </div>




  </div>
</template>

<script>
  export default {
    name: 'Dashboard',
    data() {
      return {

      }
    },
    props: {
      msg: String
    },
    mounted() {
      this.$store.dispatch("getPicture")
      this.$store.dispatch("getWeather")
    },
    computed: {
      picture() {
        return this.$store.state.picture
      },

      weather() {
        return this.$store.state.weather
      }
    },
    methods: {

    },

    components: {

    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container-fluid {
    width: 100%;
    padding-right: 0px;
    padding-left: 0px;
    margin-right: auto;
    margin-left: auto;
  }

  .imageLocation {
    z-index: 1;
  }

  .containerStyle {

    height: 100vh
  }

  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }



  img {
    height: 100%;
    width: 100%;

  }
</style>