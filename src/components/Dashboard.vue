<template>
  <div class="hello">

    <div class="container-fluid containerStyle">
      <div class="row">
        <div class="col-2-sm">


        </div>
      </div>
      <!-- background Image -->
      <img class="imgSize imageLocation" :src="picture" alt="" srcset="">


      <!-- weather Section -->
      <div class="row">
        <div class="col-2-sm weatherLocation ">
          <img class="iconSize textShadow" v-if='weather.weather' :src="'http://openweathermap.org/img/w/' + weather.weather[0].icon + '.png'"
            alt="" srcset="">
          <h3 class="textShadow">{{weather.name}}</h3>
          <h4><span class="textShadow" v-if='weather.main'>{{kelToFehr(weather.main.temp)}}° f -
              {{weather.weather[0].main}}</span></h4>

        </div>
      </div>

      <!-- quote section -->
      <div class="row">
        <div class="col-8 quoteLocation textShadow">
          <h5>"{{quote.quote}}" - {{quote.author}}</h5>
        </div>
      </div>

      <!-- todo section -->
      <div class="container-fluid">
        <div class="row">

          <div class="todoLocation">
            <ul class="list-group">
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Items To Do

                <!-- pull the modal -->
                <button class="buttonBackGround" data-balloon="Add New Item!" data-balloon-pos="up" data-toggle="modal"
                  data-target="#exampleModalCenter" type="button"><i class="fas fa-plus"></i></button>
                <span class="badge badge-primary badge-pill pillLocation">{{uncompletedTodo}}</span>
                <div>
                  <button class="buttonBackGround" data-balloon="Sign Out" data-balloon-pos="up" type="button" @click="logout"
                    v-if="user.email"><i class="fas fa-sign-out-alt"></i></button>
                </div>
              </li>
            </ul>
            <!-- logout button -->

          </div>

          <div class="todoListStyle ">
            <ul class="text-left list-group ">
              <li v-for="(todo, index) in todos" class="list-group-item">
                <div class="custom-control custom-checkbox ">
                  <input @click="updateStatus(todo) " type="checkbox" class="custom-control-input " :id="'customCheck1'+ todo.id"
                    :checked="todo.status">
                  <label class="custom-control-label" :class="striked(todo)" :for="'customCheck1' + todo.id">
                    {{todo.title}}</label>
                  <div class="shake">
                    <button class="buttonBackGround" @click="deleteTodo(todo.id) "><i class="far fa-trash-alt   "></i></button>
                  </div>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>

    <!-- modal Section -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">New To Do</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="message-text" class="col-form-label"></label>
              <form>
                <textarea class="form-control" id="message-text" name="todo" v-model="newTodoItem.title" placeholder="What do you need to do?"
                  required></textarea>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" @click="createTodo(); newTodoItem = {}" class="btn btn-primary" data-dismiss="modal">Add
              To Do</button>
          </div>
        </div>
      </div>
    </div>




    <!-- clock section -->
    <div id="clockDisplay" class="clock textShadow">{{clock()}}</div>
    <div id="greetingDisplay" class=" greetingLocation textShadow">
      <h1>{{greetings()}} {{user.displayName}} !</h1>
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
      this.$store.dispatch("getAllTodoItems", this.user.uid)

    },
    computed: {
      user() {
        return this.$store.state.user
      },
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
      },
      uncompletedTodo() {
        let counter = 0
        this.$store.state.todos.forEach(todo => {
          if (todo.status == false) {
            counter++
          }
        });
        return counter
      }

    },
    methods: {
      createTodo() {
        this.newTodoItem.status = false
        this.newTodoItem.userId = this.user.uid
        this.$store.dispatch("createTodo", this.newTodoItem)
      },
      deleteTodo(id) {
        this.$store.dispatch("removeTodo", id)

      },
      logout() {
        this.$store.dispatch("logout")
      },

      updateStatus(todo) {
        todo.status = !todo.status
        this.$store.dispatch("editStatus", todo)
      },

      kelToFehr(kTemp) {
        return Math.round((kTemp * (9 / 5)) - 459.67)
      },
      striked(todo) {
        return todo.status ? "strikethrough" : ""
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
        if (time < 12) {
          greeting = "Good Morning"
        } else if (time < 20) {
          greeting = "Good Afternoon"
        } else {
          greeting = "Good Evening"
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

  .logoutButton {
    right: 57%;
    bottom: 57%;
    z-index: 6;
  }

  .containerStyle {
    height: 100vh;
  }

  /* ul {
    list-style-type: none;
    padding: 0;
  } */

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

  .list-group-item {
    background-color: rgba(255, 255, 255, 0.8);

  }

  img {
    height: 100%;
    width: 100%;
  }

  /* font awesome style */

  .fa-sign-out-alt {
    background: transparent;
    border: none;
    outline: none
  }

  .fa-trash-alt {
    background: transparent;
    color: black
  }


  .fa-trash-alt:hover {
    background: transparent;
    color: red
  }

  .fa-plus:hover {
    color: green
  }

  .buttonBackGround {
    background: transparent;
    border: none;
    outline: none
  }

  /* weather styling */
  .weatherLocation {
    left: 87%;
    position: absolute;
    bottom: 78%;
    z-index: 2;
    color: white;
  }

  .iconSize {
    height: 5rem;
    width: 5rem
  }

  .quoteLocation {
    left: 15%;
    position: absolute;
    bottom: 5%;
    z-index: 3;
    color: white;

  }

  .todoLocation {
    left: 84%;
    position: absolute;
    bottom: 57%;
    z-index: 4;

  }

  .todoListStyle {
    color: black;
    left: 82%;
    position: absolute;
    bottom: 46%;
    z-index: 4;
    height: 10%;


  }

  /* checkbox style */
  .strikethrough {
    text-decoration: line-through;
  }

  .custom-control-input:hover {
    color: white
  }

  .custom-control-input {
    color: red;
    background: red
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
    left: 36%;
    position: absolute;
    bottom: 35%;
    z-index: 4;
  }

  .pillLocation {
    left: 45%
  }
</style>