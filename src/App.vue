<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <div class="main-container">
    <div class="title">
      <h1>{{title}}</h1>
      <p>For ToME Version: {{tomeVersion}}</p>
    </div>
    <div class="share">
      <h3>URL:Https://shane533.github.io/tome-planner?build={{build}}</h3>
      <button class="btn" id="share-button" @click="generateShareURL">Share</button>
    </div>
    <div class="select-panel">
      <select id="race-select" v-model="raceSelected">
        <option disabled value="">select a race</option>
        <template v-for="r in raceConfig" :key="r.short_name">
          <option v-if="isAvaliableRace(r.short_name)" :value="r.short_name">
            {{r.name}}
          </option>
        </template>
      </select>
      <select id="class-select" v-model="classSelected">
        <option disabled value="">select a class</option>
        <template v-for="c in classConfig" :key="c.short_name">
          <option v-if="isAvaliableClass(c.short_name)" :value="c.short_name">{{c.name}}</option>
        </template>
      </select>
    </div>
    <div class="core-panel">
      <div class="stat-panel">
        <button class="btn" id="stat-button">Stats:{{totalStatPoints}}</button>
        <ol class="stat-list">
          <StatIcon 
            v-for="a in stats" 
            :key="a.name" 
            :pId="a.name.toLowerCase()" 
            :pImgUrl="a.img_url" 
            :pBase="a.base" 
            :pTotal="a.total"  
            @click-stat="assignStatPoints" 
            @hover-stat="hoverStatIcon" 
            @max-stat="maximizeOrClearStat"
          />
        </ol>
      </div>
      <div class="talents-panel">
        <div class="talents-buttons-panel">
          <button class="btn" id="c-points-btn">Class Points:{{totalCPoints}}</button>
          <button class="btn" id="t-points-btn">Category Points:{{totalCategoryPoints}}</button>
          <button class="btn" id="g-points-btn">Generic Points:{{totalGPoints}}</button>
        </div>
        <div class="talents-tree-panel">
          <div class="vertical-line"></div>
          <TalentTree 
            :pType="'class'" 
            :pTalentsGroups="cTalentsTree" 
            @click-talent="clickTalentIcon" 
            @hover-talent="hoverTalentIcon" 
            @click-mastery="clickTalentMastery" 
            @reset-talent-group="resetTalentGroup"
          />
          <div class="vertical-line"></div>
          <TalentTree 
            :pType="'generic'" 
            :pTalentsGroups="gTalentsTree" 
            @click-talent="clickTalentIcon" 
            @hover-talent="hoverTalentIcon" 
            @click-mastery="clickTalentMastery" 
            @reset-talent-group="resetTalentGroup"
          />
          <div class="vertical-line"></div>
          <!-- <div style="clear: both;"></div> -->
        </div>
    </div>
      <div class="desc-panel">
        <TalentDesc 
          v-if="isSelectingTalent" 
          :pData="this.selectedItem"
        />
        <InscriptionProdigyDiv 
          :pInscriptionSlots="this.inscriptionSlots" 
          @click-inscription-btn="unlockInscriptionSlot" 
          @click-prodigy-btn="openProdigyPanel"
        >
          {{selectedProdigyStr}}
        </InscriptionProdigyDiv>
      </div>
    </div>
  </div>
  <ProdigyPanel v-show="isShowingProdigy" :pData="this.prodigyConfig" :pId1="this.prodigyId1" :pId2="this.prodigyId2"></ProdigyPanel>
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
import InscriptionProdigyDiv from "./components/InscriptionProdigyDiv.vue"
import ProdigyPanel from "./components/ProdigyPanel.vue"

import { Const } from "./const.js"
import ProdigyConfig from "./assets/data/1.7.4/talents.uber-1.json"
import RaceConfig from "./assets/data/1.7.4/races.json"
import ClassConfig from "./assets/data/1.7.4/classes.json"

