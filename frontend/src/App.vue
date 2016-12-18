<template>
  <div id="main">
    <div id="titlebar"><h1>Crackers</h1></div>
    <div id="page">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
</script>
<style src="animate.css/animate.css"></style>
<style>
  body,html{
    background-color: rgb(150, 0, 0);
    color: white;
    font-family: sans-serif;
    margin: 0;
  }
  #main{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    min-width: 100vw;
  }
  #titlebar{
    background-color: rgb(100, 0, 0);
    text-align: center;
    padding: 1px;
  }
  #page{
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    max-width: 700px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
</style>
