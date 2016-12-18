<template>
  <div>
    <form v-on:submit.prevent="submit">
      <input type="number" placeholder="Code" v-model="code"></input>
      <input type="submit" value="Enter match!"></input>
    </form>
  </div>
</template>
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
        state.initiator = true;
        state.match = match;
        this.$router.push("force");
      }
    }
  }
</script>
