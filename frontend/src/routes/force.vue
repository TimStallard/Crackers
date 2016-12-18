<template>
  <div>
    <template v-if="state.match">
      You
      vs
      {{opponent.name}}
    </template>
    <div id="countdown" v-if="countdown > 0">
      {{countdown}}
    </div>
    <div id="countdown" v-if="countdown == 0">
      Go!
    </div>
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
    },
    computed: {
      opponent: function(){
        if(this.state.match.initiator.user.socketId == this.$socket.id){
          return this.state.match.partner.user;
        }
        else{
          return this.state.match.initiator.user;
        }
      }
    }
  }
</script>
