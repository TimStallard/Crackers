<template>
  <div>
    <router-link to="getcode">Get code</router-link>
    <router-link to="entercode">Enter code</router-link>
  </div>
</template>
<script>
  module.exports = {
    data: function(){
      return {
        mongoid: ""
      };
    },
    sockets: {
      id: function(id){
        this.mongoid = "test";
      }
    }
  }
</script>
