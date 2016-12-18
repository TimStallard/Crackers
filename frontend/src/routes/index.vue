<template>
  <div>
    <form v-on:submit.prevent="submit">
      <input type="text" placeholder="Name" v-model="name"></input>
      <br>
      <input type="submit" value="Let's get cracking!"></input>
    </form>
  </div>
</template>
<style scoped>
  form{
    margin-top: 1em;
    width: 100%;
  }
  form>input{
    font-size: 1.5em;
    width: 100%;
    margin-bottom: 1em;
    text-align: center;
    padding: 0.3em 0;
    border-radius: 0.3em;
  }
</style>
<script>
  module.exports = {
    created: function(){
      if(localStorage.UserId){
        this.$socket.emit("register", localStorage.UserId);
        this.$router.push("main");
      }
    },
    methods: {
      submit: function(){
        this.$socket.emit("signup", {
          name: this.name
        });
        this.$router.push("/main")
      }
    },
    data: function(){
      return {
        name: ""
      };
    }
  }
</script>
