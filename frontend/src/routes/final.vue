<template>
  <div>
    <template v-if="state.match.winner">
      <h2 class="win" v-if="state.match.winner.socketId == $socket.id">You win!</h2>
      <h2 class="win" v-else>You lose :(</h2>
    </template>
    {{player1}} beat {{player2}} by {{scalefactor}}x
    <p>
    <router-link class="button" to="/">Again!</router-link>
  </div>
</template>
<style scoped>
*{
  text-align: center;
}
.win{
  font-size: 3em;
}
</style>
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
    },
    computed: {
      player1: function(){
        if(state.match.winner.socketId == this.$socket.id){
          return "You";
        }
        else{
          return state.match.winner.name;
        }
      },
      player2: function(){
        if(state.match.winner.socketId != this.$socket.id){
          return "you";
        }
        else{
          if(state.initiator){
            return state.match.partner.user.name;
          }
          else{
            return state.match.initiator.user.name;
          }
        }
      },
      scalefactor: function(){
        var factor = state.match.initiator.acceleration / state.match.partner.acceleration;
        if(factor < 1){
          factor = 1 / factor;
        }
        return Number(factor).toFixed(2);
      }
    }
  }
</script>
