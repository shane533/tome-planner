<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div class="title">
    <p>{{title_text}}</p>
  </div>
  <div class="attr_panel">
    <button id="attr_button">Stat Points:{{total_attr_points}}</button>
    <ol>
      <AttrIcon v-for="(a, index) in attrs" :key="a.name" :p_id="index" :p_img_url="a.img_url" :p_base="a.base" :p_total="a.total"  @click_attr="assign_attr_points"></AttrIcon>
    </ol>
  </div>
  <div class="talents_panel">
    <div class="talents_buttons_panel">
      <button id="c_points_btn">C Points:{{total_c_points}}</button>
      <button id="tree_points_btn">T Points</button>
      <button id="g_points_btn">G Points:{{total_g_points}}</button>
      <div class="talents_tree_panel">
        <TalentTree :p_talents_groups="c_talents_groups" @click_talent="assign_talent_points"></TalentTree>
        <TalentTree :p_talents_groups="g_talents_groups"></TalentTree>
      </div>
    </div>
  </div>
  <div class="desc_panel">
    <p>{{desc}}</p>
  </div>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <!-- <img src="./assets/talents/absorb_life.png"> -->
  <!-- <TalentIcon cur_level = 1 max_level = 5 :img_url = img_icon  /> -->
  <!-- <TalentGroup :p_name=group_name :p_mastery=group_mastery :p_talents=talents_list></TalentGroup> -->
  <!-- <TalentTree :p_talents_groups="talents_groups"></TalentTree> -->
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

  methods: {
    assign_attr_points(index)
    {
      // console.log("assign_attr_points")
      this.attrs[index].base += 1
      this.attrs[index].total += 1
      this.total_attr_points -= 1
    },

    assign_talent_points(id)
    {
      console.log("assign_talent_points" + id)
      this.total_c_points -= 1
    }
  },

  data() {

    return {
      lang : "ZH_Hans",
      title_text : "default title",
      desc : "testing descriptions",
      total_attr_points : 160,
      total_c_points : 100,
      total_g_points : 100,
      attrs : [
        {
          name : "STR",
          img_url : new URL("./assets/stats/strength.png", import.meta.url),
          base : 10,
          total : 10
        },
        {
          name : "DEX",
          img_url : new URL("./assets/stats/dexterity.png", import.meta.url),
          base : 10,
          total : 10
        },
        {
          name : "CON",
          img_url : new URL("./assets/stats/constitution.png", import.meta.url),
          base : 10,
          total : 10
        },
        {
          name : "MAG",
          img_url : new URL("./assets/stats/magic.png", import.meta.url),
          base : 10,
          total : 10
        },
        {
          name : "WIL",
          img_url : new URL("./assets/stats/willpower.png", import.meta.url),
          base : 10,
          total : 10
        },
        {
          name : "CUN",
          img_url : new URL("./assets/stats/cunning.png", import.meta.url),
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
      c_talents_groups : [],
      g_talents_groups : []
    }
  },

  mounted() {
    for (var i in [1,2,3]) {
      this.c_talents_groups.push({
        name : "test" + i,
        mastery : 1.0+0.1*i,
        talents_list: this.talents_group
      })
    }

    for (i in [1,2,3]) {
      this.g_talents_groups.push({
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
  float: left
}

.talents_panel {
  float: left
}

.desc_panel {
  float: left
}

</style>
