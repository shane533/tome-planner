<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <div class="title">
    <h1>{{title}}</h1>
    <p>For ToME Version: {{tome_version}}</p>
  </div>
  <div class="debug">
    <h1>Debug:{{race_selected}}</h1>
  </div>
  <div class="select_panel">
    <select id="race_select" v-model="race_selected">
      <option disabled value="">select a race</option>
      <option v-for="r in race_config" :key="r.short_name" :value="r.short_name">{{r.name}}</option>
    </select>
    <select id="class_select" v-model="class_selected">
      <option disabled value="">select a class</option>
      <option v-for="c in class_config" :key="c.short_name" :value="c.short_name">{{c.name}}</option>
    </select>
  </div>
  <div class="attr_panel">
    <button id="attr_button">Stat Points:{{total_attr_points}}</button>
    <ol>
      <AttrIcon v-for="a in attrs" :key="a.name" :p_id="a.name.toLowerCase()" :p_img_url="a.img_url" :p_base="a.base" :p_total="a.total"  @click_attr="click_attr_icon" @hover_attr="hover_attr_icon"></AttrIcon>
    </ol>
  </div>
  <div class="talents_panel">
    <div class="talents_buttons_panel">
      <button id="c_points_btn">C Points:{{total_c_points}}</button>
      <button id="tree_points_btn">T Points:{{total_category_points}}</button>
      <button id="g_points_btn">G Points:{{total_g_points}}</button>
      <div class="talents_tree_panel">
        <TalentTree :p_type="tree_type_class" :p_talents_groups="c_talents_tree" @click_talent="click_talent_icon" @hover_talent="hover_talent_icon" @click_mastery="click_talent_mastery"></TalentTree>
        <TalentTree :p_type="tree_type_generic" :p_talents_groups="g_talents_tree" @click_talent="click_talent_icon" @hover_talent="hover_talent_icon" @click_mastery="click_talent_mastery"></TalentTree>
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
import TalentTree from "./components/TalentTree.vue"
import AttrIcon from "./components/AttrIcon.vue"

