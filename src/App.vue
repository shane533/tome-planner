<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <div class="title">
    <h1>{{title}}</h1>
    <p>For ToME Version: {{tome_version}}</p>
  </div>
  <div class="debug">
    <h1>Debug:{{build}}</h1>
    <button id="share_button" @click="click_share_button">Share</button>
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
  <div class="stat_panel">
    <button id="stat_button">Stat Points:{{total_stat_points}}</button>
    <ol>
      <StatIcon v-for="a in stats" :key="a.name" :p_id="a.name.toLowerCase()" :p_img_url="a.img_url" :p_base="a.base" :p_total="a.total"  @click_stat="click_stat_icon" @hover_stat="hover_stat_icon"></StatIcon>
    </ol>
  </div>
  <div class="talents_panel">
    <div class="talents_buttons_panel">
      <button id="c_points_btn">C Points:{{total_c_points}}</button>
      <button id="tree_points_btn">T Points:{{total_category_points}}</button>
      <button id="g_points_btn">G Points:{{total_g_points}}</button>
      <div class="talents_tree_panel">
        <TalentTree :p_type="tree_type_class" :p_talents_groups="c_talents_tree" @click_talent="click_talent_icon" @hover_talent="hover_talent_icon" @click_mastery="click_talent_mastery" @reset_talent_group="reset_talent_group"></TalentTree>
        <TalentTree :p_type="tree_type_generic" :p_talents_groups="g_talents_tree" @click_talent="click_talent_icon" @hover_talent="hover_talent_icon" @click_mastery="click_talent_mastery" @reset_talent_group="reset_talent_group"></TalentTree>
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
import StatIcon from "./components/StatIcon.vue"
import { Const } from "./const.js"

