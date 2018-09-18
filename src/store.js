import Vue from "vue";
import Vuex from "vuex";
import router from "./router.js";
import firebase from "firebase/app";
import axios from "axios";
import db from "../src/utils/firebaseInit";

Vue.use(Vuex);

let picApi = axios.create({
  baseURL: "http://bcw-sandbox.herokuapp.com/api/images",
  timeout: 5000
});

let weatherApi = axios.create({
  baseURL: "http://bcw-sandbox.herokuapp.com/api/weather",
  timeout: 5000
});
let quoteApi = axios.create({
  baseURL: "http://bcw-sandbox.herokuapp.com/api/quotes",
  timeout: 5000
});

export default new Vuex.Store({
  state: {
    picture: {},
    weather: {},
    quote: {},
    todos: []
    // myTodo: {}
  },

  mutations: {
    setPicture(state, picture) {
      state.picture = picture;
    },
    setWeather(state, weather) {
      state.weather = weather;
    },
    setQuote(state, quote) {
      state.quote = quote;
    },
    setTodo(state, todo) {
      state.todos = todo;
    }
    // setMyTodo(state, todo) {
    //   state.myTodo = todo;
    // }
  },

  actions: {
    getPicture({ commit, dispatch }) {
      picApi.get().then(res => {
        console.log(res.data.url);
        commit("setPicture", res.data.url);
      });
    },
    getWeather({ commit, dispatch }) {
      weatherApi.get().then(res => {
        console.log(res.data);
        commit("setWeather", res.data);
      });
    },

    getQuote({ commit, dispatch }) {
      quoteApi.get().then(res => {
        console.log(res.data);
        commit("setQuote", res.data);
      });
    },

    //#region
    createTodo({ commit, dispatch }, newTodoItem) {
      db.collection("todoList")
        .add(newTodoItem)
        .then(doc => {
          console.log("looking for Id:", doc.id);
          dispatch("getAllTodoItems");
        });
    },
    getAllTodoItems({ commit, dispatch }) {
      db.collection("todoList")
        .get()
        .then(querySnapShot => {
          let todos = [];
          querySnapShot.forEach(doc => {
            let todo = doc.data();
            todo.id = doc.id;
            todos.push(todo);
          });
          commit("setTodo", todos);
        });
    },

    removeTodo({ commit, dispatch }, id) {
      db.collection("todoList")
        .doc(id)
        .delete()
        .then(() => {
          dispatch("getAllTodoItems");
        });
    }

    //#endregion
  }
});
