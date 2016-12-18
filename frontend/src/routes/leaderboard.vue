<template>
  <div>
  {{leaderboard}}
  </div>
</template>
<script>
  module.exports = {
    created: function(){
    alert("hello");
      this.$socket.emit("getLeaderboard")
    },
    data: function(){
      return {
        leaderboard: []
      };
    },
    sockets: {
      leaderboard: function(data){
        this.leaderboard = data;
      }
    }
  }
</script>