export default {
  name: 'App',


  components: {
    StatIcon,
    TalentTree
  },

  methods: {

    update_desc_panel()
    {
      this.desc = this.talent_or_stat_selected.name
      // console.log("update_desc_panel " + this.desc)
    },

    click_stat_icon(key)
    {
      if (this.stats[key].base < Const.MAX_POINTS_PER_STAT) {
        this.assign_stat_points(key)
      }
    },

    hover_stat_icon(key)
    {
      this.talent_or_stat_selected = this.stats[key]
    },

    assign_stat_points(key)
    {
      this.stats[key].base += 1
      this.stats[key].total += 1
      this.total_stat_points -= 1
    },

    click_talent_mastery(tg, tree_type)
    {
      console.log("CLICK TALENT MASTERY")
      if (this.total_category_points > 0) {
        let group = tree_type == this.tree_type_class ? 
                                      this.c_talents_tree[tg] : this.g_talents_tree[tg]
        
        if (group.unlocked == false) {
          group.unlocked = true
        } else if (group.enhanced == false) {
          group.mastery += 0.2
          group.enhanced = true
        }
  
        this.total_category_points -= 1
      }

    },

    click_talent_icon(t, tg, tree_type)
    {
      let talent = tree_type == this.tree_type_class ? 
                                    this.c_talents_tree[tg].talents[t] : this.g_talents_tree[tg].talents[t]
      if (talent.cur_level < talent.max_level) {
        this.assign_talent_points(tree_type, talent)
      }
    },

    hover_talent_icon(t, tg, tree_type)
    {
      let talent = tree_type == this.tree_type_class ? 
                                    this.c_talents_tree[tg].talents[t] : this.g_talents_tree[tg].talents[t]
      this.talent_or_stat_selected = talent
    },

    assign_talent_points(tree_type, talent)
    {
      console.log("assign_talent_points of " + tree_type + " : " + talent.name)
      tree_type == this.tree_type_class ? this.total_c_points -=1 : this.total_g_points -= 1
      talent.cur_level += 1
    },

    click_share_button()
    {
      console.log("===Click share button")
      this.serialize2base64()
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

    reset_talent_group(tg, tree_type)
    {
      // console.log("Reset talent group:" + tg + " type:" + tree_type)
      let group = tree_type == this.tree_type_class ? this.c_talents_tree[tg] : this.g_talents_tree[tg]
      
      let refund_points = 0
      for (let t of group.talents) {
        if (! t.no_unlearn_last == true) {
          refund_points += t.cur_level
          t.cur_level = 0
        }
      }

      if (group.enhanced) {
        group.mastery -= 0.2
        group.enhanced = false
        this.total_category_points += 1
      }

      tree_type == this.tree_type_class ? this.total_c_points += refund_points : this.total_g_points += refund_points
    },

    is_undead_race(race)
    {
      return ["GHOUL", "SKELETON"].indexOf(race) != -1
    },

    on_load_race_talent(module)
    {
      console.log("insert race talent")
      for (let m in module){
        if (module[m]["name"] == this.race_selected.toLowerCase()) {
          let t_status = {
            "mastery" : 1,
            "unlocked": true,
            "enhanced": false
          }
          let config = {...t_status, ...module[m]}
          for (let [i,t] of config["talents"].entries()) {
            t["cur_level"] = i == 0 ? 1 : 0
            t["max_level"] = t["points"]
            t["img_url"] = require("./assets/talents/"+ t["image"])
          }
          
          this.g_talents_tree[module[m]["type"]] = config
        }
      }
    },

    async reset_all()
    {

      if (this.race_selected=="" || this.class_selected=="") {
        return
      }

      if (this.is_reseting) {
        return
      }

      this.is_reseting = true

      this.total_stat_points = Const.TOTAL_STAT_POINTS
      this.total_c_points = Const.TOTAL_CLASS_POINTS
      this.total_g_points = Const.TOTAL_GENERIC_POINTS
      this.total_category_points = Const.TOTAL_CATEGORY_POINTS
      this.total_prodigy_points = Const.TOTAL_PRODIGY_POINTS

      if (this.race_selected == "CORNAC") {
        this.total_category_points += 1
        this.total_c_points += 6
        this.total_g_points += 6
      }
      
      for (let k in this.stats) {
        if  ("stats" in this.race_config[this.race_selected]) {
          this.stats[k].base = k in this.race_config[this.race_selected]["stats"] ? Const.BASE_STAT_POINT + this.race_config[this.race_selected]["stats"][k] : Const.BASE_STAT_POINT
          this.stats[k].total = k in this.race_config[this.race_selected]["stats"] ? Const.BASE_STAT_POINT + this.race_config[this.race_selected]["stats"][k] : Const.BASE_STAT_POINT
        }

        if ("stats" in this.class_config[this.class_selected]){
          this.stats[k].base += (k in this.class_config[this.class_selected]["stats"] ? this.class_config[this.class_selected]["stats"][k] : 0)
          this.stats[k].total += (k in this.class_config[this.class_selected]["stats"] ? this.class_config[this.class_selected]["stats"][k] : 0)
        }
      }

      this.c_talents_tree = {}
      this.g_talents_tree = {}

      if (this.is_undead_race(this.race_selected)) {
        import(`@/assets/data/${this.tome_version}/talents.undead-1.json`).then(this.on_load_race_talent)
      } else {
        import(`@/assets/data/${this.tome_version}/talents.race-1.json`).then(this.on_load_race_talent)
      }

      for (let tree of ["talents_types_class", "talents_types_generic"]) {
        let class_config = this.class_config[this.class_selected]
        for (let ctg in class_config[tree]) {
          let talents = class_config[tree][ctg]
          let mastery = talents[1]
          let type = ctg.split("/")[0]
          // let name = ctg.split("/")[1]
          let t_status = {
            "mastery" : mastery,
            "unlocked" : talents[0],
            "enhanced" : false
          }
          await import(`@/assets/data/${this.tome_version}/talents.${type}-${mastery}.json`).then((module)=>{
            // console.log(ctg)
            for (let i in module) {
              if (module[i]["type"] == ctg) {
                let config = { ...t_status, ...module[i]}
                for(let t of config["talents"]) {
                  if (t["id"] in class_config["talents"]) {
                    t["cur_level"] = parseInt(class_config["talents"][t.id])
                  } else {
                    t["cur_level"] = 0
                  }
                  t["max_level"] = t["points"]
                  t["img_url"] = require("./assets/talents/"+ t["image"])
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

      this.is_reseting = false
    },

    serialize2base64() 
    {
      let obj = {race:this.race_selected, 
                 class:this.class_selected}
      let str = JSON.stringify(obj)
      let b64 = window.btoa(str)
      this.build = b64
    },

    deserialize_base64()
    {
      let str = window.atob(this.build)
      let obj = JSON.parse(str)
      this.race_selected = obj.race
      this.class_selected = obj.class
    }
  },

  data() {

    return {
      title : "ToME Planner",
      tome_version : "1.7.4",
      desc : "testing descriptions",

      tree_type_class : "class",
      tree_type_generic : "generic",

      race_config:{},

      class_config:{},


      talents_config:{},

      build : "", //build string passed through URL
      is_reseting : false,

      race_selected : "",
      class_selected : "",

      talent_or_stat_selected : {},

      total_stat_points : 163,
      total_c_points : 70,
      total_g_points : 50,
      total_category_points : 4,
      total_prodigy_points : 2,

      stats : {
        "str" : {
          name : "STR",
          img_url : new URL("./assets/stats/strength.png", import.meta.url),
          base : 0,
          total : 0
        },
        "dex" : {
          name : "DEX",
          img_url : new URL("./assets/stats/dexterity.png", import.meta.url),
          base : 0,
          total : 0
        },
        "con" : {
          name : "CON",
          img_url : new URL("./assets/stats/constitution.png", import.meta.url),
          base : 0,
          total : 0
        },
        "mag" : {
          name : "MAG",
          img_url : new URL("./assets/stats/magic.png", import.meta.url),
          base : Const.BASE_STAT_POINT,
          total : Const.BASE_STAT_POINT
        },
        "wil" : {
          name : "WIL",
          img_url : new URL("./assets/stats/willpower.png", import.meta.url),
          base : Const.BASE_STAT_POINT,
          total : Const.BASE_STAT_POINT
        },
        "cun" : {
          name : "CUN",
          img_url : new URL("./assets/stats/cunning.png", import.meta.url),
          base : Const.BASE_STAT_POINT,
          total : Const.BASE_STAT_POINT
        }
      },

      // talents_group : [ {name : "absorb_life",
      //                   img_url : new URL("./assets/talents/absorb_life.png", import.meta.url),
      //                   cur_level : 0,
      //                   max_level : 5 },
      //                   {name : "acid_beam",
      //                   img_url : new URL("./assets/talents/acidbeam.png", import.meta.url),
      //                   cur_level : 0,
      //                   max_level : 5 },
      //                   {name : "ice_wall",
      //                   img_url : new URL("./assets/talents/ice_wall.png", import.meta.url),
      //                   cur_level : 0,
      //                   max_level : 5 },
      //                   ],
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

    talent_or_stat_selected(){
      this.update_desc_panel()
    }
  },

  mounted() {

    
    import(`@/assets/data/${this.tome_version}/races.json`).then((module)=>{
      this.race_config = module["subraces"]
      import(`@/assets/data/${this.tome_version}/classes.json`).then((module)=>{
        this.class_config = module["subclasses"]
        this.deserialize_base64()
      })
    })

    const urlParams = new URLSearchParams(window.location.search);
    this.build = urlParams.get("build");

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

.stat_panel {
  float: left
}

.talents_panel {
  float: left
}

.desc_panel {
  float: left
}

</style>
