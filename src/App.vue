<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <!-- <img src="./assets/talents/absorb_life.png"> -->
  <TalentIcon cur_level = 1 max_level = 5 :img_url = img_icon  />
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import TalentIcon from "./components/TalentIcon.vue"

export default {
  name: 'App',
  components: {
    TalentIcon
  },

  data() {
    return {
      img_icon : new URL("./assets/talents/absorb_life.png", import.meta.url)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
