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

export default new Vuex.Store({
  state: {
    picture: {},
    weather: {}
  },

  mutations: {
    setPicture(state, picture) {
      state.picture = picture;
    },
    setWeather(state, weather) {
      state.weather = weather;
    }
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
        console.log(res.data.weather);
        commit("setWeather", res.data.weather);
      });
    }
  }
});
