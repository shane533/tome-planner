<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div class="title">
    <p>{{title_text}}</p>
  </div>
  <div class="attr_panel">
    <button id="attr_button">attr</button>
    <ol>
      <AttrIcon v-for="a in attrs" :key="a.name" :p_img_url="a.img_url" :p_base="a.base" :p_total="a.total"></AttrIcon>
    </ol>
  </div>
  <div class="talents_panel">

  </div>
  <div class="desc_panel">

  </div>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <!-- <img src="./assets/talents/absorb_life.png"> -->
  <!-- <TalentIcon cur_level = 1 max_level = 5 :img_url = img_icon  /> -->
  <!-- <TalentGroup :p_name=group_name :p_mastery=group_mastery :p_talents=talents_list></TalentGroup> -->
  <TalentTree :p_talents_groups="talents_groups"></TalentTree>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import TalentTree from "./components/TalentTree.vue"
import AttrIcon from "./components/AttrIcon.vue"

export default {
  name: 'App',
  components: {
    AttrIcon,
    TalentTree
},

  data() {

    return {
      lang : "ZH_Hans",
      title_text : "default title",
      attrs : [
        {
          name : "STR",
          img_url : new URL("./assets/talents/absorb_life.png", import.meta.url),
          base : 10,
          total : 10
        },
        {
          name : "DEX",
          img_url : new URL("./assets/talents/absorb_life.png", import.meta.url),
          base : 10,
          total : 10
        },
        {
          name : "CON",
          img_url : new URL("./assets/talents/absorb_life.png", import.meta.url),
          base : 10,
          total : 10
        },
        {
          name : "MAG",
          img_url : new URL("./assets/talents/absorb_life.png", import.meta.url),
          base : 10,
          total : 10
        },
        {
          name : "WIL",
          img_url : new URL("./assets/talents/absorb_life.png", import.meta.url),
          base : 10,
          total : 10
        }
      ],
      talents_group : [ {name : "absorb_life",
                        img_url : new URL("./assets/talents/absorb_life.png", import.meta.url),
                        cur_level : 1,
                        max_level : 5 },
                        {name : "acid_beam",
                        img_url : new URL("./assets/talents/acidbeam.png", import.meta.url),
                        cur_level : 3,
                        max_level : 5 },
                        {name : "ice_wall",
                        img_url : new URL("./assets/talents/ice_wall.png", import.meta.url),
                        cur_level : 5,
                        max_level : 5 },
                        ],
      talents_groups : []
    }
  },

  mounted() {
    for (var i in [1,2,3]) {
      this.talents_groups.push({
        name : "test" + i,
        mastery : 1.0+0.1*i,
        talents_list: this.talents_group
      })
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

.attr_panel {
  float:left
}

</style>
