import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Register from "../src/components/Register.vue";
import Login from "../src/components/Login.vue";
import store from "./store";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter(to, from, next) {
        if (store.state.user.email) {
          return next();
        }
        return next("/Login");
      }
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
