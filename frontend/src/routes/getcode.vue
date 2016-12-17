<template>
  <div>
    Your joining code: {{ code }}
  </div>
</template>
<script>
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
      }
    }
  }
</script>
