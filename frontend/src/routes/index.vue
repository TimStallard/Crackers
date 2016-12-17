<template>
  <div>
    <form v-on:submit.prevent="submit">
      <input type="text" placeholder="Name" v-model="name"></input>
      <input type="submit" value="Let's get cracking!"></input>
    </form>
  </div>
</template>
<script>
  module.exports = {
    sockets: {
      connect: function(){
        
      }
    },
    methods: {
      submit: function(){
        this.$socket.emit("signup", {
          name: this.name
        });
        this.$router.push("/main")
      }
    }
  }
</script>