export default {
  name: 'App',


  components: {
    StatIcon,
    TalentTree,
    TalentDesc,
    InscriptionProdigyDiv,
    ProdigyPanel
},

  methods: {

    isAvaliableRace(shortName)
    {
      if (Const.HIDDEN_RACES.indexOf(shortName) != -1){
        return false
      } else {
        return true
      }
    },

    isAvaliableClass(shortName)
    {
      if (Const.HIDDEN_CLASSES.indexOf(shortName) != -1){
        return false
      } else {
        return true
      }
    },

    updateDescPanel()
    {
      if (this.selectedItemType == Const.ITEM_TYPE_TALENT) {
        this.desc = this.selectedItem.info_text
      } else {
        this.desc = this.selectedItem.name
      }
      // console.log("update_desc_panel " + this.desc)
    },

    hoverStatIcon(key)
    {
      this.selectedItem = this.stats[key]
      this.selectedItemType = Const.ITEM_TYPE_STAT
    },

    assignStatPoints(key)
    {
      if (this.stats[key].base < Const.MAX_POINTS_PER_STAT && this.totalStatPoints > 0) {
        this.stats[key].base += 1
        this.stats[key].total += 1
        this.totalStatPoints -= 1
      }
    },

    maximizeOrClearStat(key)
    {
      if (this.stats[key].base == Const.MAX_POINTS_PER_STAT) {
        //Clear
        let delta = Const.MAX_POINTS_PER_STAT - this.stats[key].init
        this.stats[key].base = this.stats[key].init
        this.stats[key].total = this.stats[key].init
        this.totalStatPoints += delta
      } else {
        //Maximize
        if (this.totalStatPoints <= 0) {
          return
        }
        let delta = Const.MAX_POINTS_PER_STAT - this.stats[key].base
        if(delta > this.totalStatPoints) {
          delta = this.totalStatPoints
        }
        this.stats[key].base += delta
        this.stats[key].total += delta
        this.totalStatPoints -= delta
      }
    },

    clickTalentMastery(tg, treeType)
    {
      console.log("CLICK TALENT MASTERY")
      if (this.totalCategoryPoints > 0) {
        let group = treeType == Const.TREE_TYPE_CLASS ? 
                                      this.cTalentsTree[tg] : this.gTalentsTree[tg]
        
        if (group.unlocked == false) {
          group.unlocked = true
        } else if (group.enhanced == false) {
          group.mastery += 0.2
          group.enhanced = true
        } else {
          return
        }
  
        group.dirty = true
        this.totalCategoryPoints -= 1
      }
    },

    unlockInscriptionSlot()
    {
      if (this.totalCategoryPoints > 0 && this.inscriptionSlots < Const.INSCRIPTION_SLOT_MAX) {
        this.inscriptionSlots += 1
        this.totalCategoryPoints -= 1
      }
    },

    openProdigyPanel()
    {
      console.log("openProdigyPanel")
      this.isShowingProdigy = !this.isShowingProdigy
    },

    hoverTalentMastery(tg, tree_type)
    {
      this.selectedItem = tree_type == Const.TREE_TYPE_CLASS ? 
                                      this.cTalentsTree[tg] : this.gTalentsTree[tg]
      this.selectedItemType = Const.ITEM_TYPE_CATEGORY
    },

    clickTalentIcon(t, tg, tree_type)
    {
      let group = tree_type == Const.TREE_TYPE_CLASS ? 
                                    this.cTalentsTree[tg]
                                     : this.gTalentsTree[tg]
      let talent = group.talents[t]
      if (group.unlocked && talent.cur_level < talent.max_level) {
        group.dirty = true
        this.assignTalentPoints(tree_type, talent)
      }
    },

    hoverTalentIcon(index, tg, treeType)
    {
      let group = treeType == Const.TREE_TYPE_CLASS ? this.cTalentsTree[tg] : this.gTalentsTree[tg]
      let talent = group.talents[index]
      this.selectedItem = talent
      this.selectedItem["unlocked"] = group.unlocked
      this.selectedItem["mastery"] = group.mastery
      this.selectedItem["category_dep"] = index == 0 ? true : group.talents[index-1].cur_level > 0
      this.selectedItem["index"] = index
      this.selectedItemType = Const.ITEM_TYPE_TALENT
    },

    assignTalentPoints(treeType, talent)
    {
      console.log("assign_talent_points of " + treeType + " : " + talent.name)
      treeType == Const.TREE_TYPE_CLASS ? this.totalCPoints -=1 : this.totalGPoints -= 1
      talent.cur_level += 1
    },

    generateShareURL()
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

    resetTalentGroup(tg, treeType)
    {
      // console.log("Reset talent group:" + tg + " type:" + tree_type)
      let group = treeType == Const.TREE_TYPE_CLASS ? this.cTalentsTree[tg] : this.gTalentsTree[tg]
      group.dirty = false
      let refundPoints = 0
      for (let t of group.talents) {
        if (! t.no_unlearn_last == true) {
          refundPoints += t.cur_level
          t.cur_level = 0
        }
      }

      if (group.enhanced) {
        group.mastery -= 0.2
        group.enhanced = false
        this.totalCategoryPoints += 1
      }

      if (group.unlocked && !group.default_unlocked) {
        group.unlocked = false
        this.totalCategoryPoints += 1
      }

      treeType == Const.TREE_TYPE_CLASS ? this.totalCPoints += refundPoints : this.totalGPoints += refundPoints
    },

    isUndeadRace(race)
    {
      return ["GHOUL", "SKELETON"].indexOf(race) != -1
    },

    onLoadRaceTalent(module)
    {
      console.log("insert race talent")
      for (let m in module){
        if (module[m]["name"] == this.raceSelected.toLowerCase()) {
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
          
          this.gTalentsTree[module[m]["type"]] = config
        }
      }
    },

    prepareProdigyConfig()
    {
      let module = ProdigyConfig
      console.log("load prodigy config")
      console.log(module)
      for (let m in module) {
        console.log(m)
        let stat = module[m].name.slice(0,3)
        let index = Const.STAT_KEYS.indexOf(stat)
        if (index==-1) {
          continue
        }
        this.prodigyConfig[index] = module[m]
        console.log(module[m].type)
        console.log(this.prodigyConfig[index].talents)
        for (let p of this.prodigyConfig[index].talents) {
          p.img_url = require("./assets/talents/" + p["image"])
        }
      }
      console.log(this.prodigyConfig)
    },

    getProdigyConfig(key) {
      if (key == "" || (this.prodigyConfig && Object.keys(this.prodigyConfig).length == 0)){
        return {"img_url" : ""}
      } else {
        console.log(key)
        let tmp = key.split(".")
        let type = tmp[0]
        let index = parseInt(tmp[1])
        return this.prodigyConfig[type].talents[index]
      }
    },

    async resetAll()
    {

      if (this.raceSelected=="" || this.classSelected=="") {
        return
      }

      if (this.isReseting) {
        return
      }

      this.isReseting = true

      // base points
      this.totalStatPoints = Const.TOTAL_STAT_POINTS
      this.totalCPoints = Const.TOTAL_CLASS_POINTS
      this.totalGPoints = Const.TOTAL_GENERIC_POINTS
      this.totalCategoryPoints = Const.TOTAL_CATEGORY_POINTS
      // this.total_prodigy_points = Const.TOTAL_PRODIGY_POINTS
      this.inscriptionSlots = Const.INSCRIPTION_SLOT_BASE

      if (this.raceSelected == "CORNAC") {
        this.totalCategoryPoints += 1
        this.totalCPoints += 6
        this.totalGPoints += 6
      }
      
      // reseting stats
      for (let k in this.stats) {
        if  ("stats" in this.raceConfig[this.raceSelected]) {
          this.stats[k].base = k in this.raceConfig[this.raceSelected]["stats"] ? Const.BASE_STAT_POINT + this.raceConfig[this.raceSelected]["stats"][k] : Const.BASE_STAT_POINT
          this.stats[k].total = this.stats[k].base
          this.stats[k].init = this.stats[k].base
        }

        if ("stats" in this.classConfig[this.classSelected]){
          this.stats[k].base += (k in this.classConfig[this.classSelected]["stats"] ? this.classConfig[this.classSelected]["stats"][k] : 0)
          this.stats[k].total = this.stats[k].base
          this.stats[k].init = this.stats[k].base
        }
      }

      // reseting talents
      this.cTalentsTree = {}
      this.gTalentsTree = {}

      if (this.isUndeadRace(this.raceSelected)) {
        import(`@/assets/data/${this.tomeVersion}/talents.undead-1.json`).then(this.onLoadRaceTalent)
      } else {
        import(`@/assets/data/${this.tomeVersion}/talents.race-1.json`).then(this.onLoadRaceTalent)
      }

      if (Object.keys(this.classConfig[this.classSelected]["talents_types_class"]).length == 0) {
        this.finishLoading()
        return
      }

      for (let tree of ["talents_types_class", "talents_types_generic"]) {
        let classConfig = this.classConfig[this.classSelected]
        let sorted = []
        for (let type in classConfig[tree]) {
          let group = classConfig[tree][type]
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
          let talentGroup = classConfig[tree][ctg]
          // let talent_group = class_config[tree][ctg]
          let mastery = talentGroup[1]
          let type = ctg.split("/")[0]
          // let name = ctg.split("/")[1]
          let tStatus = {
            "index" : i,
            "mastery" : mastery,
            "unlocked" : talentGroup[0],
            "default_unlocked" : talentGroup[0],
            "enhanced" : false,
            "dirty" : false,
          }
          
          await import(`@/assets/data/${this.tomeVersion}/talents.${type}-${mastery}.json`).then((module)=>{
            // console.log(ctg)
            for (let i in module) {
              if (module[i]["type"] == ctg) {
                let config = { ...tStatus, ...module[i]}
                for(let t of config["talents"]) {
                  if (t["id"] in classConfig["talents"]) {
                    t["cur_level"] = parseInt(classConfig["talents"][t.id])
                  } else {
                    t["cur_level"] = 0
                  }
                  t["max_level"] = t["points"]
                  t["img_url"] = require("./assets/talents/"+ t["image"])
                  t["index"] = i
                }

                if (tree == "talents_types_class") {
                  this.cTalentsTree[ctg] = config
                } else {
                  this.gTalentsTree[ctg] = config
                }
              }
            }

            if (tree == "talents_types_generic" && tStatus.index == sorted.length-1){
              this.finishLoading()
            }
          })
        }
      }

    },

    finishLoading()
    {
      console.log("=====Finish Loading")
      this.isReseting = false
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
      let classTalents = {}
      for (let tg in this.cTalentsTree) {
        if (this.cTalentsTree[tg].dirty) {
          classTalents[tg] = [this.cTalentsTree[tg].unlocked, this.cTalentsTree[tg].mastery, []]
          for (let t in this.cTalentsTree[tg].talents)
          classTalents[tg][2].push(this.cTalentsTree[tg].talents[t].cur_level)
        }
      }
      let genericTalents = {}
      for (let tg in this.gTalentsTree) {
        if (this.gTalentsTree[tg].dirty) {
          genericTalents[tg] = [this.gTalentsTree[tg].unlocked, this.gTalentsTree[tg].mastery, []]
          for (let t in this.gTalentsTree[tg].talents)
          genericTalents[tg][2].push(this.gTalentsTree[tg].talents[t].cur_level)
        }
      }
      let obj = {R:this.raceSelected, 
                 C:this.classSelected,
                 S:stats,
                 SP:this.totalStatPoints,
                 CP:this.totalCPoints,
                 TP:this.totalCategoryPoints,
                 GP:this.totalGPoints,
                 CT:classTalents,
                 GT:genericTalents,
                }
      let str = JSON.stringify(obj)
      console.log(str)
      console.log(str.length)
      let b64 = window.btoa(str)
      this.build = b64
    },

    deserialize_base64_remains()
    {
      console.log(this.buildJson)
      this.totalStatPoints = this.buildJson.SP
      this.totalCPoints = this.buildJson.CP
      this.totalCategoryPoints = this.buildJson.TP
      this.totalGPoints = this.buildJson.GP
      let keys = Const.STAT_KEYS
      for (let i in this.buildJson.S) {
        this.stats[keys[i]].base = this.buildJson.S[i]
        this.stats[keys[i]].total = this.buildJson.S[i]
      }

      for (let t in this.buildJson.CT) {
        console.log(t)
        this.cTalentsTree[t].dirty = true
        this.cTalentsTree[t].unlocked = this.buildJson.CT[t][0]
        this.cTalentsTree[t].mastery = this.buildJson.CT[t][1]
        for (let i in this.buildJson.CT[t][2]) {
          this.cTalentsTree[t].talents[i].cur_level = this.buildJson.CT[t][2][i]
        }
      }

      for (let t in this.buildJson.GT) {
        this.gTalentsTree[t].dirty = true
        this.gTalentsTree[t].unlocked = this.buildJson.GT[t][0]
        this.gTalentsTree[t].mastery = this.buildJson.GT[t][1]
        for (let i in this.buildJson.GT[t][2]) {
          this.gTalentsTree[t].talents[i].cur_level = this.buildJson.GT[t][2][i]
        }
      }
      this.build=""
    },

    deserializeBase64RaceAndClass()
    {
      let str = window.atob(this.build)
      this.buildJson = JSON.parse(str)
      this.raceSelected = this.buildJson.R
      this.classSelected = this.buildJson.C
    }
  },

  data() {

    return {
      title : "ToME Planner",
      tomeVersion : "1.7.4",
      desc : "testing descriptions",

      raceConfig:{},
      classConfig:{},
      talentsConfig:{},
      prodigyConfig:[],

      build : "", //build string passed through URL
      buildJson: {},
      isReseting : false,

      isShowingProdigy : false,

      raceSelected : "",
      classSelected : "",

      selectedItem : {},
      selectedItemType : Const.ITEM_TYPE_NONE,

      totalStatPoints : 163,
      totalCPoints : 70,
      totalGPoints : 50,
      totalCategoryPoints : 4,
      // total_prodigy_points : 2,
      inscriptionSlots: 3,
      prodigyId1:"1.1",
      prodigyId2:"1.3",

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

      cTalentsTree : {},
      gTalentsTree : {}
    }
  },

  computed: {
    isSelectingTalent() {
      return this.selectedItemType == Const.ITEM_TYPE_TALENT
    },

    selectedProdigyStr() {
      let str = ""
      if (this.prodigyId1 != "") {
        str += this.getProdigyConfig(this.prodigyId1).name
      }

      if (this.prodigyId2 != "") {
        str += ","
        str += this.getProdigyConfig(this.prodigyId2).name
      }
      return str
    }
  },

  watch: {
    raceSelected(val) {
      console.log("select race: " + val)
      this.resetAll()
    },

    classSelected(val) {
      console.log("select class: " + val)
      this.resetAll()
    },

    lang(val){
      console.log("select lang: " + val)
      this.change_lang(val)
    },

    selectedItem(){
      this.updateDescPanel()
    }
  },

  mounted() {
    
    this.raceConfig = RaceConfig["subraces"]
    this.classConfig = ClassConfig["subclasses"]

    const urlParams = new URLSearchParams(window.location.search);
    this.build = urlParams.get("build");
    if (this.build) {
          this.deserializeBase64RaceAndClass()
    }


    this.prepareProdigyConfig()

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

.main-container {
  display: flex;
  flex-direction: column;
}

.core-panel {
  display: flex;
  justify-content: center;
  gap: 1%;
  margin-top:10px;
}

.stat-panel {
  text-align: center;
  /* flex: 0 0 100px; */
}

.stat-list {
  padding-inline-start: 0px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.talents-panel {
  display: flex;
  flex-direction: column;
  flex: 1 1 820px;
}

.talents-buttons-panel {
  display: flex;
  justify-content: space-between;
}

.talents-tree-panel {
  margin-top:1%;
  display: flex;
  justify-content: center;
}

.desc-panel {
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 1 500px;
}

.vertical-line {
  height: inherit;
  flex : 0 0 20px;
  background-image: url("./assets/ui/border_vert_middle.png");
}

.vertical-line ::before {
  background-image: url("./assets/ui/border_vert_top.png");
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


</style>
