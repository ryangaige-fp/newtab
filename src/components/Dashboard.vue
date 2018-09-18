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
        <div class="col-2 weatherLocation ">
          <img class="imgSize textShadow" v-if='weather.weather' :src="weather.weather.icon" alt="" srcset="">
          <p class="textShadow" v-if='weather.main'>{{weather.weather.main}}</p>
          <h4><span class="textShadow" v-if='weather.main'>{{kelToFehr(weather.main.temp)}}°</span></h4>
          <h3 class="textShadow">{{weather.name}}</h3>
        </div>
      </div>

      <!-- quote section -->
      <div class="row">
        <div class="col-8 quoteLocation textShadow">
          <h5>"{{quote.quote}}" - {{quote.author}}</h5>
        </div>
      </div>

      <!-- todo section -->
      <div class="container">
        <div class="row">
          <div class="col-4 todoLocation">
            <form @submit.prevent="createTodo(); newTodoItem = {}">
              <input type="text" name="todo" v-model="newTodoItem.title" placeholder="Things To do!">
              <button type="submit"><i class="fas fa-plus"></i></button>
            </form>
          </div>


          <div class="col-6 todoListStyle ">
            <ul class="col-4 text-left ">
              <li v-for="(todo, index) in todos">
                <div class="custom-control custom-checkbox textShadow">
                  <input type="checkbox" class="custom-control-input " :id="'customCheck1'+ todo.id">
                  <label class="custom-control-label strikethrough textShadow" :for="'customCheck1' + todo.id">
                    {{todo.title}}</label>
                  <button class="buttonBackGround" @click="deleteTodo(todo.id) "><i class="far fa-trash-alt textShadow  "></i></button>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>

    <!-- clock section -->
    <div id="clockDisplay" class="clock textShadow">{{clock()}}</div>
    <div id="greetingDisplay" class=" greetingLocation textShadow">
      <h2>{{greetings()}}</h2>
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
      },
      deleteTodo(id) {
        this.$store.dispatch("removeTodo", id)

      },
      kelToFehr(kTemp) {
        return Math.round((kTemp * (9 / 5)) - 459.67)
      },

      clock() {
        let time = new Date(),
          hours = time.getHours(),
          minutes = time.getMinutes(),
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

        return time = hours + ":" + minutes + " " + period;

      },

      greetings() {
        let greeting
        let time = new Date().getHours()
        if (time < 10) {
          greeting = "Good Morning!"
        } else if (time < 20) {
          greeting = "Good Day!"
        } else {
          greeting = "Good Evening!"
        }
        return greeting
      }

    },

    components: {}

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
    text-shadow: 3px 2px 16px #000000;
  }

  img {
    height: 100%;
    width: 100%;
  }

  .fa-trash-alt {
    background: transparent;
    color: white
  }

  .fa-trash-alt:hover {
    background: transparent;
    color: red
  }

  .buttonBackGround {
    background: transparent;
    border: none
  }


  .weatherLocation {
    left: 81%;
    position: absolute;
    bottom: 81%;
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
    left: 73%;
    position: absolute;
    bottom: 62%;
    z-index: 4;

  }

  .todoListStyle {
    color: white;
    left: 82%;
    position: absolute;
    bottom: 46%;
    z-index: 4;
    height: 10%;


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

  .greetingLocation {
    color: white;
    left: 32%;
    position: absolute;
    bottom: 35%;
    z-index: 4;


  }
</style>