export default {
  name: 'App',
  components: {
    AttrIcon,
    TalentTree
  },

  methods: {

    update_desc_panel()
    {
      this.desc = this.talent_or_attr_selected.name
      console.log("update_desc_panel " + this.desc)
    },

    click_attr_icon(key)
    {
      this.assign_attr_points(key)
    },

    hover_attr_icon(key)
    {
      this.talent_or_attr_selected = this.attrs[key]
    },

    assign_attr_points(key)
    {
      // console.log("assign_attr_points")
      this.attrs[key].base += 1
      this.attrs[key].total += 1
      this.total_attr_points -= 1
    },

    click_talent_mastery(tg, tree_type)
    {

      if (this.total_category_points > 0) {
        var group = tree_type == this.tree_type_class ? 
                                      this.c_talents_tree[tg] : this.g_talents_tree[tg]
        
        if (group.unlocked == false) {
          group.unlocked = true
        } else {
          group.mastery += 0.2
        }
  
        this.total_category_points -= 1
      }

    },

    click_talent_icon(t, tg, tree_type)
    {
      var talent = tree_type == this.tree_type_class ? 
                                    this.c_talents_tree[tg].talents[t] : this.g_talents_tree[tg].talents[t]

      this.assign_talent_points(tree_type, talent)
    },

    hover_talent_icon(t, tg, tree_type)
    {
      var talent = tree_type == this.tree_type_class ? 
                                    this.c_talents_tree[tg].talents[t] : this.g_talents_tree[tg].talents[t]
      this.talent_or_attr_selected = talent
    },

    assign_talent_points(tree_type, talent)
    {
      console.log("assign_talent_points of " + tree_type + " : " + talent.name)
      tree_type == this.tree_type_class ? this.total_c_points -=1 : this.total_g_points -= 1
      talent.cur_level += 1
    },

    // change_lang(la){
    //   if (la == "ZH_Hans") {
    //     this.lang_file = lang_zh_file
    //   } else if(la == "EN_En") {
    //     this.lang_file = lang_en_file
    //   }
    // },

    // _T(key) {
    //   return this.lang_file[key]
    // },

    async reset_all(){

      if (this.race_selected=="" || this.class_selected=="") {
        return
      }
      
      for (var k in this.attrs) {
        if  ("stats" in this.race_config[this.race_selected]) {
          this.attrs[k].base = k in this.race_config[this.race_selected]["stats"] ? 10 + this.race_config[this.race_selected]["stats"][k] : 10
          this.attrs[k].total = k in this.race_config[this.race_selected]["stats"] ? 10 + this.race_config[this.race_selected]["stats"][k] : 10
        }

        if ("stats" in this.class_config[this.class_selected]){
          this.attrs[k].base += k in this.class_config[this.class_selected]["stats"] ? this.class_config[this.class_selected]["stats"][k] : 0
          this.attrs[k].total += k in this.class_config[this.class_selected]["stats"] ? this.class_config[this.class_selected]["stats"][k] : 0
        }
      }

      this.c_talents_tree = {}

      for (var tree of ["talents_types_class", "talents_types_generic"]) {
        for (var ctg in this.class_config[this.class_selected][tree]) {
          var talents = this.class_config[this.class_selected][tree][ctg]
          var mastery = talents[1]
          var type = ctg.split("/")[0]
          var name = ctg.split("/")[1]
          var t_status = {
            "mastery" : mastery,
            "unlocked" : talents[0]
          }
          await import(`@/assets/data/${this.tome_version}/talents.${type}-${mastery}.json`).then((module)=>{
            console.log(ctg)
            for (var i in module) {
              if (module[i]["name"] == name) {
                var config = { ...t_status, ...module[i]}
                for(var t of config["talents"]) {
                  t["cur_level"] = 0
                  t["max_level"] = 5
                  
                  t["img_url"] = require("./assets/talents/"+ t["image"])
                  // t["img_url"] = require(`./assets/talents/${t["image"]}`)
                  // t["img_url"] = new URL(`./assets/talents/${t["image"]}`, import.meta.url)
                }

                if (tree == "talents_types_class") {
                  this.c_talents_tree[ctg] = config
                } else {
                  this.g_talents_tree[ctg] = config
                }
              }
            }
          })
        }
      }
    }
  },

  data() {

    return {
      title : "ToME Planner",
      tome_version : "1.7.4",
      desc : "testing descriptions",

      tree_type_class : "class",
      tree_type_generic : "generic",

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

      talent_or_attr_selected : {},

      total_attr_points : 163,
      total_c_points : 70,
      total_g_points : 50,
      total_category_points : 4,
      attrs : {
        "str" : {
          name : "STR",
          img_url : new URL("./assets/stats/strength.png", import.meta.url),
          base : 10,
          total : 10
        },
        "dex" : {
          name : "DEX",
          img_url : new URL("./assets/stats/dexterity.png", import.meta.url),
          base : 10,
          total : 10
        },
        "con" : {
          name : "CON",
          img_url : new URL("./assets/stats/constitution.png", import.meta.url),
          base : 10,
          total : 10
        },
        "mag" : {
          name : "MAG",
          img_url : new URL("./assets/stats/magic.png", import.meta.url),
          base : 10,
          total : 10
        },
        "wil" : {
          name : "WIL",
          img_url : new URL("./assets/stats/willpower.png", import.meta.url),
          base : 10,
          total : 10
        },
        "cun" : {
          name : "CUN",
          img_url : new URL("./assets/stats/cunning.png", import.meta.url),
          base : 10,
          total : 10
        }
      },

      talents_group : [ {name : "absorb_life",
                        img_url : new URL("./assets/talents/absorb_life.png", import.meta.url),
                        cur_level : 0,
                        max_level : 5 },
                        {name : "acid_beam",
                        img_url : new URL("./assets/talents/acidbeam.png", import.meta.url),
                        cur_level : 0,
                        max_level : 5 },
                        {name : "ice_wall",
                        img_url : new URL("./assets/talents/ice_wall.png", import.meta.url),
                        cur_level : 0,
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
    },

    lang(val){
      console.log("select lang: " + val)
      this.change_lang(val)
    },

    talent_or_attr_selected(){
      this.update_desc_panel()
    }
  },

  mounted() {

    import(`@/assets/data/${this.tome_version}/classes.json`).then((module)=>{
      this.class_config = module["subclasses"]
    })

    import(`@/assets/data/${this.tome_version}/races.json`).then((module)=>{
      this.race_config = module["subraces"]
    })


    for (var i in [0,1,2,3]) {
      this.talents_config["test"+i] = {
        name : "test" + i,
        mastery : 1.0 + 0.1*i,
        unlocked : true,
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
