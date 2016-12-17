<template>
  <div>
    Your joining code: {{ code }}
  </div>
</template>
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
