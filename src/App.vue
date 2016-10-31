<template>
  <div id="app">
  <div class="container">
    <div class="row">
      <div class="col-md-12"><h1>Track Explorer</h1></div>
      <tracklist tracks:="tracks"></tracklist>
    </div>
    
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
  margin-top: 60px;
}
</style>
