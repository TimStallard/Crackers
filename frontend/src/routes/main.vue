<template>
  <div>
    Hello {{user.name}}
    <router-link to="getcode">Get code</router-link>
    <router-link to="entercode">Enter code</router-link>
  </div>
</template>
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
