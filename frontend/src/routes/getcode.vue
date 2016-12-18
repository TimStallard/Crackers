<template>
  <div>
    <h2 id="subtitle">Your joining code:</h2>
    <h2 id="code">{{ code }}</h2>
  </div>
</template>
<style scoped>
  h2{
    font-size: 1.5em;
    text-align: center;
  }
  h2#code{
    font-size: 4em;
  }
</style>
<script>
  var state = require("../state.js");
  module.exports = {
    created: function(){
      this.$socket.emit("getcode");
    },
    data: function(){
      return {
        code: ""
      };
    },
    sockets: {
      code: function(code){
        this.code = code;
      },
      start: function(match){
        state.initiator = true;
        state.match = match;
        this.$router.push("force");
      }
    }
  }
</script>
