<template>
  <div>
    Test
    {{ state }}
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
    },
    sockets: {

    }
  }
</script>
