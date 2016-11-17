<template>
  <div id="app">
    <div class="container">
      <tracklist></tracklist>
    </div>  
  </div>
</div>
</template>

<script>
  import Tracklist from './components/Tracklist'

  export default {
    name: 'app',
    components: {
      Tracklist
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
