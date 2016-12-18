<template>
  <transition name="test" appear-class="animated bounce" appear>
    <div>
      <h2>Hello {{user.name}}!</h2>
      <router-link class="button" to="getcode">Get code</router-link>
      <router-link class="button" to="entercode">Enter code</router-link>
      <router-link class="button" to="leaderboard">Leaderboard</router-link>
    </div>
  </transition>
</template>
<style scoped>
  h2{
    text-align: center;
  }
</style>
<script>
  module.exports = {
    data: function(){
      return {
        id: "",
        user: {}
      };
    },
    sockets: {
      id: function(id){
        this.id = id;
        localStorage.setItem("UserId", id);
        this.$socket.emit("register", id);
      },
      registered: function(user){
        this.user = user;
      }
    }
  }
</script>
