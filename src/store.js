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
    user: {},
    picture: {},
    weather: {},
    quote: {},
    todos: [],
    status: true
    // myTodo: {}
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
    },

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
          dispatch("getAllTodoItems", newTodoItem.userId);
        });
    },
    getAllTodoItems({ commit, dispatch }, userId) {
      db.collection("todoList")
        .where("userId", "==", userId)
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

    removeTodo({ commit, dispatch, state }, id) {
      db.collection("todoList")
        .doc(id)
        .delete()
        .then(() => {
          dispatch("getAllTodoItems", state.user.uid);
        });
    },

    editStatus({ commit, dispatch }, todo) {
      db.collection("todoList")
        .doc(todo.id)
        .update(todo)
        .then(res => {
          console.log(res);
        });

      dispatch("getAllTodoItems", todo.userId);
    },

    //#endregion

    // User Register and Authentication
    register({ commit, dispatch }, user) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          router.push("/dashboard");
          commit("setUser", res.user);
          firebase
            .auth()
            .currentUser.updateProfile({ displayName: user.displayName })
            .then(res => {
              console.log("Profile Updated");
            })
            .catch(err => {
              console.error(err);
            });
          firebase
            .auth()
            .currentUser.sendEmailVerification()
            .then(res => {
              console.log("Verification Email Sent");
            })
            .catch(err => {
              console.error(err);
            });
        })
        .catch(err => {
          console.error(err);
        });
    },
    login({ commit, dispatch }, user) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          router.push("/src/components/Dashboard.vue");
          commit("setUser", res.user);
        })
        .catch(err => {
          console.error(err);
        });
    },
    logout({ commit, dispatch }) {
      firebase
        .auth()
        .signOut()
        .then(res => {
          router.push("/login");
          commit("setUser", {});
        })
        .catch(err => {
          console.error(err);
        });
    },
    authenticate({ commit, dispatch }) {
      // you can change the default route here
      //if someone is signed in, it goes to dashboard, if not, go to auth
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          commit("setUser", user);
          dispatch("getAllTodoItems");
          router.push("/src/components/Dashboard.vue");
        } else {
          commit("setUser", {});
          router.push("/src/components/Login.vue");
        }
      });
    }
  }
});
