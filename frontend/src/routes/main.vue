<template>
  <transition name="test" appear-class="animated bounce" appear>
    <div>
      <h2>Hello {{user.name}}!</h2>
      <router-link class="button" to="getcode">Get code</router-link>
      <router-link class="button" to="entercode">Enter code</router-link>
    </div>
  </transition>
</template>
<style scoped>
  h2{
    text-align: center;
  }
  .button{
    width: 100%;
    font-size: 1.5em;
    display: block;
    background-color: white;
    color: rgb(150, 0, 0);
    padding: 0.5em 0;
    border-radius: 0.3em;
    margin-bottom: 0.7em;
    text-align: center;
    text-decoration: none;
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
