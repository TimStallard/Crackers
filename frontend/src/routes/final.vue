<template>
  <div>
    Test
    {{state}}

    <template v-if="state.match.winner">
      <div class="win" v-if="state.match.winner.socketId == $socket.id">You win!</div>
      <div class="win" v-else>You lose :(</div>
    </template>
  </div>
</template>
<script>
  var state = require("../state.js");

  module.exports = {
    created: function(){
      this.state = state;
    },
    data: function(){
      return {
        state: state
      };
    }
  }
</script>
