<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <div class="title">
    <h1>{{title_text}}</h1>
  </div>
  <div class="debug">
    <h1>Debug:{{race_selected}}</h1>
  </div>
  <div class="select_panel">
    <select id="race_select" v-model="race_selected">
      <option disabled value="">select a race</option>
      <option v-for="(r, index) in races" :key="index" :value="r.name.replace(' ','_').toLowerCase()">{{r.name}}</option>
    </select>
    <select id="class_select" v-model="class_selected">
      <option disabled value="">select a class</option>
      <option v-for="(c, index) in classes" :key="index" :value="c.name.replace(' ','_').toLowerCase()">{{c.name}}</option>
    </select>
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
        <TalentTree :p_talents_groups="c_talents_tree" @click_talent="assign_talent_points"></TalentTree>
        <TalentTree :p_talents_groups="g_talents_tree"></TalentTree>
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
    },

    reset_all(){

      if (this.race_selected=="" || this.class_selected=="") {
        return
      }

      for (var i=0; i<this.attrs.length; i++) {
        this.attrs[i].base = 10 + this.race_config[this.race_selected]["attr_modifiers"][i]
        this.attrs[i].total = 10 + this.race_config[this.race_selected]["attr_modifiers"][i]
      }

      this.c_talents_tree = {}

      for (var ctg of this.class_config[this.class_selected]["c_talent_groups"]) {
        var talents = this.talents_config[ctg]
        this.c_talents_tree[ctg] = talents
      }

      this.g_talents_tree = {}

      for (var gtg of this.class_config[this.class_selected]["g_talent_groups"]) {
        talents = this.talents_config[gtg]
        this.g_talents_tree[gtg] = talents
      }
    }
  },

  data() {

    return {
      lang : "ZH_Hans",
      title_text : "ToME Planner",
      desc : "testing descriptions",

      race_config:{
        "shalore" : {"attr_modifiers" : [2,2,-2,-2,0,0] },
        "higher" : {"attr_modifiers" : [2,2,2,2,2,2] },
        "cornac" : {"attr_modifiers" : [0,0,0,0,0,0] },
      },

      class_config:{
        "archer" : {"c_talent_groups":["test0", "test1"], "g_talent_groups":["test0", "test2"]},
        "sun_paladin" : {"c_talent_groups":["test0","test2"], "g_talent_groups":["test2"]},
        "arcane_blade" : {"c_talent_groups":["test0", "test1", "test2"], "g_talent_groups":["test1"]},
      },


      talents_config:{},

      race_selected : "",
      class_selected : "",

      races : [
        {name: "Shalore"},
        {name: "Higher"},
        {name: "Cornac"}
      ],

      classes : [
        {name: "Sun Paladin"},
        {name: "Archer"},
        {name:  "Arcane Blade"},
      ],

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
      c_talents_tree : {},
      g_talents_tree : {}
    }
  },

  watch: {
    race_selected(val){
      console.log("select race: " + val)
      this.reset_all()
    },

    class_selected(val) {
      console.log("select class: " + val)
      this.reset_all()
    }
  },

  mounted() {
    for (var i in [0,1,2,3]) {
      this.talents_config["test"+i] = {
        name : "test" + i,
        mastery : 1.0 + 0.1*i,
        talents_list: this.talents_group
      }
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
