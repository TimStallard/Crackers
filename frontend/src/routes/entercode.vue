<template>
  <div>
    <form v-on:submit.prevent="submit">
      <input type="number" placeholder="Code" v-model="code"></input>
      <input type="submit" value="Enter match!"></input>
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
  var state = require("../state.js");
  module.exports = {
    data: function(){
      return {
        code: "",
        state: state
      };
    },
    methods: {
      submit: function(){
        this.$socket.emit("submitcode", this.code);
      }
    },
    sockets: {
      start: function(match){
        state.initiator = false;
        state.match = match;
        this.$router.push("force");
      }
    }
  }
</script>
