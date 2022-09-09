<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <div class="title">
    <h1>{{title}}</h1>
    <p>For ToME Version: {{tome_version}}</p>
  </div>
  <div class="debug">
    <h1>Debug:{{build}}</h1>
    <button class="btn" id="share_button" @click="click_share_button">Share</button>
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
    <button class="btn" id="stat_button">Stats:{{total_stat_points}}</button>
    <ol class="stat_list">
      <StatIcon v-for="a in stats" :key="a.name" :p_id="a.name.toLowerCase()" :p_img_url="a.img_url" :p_base="a.base" :p_total="a.total"  @click_stat="click_stat_icon" @hover_stat="hover_stat_icon" @max_stat="maximize_or_clear_stat"></StatIcon>
    </ol>
  </div>
  <div class="talents_panel">
    <div class="talents_buttons_panel">
      <button class="btn" id="c_points_btn">Class Points:{{total_c_points}}</button>
      <button class="btn" id="t_points_btn">Category Points:{{total_category_points}}</button>
      <button class="btn" id="g_points_btn">Generic Points:{{total_g_points}}</button>
      <div class="talents_tree_panel">
        <div class="vertical_line"></div>
        <TalentTree :p_type="'class'" :p_talents_groups="c_talents_tree" @click_talent="click_talent_icon" @hover_talent="hover_talent_icon" @click_mastery="click_talent_mastery" @reset_talent_group="reset_talent_group"></TalentTree>
        <div class="vertical_line"></div>
        <TalentTree :p_type="'generic'" :p_talents_groups="g_talents_tree" @click_talent="click_talent_icon" @hover_talent="hover_talent_icon" @click_mastery="click_talent_mastery" @reset_talent_group="reset_talent_group"></TalentTree>
        <div class="vertical_line"></div>
        <!-- <div style="clear: both;"></div> -->
      </div>
    </div>
  </div>
  <div class="desc_panel">
    <TalentDesc v-if="is_selecting_talent" :p_data="this.selected_item"></TalentDesc>
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
import TalentDesc from "./components/TalentDesc.vue"
import { Const } from "./const.js"

