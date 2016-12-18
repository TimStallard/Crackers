<template>
  <div>
    <template v-if="state.match.winner">
      <h2 class="win" v-if="state.match.winner.socketId == $socket.id">You won!</h2>
      <h2 class="win" v-else>You lost :(</h2>
    </template>
    {{player1}} beat {{player2}} by {{scalefactor}}x
    <p>
    {{joke.title}}
    <button v-on:click="showJoke=true" v-if="!showJoke" class="button">Show answer</button>
    <p v-if="showJoke" class="joke-selftext">
    {{joke.selftext}}
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

.joke-selftext {
  font-style: italic;
}

</style>
<script>
  var state = require("../state.js");

  module.exports = {
    created: function(){
      this.state = state;
      this.$socket.emit("getJoke");
    },
    data: function(){
      return {
        state: state,
        joke: "",
        showJoke: false
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
    },
    sockets: {
        joke: function(joke){
            this.joke = joke;
        }
    }
  }
</script>
