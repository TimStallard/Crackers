<template>
  <div>
    <ol id="leaderboard">
      <li v-for="user in leaderboard">
        {{user.name}} - {{user.wins}}/{{user.games}}
      </li>
    </ol>
  </div>
</template>
<style>
  #leaderboard{
    font-size: 1.3em;
  }
</style>
<script>
  module.exports = {
    created: function(){
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