export default {
  name: 'App',


  components: {
    StatIcon,
    TalentTree,
    TalentDesc
  },

  methods: {

    update_desc_panel()
    {
      if (this.selected_item_type == Const.ITEM_TYPE_TALENT) {
        this.desc = this.selected_item.info_text
      } else {
        this.desc = this.selected_item.name
      }
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
      this.selected_item = this.stats[key]
      this.selected_item_type = Const.ITEM_TYPE_STAT
    },

    assign_stat_points(key)
    {
      this.stats[key].base += 1
      this.stats[key].total += 1
      this.total_stat_points -= 1
    },

    maximize_or_clear_stat(key)
    {
      if (this.stats[key].base == Const.MAX_POINTS_PER_STAT) {
        //Clear
        let delta = Const.MAX_POINTS_PER_STAT - this.stats[key].init
        this.stats[key].base = this.stats[key].init
        this.stats[key].total = this.stats[key].init
        this.total_stat_points += delta
      } else {
        //Maximize
        if (this.total_stat_points <= 0) {
          return
        }
        let delta = Const.MAX_POINTS_PER_STAT - this.stats[key].base
        if(delta > this.total_stat_points) {
          delta = this.total_stat_points
        }
        this.stats[key].base += delta
        this.stats[key].total += delta
        this.total_stat_points -= delta
      }
    },

    click_talent_mastery(tg, tree_type)
    {
      console.log("CLICK TALENT MASTERY")
      if (this.total_category_points > 0) {
        let group = tree_type == Const.TREE_TYPE_CLASS ? 
                                      this.c_talents_tree[tg] : this.g_talents_tree[tg]
        
        if (group.unlocked == false) {
          group.unlocked = true
        } else if (group.enhanced == false) {
          group.mastery += 0.2
          group.enhanced = true
        } else {
          return
        }
  
        group.dirty = true
        this.total_category_points -= 1
      }
    },

    hover_talent_mastery(tg, tree_type)
    {
      this.selected_item = tree_type == Const.TREE_TYPE_CLASS ? 
                                      this.c_talents_tree[tg] : this.g_talents_tree[tg]
      this.selected_item_type = Const.ITEM_TYPE_CATEGORY
    },

    click_talent_icon(t, tg, tree_type)
    {
      let group = tree_type == Const.TREE_TYPE_CLASS ? 
                                    this.c_talents_tree[tg]
                                     : this.g_talents_tree[tg]
      let talent = group.talents[t]
      if (group.unlocked && talent.cur_level < talent.max_level) {
        group.dirty = true
        this.assign_talent_points(tree_type, talent)
      }
    },

    hover_talent_icon(index, tg, tree_type)
    {
      let group = tree_type == Const.TREE_TYPE_CLASS ? this.c_talents_tree[tg] : this.g_talents_tree[tg]
      let talent = group.talents[index]
      this.selected_item = talent
      this.selected_item["unlocked"] = group.unlocked
      this.selected_item["mastery"] = group.mastery
      this.selected_item["category_dep"] = index == 0 ? true : group.talents[index-1].cur_level > 0
      this.selected_item["index"] = index
      this.selected_item_type = Const.ITEM_TYPE_TALENT
    },

    assign_talent_points(tree_type, talent)
    {
      console.log("assign_talent_points of " + tree_type + " : " + talent.name)
      tree_type == Const.TREE_TYPE_CLASS ? this.total_c_points -=1 : this.total_g_points -= 1
      talent.cur_level += 1
    },

    click_share_button()
    {
      console.log("===Click share button")
      this.serialize2base64()
      navigator.clipboard.writeText(Const.SHARE_URL+this.build).then(function() {
        console.log('Async: Copying to clipboard was successful!');
        alert("URL copied to clipboard")
      }, function(err) {
        console.error('Async: Could not copy text: ', err);
      });
    },

    reset_talent_group(tg, tree_type)
    {
      // console.log("Reset talent group:" + tg + " type:" + tree_type)
      let group = tree_type == Const.TREE_TYPE_CLASS ? this.c_talents_tree[tg] : this.g_talents_tree[tg]
      group.dirty = false
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

      if (group.unlocked && !group.default_unlocked) {
        group.unlocked = false
        this.total_category_points += 1
      }

      tree_type == Const.TREE_TYPE_CLASS ? this.total_c_points += refund_points : this.total_g_points += refund_points
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
          this.stats[k].total = this.stats[k].base
          this.stats[k].init = this.stats[k].base
        }

        if ("stats" in this.class_config[this.class_selected]){
          this.stats[k].base += (k in this.class_config[this.class_selected]["stats"] ? this.class_config[this.class_selected]["stats"][k] : 0)
          this.stats[k].total = this.stats[k].base
          this.stats[k].init = this.stats[k].base
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
        let sorted = []
        for (let type in class_config[tree]) {
          let group = class_config[tree][type]
          group[4] = type
          sorted.push(group)
        }
        sorted = [
          ...sorted.filter(item => item[0]),
          ...sorted.filter(item => !item[0]),
        ]
        for (let i in sorted) {
        // for (let ctg in class_config[tree]) {
          let ctg = sorted[i][4]
          let talent_group = class_config[tree][ctg]
          // let talent_group = class_config[tree][ctg]
          let mastery = talent_group[1]
          let type = ctg.split("/")[0]
          // let name = ctg.split("/")[1]
          let t_status = {
            "index" : i,
            "mastery" : mastery,
            "unlocked" : talent_group[0],
            "default_unlocked" : talent_group[0],
            "enhanced" : false,
            "dirty" : false,
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
                  t["index"] = i
                }

                if (tree == "talents_types_class") {
                  this.c_talents_tree[ctg] = config
                } else {
                  this.g_talents_tree[ctg] = config
                }
              }
            }

            if (tree == "talents_types_generic" && t_status.index == sorted.length-1){
              this.finish_loading()
            }
          })
        }
      }

    },

    finish_loading()
    {
      console.log("=====Finish Loading")
      this.is_reseting = false
      if (this.build && this.build != "") {
        this.deserialize_base64_remains()
      }
    },

    serialize2base64() 
    {
      let stats = []
      for (let s in this.stats) {
        stats.push(this.stats[s].base)
      }
      let class_talents = {}
      for (let tg in this.c_talents_tree) {
        if (this.c_talents_tree[tg].dirty) {
          class_talents[tg] = [this.c_talents_tree[tg].unlocked, this.c_talents_tree[tg].mastery, []]
          for (let t in this.c_talents_tree[tg].talents)
          class_talents[tg][2].push(this.c_talents_tree[tg].talents[t].cur_level)
        }
      }
      let generic_talents = {}
      for (let tg in this.g_talents_tree) {
        if (this.g_talents_tree[tg].dirty) {
          generic_talents[tg] = [this.g_talents_tree[tg].unlocked, this.g_talents_tree[tg].mastery, []]
          for (let t in this.g_talents_tree[tg].talents)
          generic_talents[tg][2].push(this.g_talents_tree[tg].talents[t].cur_level)
        }
      }
      let obj = {R:this.race_selected, 
                 C:this.class_selected,
                 S:stats,
                 SP:this.total_stat_points,
                 CP:this.total_c_points,
                 TP:this.total_category_points,
                 GP:this.total_g_points,
                 CT:class_talents,
                 GT:generic_talents,
                }
      let str = JSON.stringify(obj)
      console.log(str)
      console.log(str.length)
      let b64 = window.btoa(str)
      this.build = b64
    },

    deserialize_base64_remains()
    {
      console.log(this.build_json)
      this.total_stat_points = this.build_json.SP
      this.total_c_points = this.build_json.CP
      this.total_category_points = this.build_json.TP
      this.total_g_points = this.build_json.GP
      let keys = Const.STAT_KEYS
      for (let i in this.build_json.S) {
        this.stats[keys[i]].base = this.build_json.S[i]
        this.stats[keys[i]].total = this.build_json.S[i]
      }

      for (let t in this.build_json.CT) {
        console.log(t)
        this.c_talents_tree[t].dirty = true
        this.c_talents_tree[t].unlocked = this.build_json.CT[t][0]
        this.c_talents_tree[t].mastery = this.build_json.CT[t][1]
        for (let i in this.build_json.CT[t][2]) {
          this.c_talents_tree[t].talents[i].cur_level = this.build_json.CT[t][2][i]
        }
      }

      for (let t in this.build_json.GT) {
        this.g_talents_tree[t].dirty = true
        this.g_talents_tree[t].unlocked = this.build_json.GT[t][0]
        this.g_talents_tree[t].mastery = this.build_json.GT[t][1]
        for (let i in this.build_json.GT[t][2]) {
          this.g_talents_tree[t].talents[i].cur_level = this.build_json.GT[t][2][i]
        }
      }
      this.build=""
    },

    deserialize_base64_race_and_class()
    {
      let str = window.atob(this.build)
      this.build_json = JSON.parse(str)
      this.race_selected = this.build_json.R
      this.class_selected = this.build_json.C
    }
  },

  data() {

    return {
      title : "ToME Planner",
      tome_version : "1.7.4",
      desc : "testing descriptions",

      race_config:{},

      class_config:{},


      talents_config:{},

      build : "", //build string passed through URL
      build_json: {},
      is_reseting : false,

      race_selected : "",
      class_selected : "",

      selected_item : {},
      selected_item_type : Const.ITEM_TYPE_NONE,

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

      c_talents_tree : {},
      g_talents_tree : {}
    }
  },

  computed: {
    is_selecting_talent() {
      return this.selected_item_type == Const.ITEM_TYPE_TALENT
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

    selected_item(){
      this.update_desc_panel()
    }
  },

  mounted() {
    
    const urlParams = new URLSearchParams(window.location.search);
    this.build = urlParams.get("build");
    
    import(`@/assets/data/${this.tome_version}/races.json`).then((module)=>{
      this.race_config = module["subraces"]
      import(`@/assets/data/${this.tome_version}/classes.json`).then((module)=>{
        this.class_config = module["subclasses"]
        if (this.build) {
          this.deserialize_base64_race_and_class()
        }
      })
    })


  }
}
</script>

