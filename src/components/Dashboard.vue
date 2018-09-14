<template>
  <div class="hello">




    <div class="container-fluid containerStyle">
      <div class="row">
        <div class="col12">

        </div>
      </div>
      <!-- background Image -->
      <img class="imgSize imageLocation" :src="picture" alt="" srcset="">

      <!-- weather Section -->
      <div class="row">
        <div class="col-2 weatherLocation">
          <p><span v-if='weather.main' class="textShadow">{{weather.main.temp}}°</span></p>
          <p>{{weather.name}}</p>
        </div>
      </div>

      <!-- quote section -->
      <div class="row">
        <div class="col-8 quoteLocation">
          <p>"{{quote.quote}}" - {{quote.author}}</p>
        </div>
      </div>

      <!-- todo section -->
      <div class="container">
        <div class="row">
          <div class="col-4 todoLocation">
            <form @submit.prevent="createTodo(); newTodoItem = {}">
              <input type="text" name="todo" v-model="newTodoItem.title" placeholder="What needs to be done?">
              <button type="submit"><i class="fas fa-plus"></i></button>
            </form>
          </div>

          <ul class="col-4 todoListStyle">
            <li v-for="(todo, index) in todos">
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="customCheck1">
                <label class="custom-control-label strikethrough" for="customCheck1">{{todo.title}}</label>
              </div>

            </li>
          </ul>

        </div>
      </div>
    </div>
    <div id="clockDisplay" class="clock">


    </div>



  </div>
</template>

<script>
  export default {
    name: 'Dashboard',
    data() {
      return {
        newTodoItem: {},
        // todos: {}

      }
    },
    props: {
      msg: String
    },
    mounted() {
      this.$store.dispatch("getPicture")
      this.$store.dispatch("getWeather")
      this.$store.dispatch("getQuote")
      this.$store.dispatch("getAllTodoItems")

    },
    computed: {
      picture() {
        return this.$store.state.picture
      },

      weather() {
        return this.$store.state.weather
      },
      quote() {
        return this.$store.state.quote
      },
      todos() {
        return this.$store.state.todos
      }

    },
    methods: {
      createTodo() {
        this.$store.dispatch("createTodo", this.newTodoItem)
      }
    },

    components: {

    }

  }


  function clock() {
    let time = new Date(),
      hours = time.getHours(),
      minutes = time.getMinutes(),
      seconds = time.getSeconds(),
      period = "am";

    if (hours >= 12) {
      period = "pm"
    }
    if (hours > 12) {
      hours = hours - 12
    }
    if (minutes < 10) {
      minutes = '0' + minutes
    }
    if (seconds < 10) {
      seconds = '0' + seconds
    }
    document.querySelectorAll('.clock')[0].innerHTML = hours + ":" + minutes + ":" + seconds + " " + period;


    return time;
  }

  setInterval(clock, 1000);



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

    height: 100vh;

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

  .textShadow {
    text-shadow: 1px, 1px, 2px, black
  }

  img {
    height: 100%;
    width: 100%;

  }

  .weatherLocation {
    left: 84%;
    position: absolute;
    bottom: 85%;
    z-index: 2;
    color: white;
  }

  .quoteLocation {
    left: 15%;
    position: absolute;
    bottom: 5%;
    z-index: 3;
    color: white;
  }

  .todoLocation {
    left: 57%;
    position: absolute;
    bottom: 35%;
    z-index: 4;

  }

  .todoListStyle {
    color: white;
    left: 57%;
    position: absolute;
    bottom: 15%;
    z-index: 4;
  }

  input[type=checkbox]:checked+label.strikethrough {
    text-decoration: line-through;
  }


  .clock {
    font-size: 10em;
    color: white;
    left: 30%;
    position: absolute;
    bottom: 40%;
    z-index: 4;
  }
</style>