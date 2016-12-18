var Vue = require("vue");
var VueRouter = require("vue-router");
var VueSocketIo = require("vue-socket.io").default;

Vue.use(VueRouter);
Vue.use(VueSocketIo, require("socket.io-client")());

var router = new VueRouter({
  routes: [
    {
      path: "/",
      component: require("./routes/index.vue")
    },
    {
      path: "/main",
      component: require("./routes/main.vue")
    },
    {
      path: "/getcode",
      component: require("./routes/getcode.vue")
    },
    {
      path: "/entercode",
      component: require("./routes/entercode.vue")
    },
    {
      path: "/force",
      component: require("./routes/force.vue")
    },
    {
      path: "/final",
      component: require("./routes/final.vue")
    },
    {
      path: "/leaderboard",
      component: require("./routes/leaderboard.vue")
    }
  ]
});

new Vue({
  el: "#app",
  router: router,
  template: "<App />",
  components: {
    App: require("./App.vue")
  }
});
