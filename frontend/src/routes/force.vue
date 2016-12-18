<template>
  <div>
    Test
    {{countdown}}
    {{acceleration}}
    {{state}}

    <template v-if="state.match.winner">
      <div class="win" v-if="state.match.winner.socketId == $socket.id">You win!</div>
    </template>
  </div>
</template>
<script>
  var state = require("../state.js");

  var listener;


  module.exports = {
    created: function(){
      console.log("hello");
      var that = this;
      var intervalId = setInterval(function(){
        that.countdown--;
        if(that.countdown == 0){
          clearInterval(intervalId);
          listener = window.addEventListener("devicemotion", that.handleMotion);
          //setTimeout(that.generateRandom, 10000); //DEBUG ONLY
        }
      }, 1000);
      this.state = state;
    },
    data: function(){
      return {
        state: state,
        countdown: 3,
        acceleration: 0
      };
    },
    methods: {
      submitAcceleration: function(){
        this.$socket.emit("submitacceleration", {
          acceleration: this.acceleration,
          matchId: this.state.match._id
        });
      },
      handleMotion: function(e){
        acceleration = Math.sqrt(Math.pow(e.accelerationIncludingGravity.x, 2) + Math.pow(e.accelerationIncludingGravity.y, 2) + Math.pow(e.accelerationIncludingGravity.z, 2)) - 9.81;
        if(acceleration > 30){
          this.acceleration = Math.max(acceleration, this.acceleration);
        }
        else{
          if(this.acceleration){
            window.removeEventListener("devicemotion", this.handleMotion);
            this.submitAcceleration()
          }
        }
      },
      generateRandom: function(){
        if(this.acceleration == 0){
          this.acceleration = (Math.random() * 80);
          this.submitAcceleration();
        }
      }
    },
    sockets: {
      done: function(match){
        this.state.match = match;
        this.$router.push("final");
      }
    }
  }
</script>