<style>

@font-face {
	font-family: salsa;
	src: url('./assets/font/Salsa-Regular.ttf'); 
}

#app {
  font-family: "salsa", "Helvetica neue", Helvetica, Arial, Verdana, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #eee;
  margin-top: 60px;
}

#c_points_btn {
  float: left;
  margin-left: 3%
}

#t_points_btn {
  float: center;
}

#g_points_btn {
  float: right;
  margin-right: 3%;
}

.vertical_line {
  float:left;
  height: 700px;
  width : 30px;
  background-image: url("./assets/ui/border_vert_middle.png");
}

.vertical_line ::before {
  background-image: url("./assets/ui/border_vert_top.png");
}

.stat_panel {
  float: left;
  left: 0px;
  position: absolute;
  width: 6%;
  text-align: center;
  padding-left: 1%;
}

.stat_list {
  margin-top: 25px;
}

.talents_panel {
  float: left;
  /* position: relative; */
  margin-left: 6%;
  margin-right: 34%;
  width: 60%;
}

.talents_tree_panel {
  width:inherit;
  margin-top: 1%;
}

.desc_panel {
  /* float: left */
  left: unset;
  right: 0px;
  position: absolute;
  width: 34%;
}

.variable {
  color: #759022
}

.talent-variable {
  color: #759022
}

.stat-variable {
  color: #759022
}

.btn {
  border-style: solid;
  border-width: 4px;
  border-image: url(./assets/ui/border-button.png) 8 fill repeat;
  color: #eee;
  font-size: 0.95em;
  font-family: inherit;
  align-self: center;
}

ol {
  padding-inline-start: 5px;
}


</style>
