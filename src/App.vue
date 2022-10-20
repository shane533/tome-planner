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
        <MiscPanel 
          :pInscriptionSlots="this.inscriptionSlots" 
          @click-inscription-btn="unlockInscriptionSlot" 
          @reset-inscription-btn="resetInscriptionSlot"
          @click-prodigy-btn="openCloseProdigyPanel"
          @click-escort-btn="addEscortTree"
        >
          {{selectedProdigyStr}}
        </MiscPanel>
      </div>
    </div>
  </div>
  <ProdigyPanel
   v-show="isShowingProdigy" 
   :pData="this.prodigyConfig" 
   :pId1="this.prodigyId1" 
   :pId2="this.prodigyId2"
   @close-prodigy-panel="openCloseProdigyPanel"
   @click-prodigy="chooseProdigy"
  />
  <div class="readme-panel">
    <div class="readme-inner">
      <h2>ToME Planner</h2>
      <p>A character builder for <a href="https://te4.org">Tales of Maj'Eyal</a></p>
      <p>Using json data from <a href="tometips.github.io">ToME Tips</a></p>
      <p>developed by <a href="mailto: ptez533@gmail.com">shane533</a></p>
      <h3>Avaliable Features:</h3>
      <ol class="readme-list">
        <li>Plan your character's stat/talents/prodigies</li>
        <li>Share your build with auto-generated URL</li>
      </ol>
      <h3>Features not implemented yet:</h3>
      <ol class="readme-list">
        <li>Adventurer Class Support</li>
        <li>Race/Class Evolution Prodigies</li>
      </ol>
      <h3>ChangeLog</h3>
      <h4>Oct 19,2022</h4>
      <p>Performance: reduce js file size</p>
      <p>Feature: add button to reset inscription slots</p>
      <p>Bugfix: prevent add steamtech tree multiple times</p>
      <h4>Oct 18,2022</h4>
      <p>first release</p>
    </div>
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
import ProdigyPanel from "./components/ProdigyPanel.vue"
import MiscPanel from "./components/MiscPanel.vue"

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
    ProdigyPanel,
    MiscPanel
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

    makeTalentGroupType(name) {
      let tmp = name.split("/")
      let gtype = tmp[0].trim().toLowerCase()
      let gname = tmp[1].trim().toLowerCase().replace(" ", "-")
      let type = gtype+"/"+gname
      console.log("make talent group type: " + type)
      return type
    },

    addEscortTree(treeSelected){
      if (this.isEmpty()) {
        return
      }
      console.log("AddEscortTree")
      if(treeSelected == "") {
        return
      }
      let isSteam = treeSelected[1] == "steamtech"
      if (isSteam){
        if (this.hasTalentGroup("steamtech/physics", Const.TALENTS_TYPES_GENERIC) && this.hasTalentGroup("steamtech/chemistry", Const.TALENTS_TYPES_GENERIC)) {
          console.log("already have this talent group")
          return
        }
        else if (this.totalCategoryPoints <= 0) {
          alert("Do not have category points to unlock steam talent trees")
          return
        } else {
          this.totalCategoryPoints -= 1
        }
      } else {
        if (this.hasTalentGroup(treeSelected[1], Const.TALENTS_TYPES_GENERIC)) {
          console.log("already have this talent group")
          return
        }
      }

      let groups = treeSelected[1]
      let unlocked = treeSelected[2]
      let curLevels = treeSelected[3]
      
      if (isSteam) {
        this.initializeOneTalentGroup("steamtech/physics", 1, Object.keys(this.gTalentsTree).length+1, unlocked, unlocked, false, false, curLevels, false)
        this.initializeOneTalentGroup("steamtech/chemistry", 1, Object.keys(this.gTalentsTree).length+2, unlocked, unlocked, false, false, curLevels, false)
      } else {
        this.initializeOneTalentGroup(groups, 1, Object.keys(this.gTalentsTree).length+1, unlocked, unlocked, false, false, curLevels, false)
      }
    },

    hoverStatIcon(key)
    {
      this.selectedItem = this.stats[key]
      this.selectedItemType = Const.ITEM_TYPE_STAT
    },

    assignStatPoints(key)
    {
      if (this.isEmpty()) {
        return
      }
      if (this.stats[key].base < Const.MAX_POINTS_PER_STAT && this.totalStatPoints > 0) {
        this.stats[key].base += 1
        this.stats[key].total += 1
        this.totalStatPoints -= 1
      }
    },

    maximizeOrClearStat(key)
    {
      if (this.isEmpty()) {
        return
      }
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
      if (this.isEmpty()) {
        return
      }
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
      if (this.isEmpty()) {
        return
      }
      if (this.totalCategoryPoints > 0 && this.inscriptionSlots < Const.INSCRIPTION_SLOT_MAX) {
        this.inscriptionSlots += 1
        this.totalCategoryPoints -= 1
      }
    },

    resetInscriptionSlot()
    {
      if (this.isEmpty()) {
        return
      }

      if (this.inscriptionSlots > Const.INSCRIPTION_SLOT_BASE) {
        this.totalCategoryPoints += this.inscriptionSlots - Const.INSCRIPTION_SLOT_BASE
        this.inscriptionSlots = Const.INSCRIPTION_SLOT_BASE
      }
    },

    chooseProdigy(index1, index2)
    {
      let tmp = [index1, index2].join(Const.PRODIGY_KEY_DELIMITER)
      if (tmp == this.prodigyId1) {
        this.prodigyId1=this.prodigyId2
        this.prodigyId2=""
      } else if(tmp == this.prodigyId2) {
        this.prodigyId2=""
      } else if(this.prodigyId2 == "") {
        this.prodigyId2 = tmp;
      } else {
        this.prodigyId1 = this.prodigyId2
        this.prodigyId2 = tmp
      }
    },

    openCloseProdigyPanel()
    {
      if (this.isEmpty()) {
        return
      }
      console.log("openCloseProdigyPanel")
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
      if (this.isEmpty()) {
        return
      }
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
      if (this.isEmpty()) {
        return
      }
      console.log("assign_talent_points of " + treeType + " : " + talent.name)
      treeType == Const.TREE_TYPE_CLASS ? this.totalCPoints -=1 : this.totalGPoints -= 1
      talent.cur_level += 1
    },

    generateShareURL()
    {
      if (this.isEmpty()) {
        return
      }
      console.log("===Click share button")
      this.serialize2base64()
      navigator.clipboard.writeText(Const.SHARE_URL+this.build).then(function() {
        console.log('Async: Copying to clipboard was successful!');
        alert("URL copied to clipboard")
      }, function(err) {
        console.error('Async: Could not copy text: ', err);
      });
    },

    hasTalentGroup(tg, treeType)
    {
      let tree = treeType == Const.TREE_TYPE_CLASS ? this.cTalentsTree : this.gTalentsTree
      return Object.keys(tree).indexOf(tg) != -1
    },

    resetTalentGroup(tg, treeType)
    {
      if (this.isEmpty()) {
        return
      }
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

    isEmpty()
    {
      return this.raceSelected == "" || this.classSelected == ""
    },

    isUndeadRace(race)
    {
      return ["GHOUL", "SKELETON", "LICH"].indexOf(race) != -1
    },

    prepareProdigyConfig()
    {
      let module = ProdigyConfig
      // console.log("load prodigy config")
      // console.log(module)
      for (let m in module) {
        // console.log(m)
        let stat = module[m].name.slice(0,3)
        let index = Const.STAT_KEYS.indexOf(stat)
        if (index==-1) {
          continue
        }
        this.prodigyConfig[index] = module[m]
        // console.log(module[m].type)
        // console.log(this.prodigyConfig[index].talents)
        for (let p of this.prodigyConfig[index].talents) {
          p.img_url = require("./assets/talents/" + p["image"])
        }
        this.prodigyConfig[index].talents.sort((a,b) => a.name.localeCompare(b.name))
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

    async initializeWithRaceAndClass()
    {
      // base points
      this.totalStatPoints = Const.TOTAL_STAT_POINTS
      this.totalCPoints = Const.TOTAL_CLASS_POINTS
      this.totalGPoints = Const.TOTAL_GENERIC_POINTS
      this.totalCategoryPoints = Const.TOTAL_CATEGORY_POINTS
      this.inscriptionSlots = Const.INSCRIPTION_SLOT_BASE

      if (this.raceSelected == "CORNAC") {
        this.totalCategoryPoints += 1
        this.totalCPoints += Const.CORNAC_BONUS_POINTS
        this.totalGPoints += Const.CORNAC_BONUS_POINTS
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
        this.initializeOneTalentGroup("undead/" + this.raceSelected.toLowerCase(), 1, 0, true, true, false, false, [1, 0, 0, 0], false)
      } else if(this.raceSelected != "CORNAC") {
        this.initializeOneTalentGroup("race/" + this.raceSelected.toLowerCase(), 1, 0, true, true, false, false, [1, 0, 0, 0], false)
      }

      if (Object.keys(this.classConfig[this.classSelected]["talents_types_class"]).length == 0) {
        this.finishLoading()
        return
      }

      for (let tree of [Const.TALENTS_TYPES_CLASS, Const.TALENTS_TYPES_GENERIC]) {
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
          let unlocked = talentGroup[0]

          this.initializeOneTalentGroup(ctg, mastery, i, unlocked, unlocked, false, false, classConfig["talents"], tree==Const.TALENTS_TYPES_CLASS)
        }
      }

      if (Const.CURSE_CLASSES.indexOf(this.classSelected) != -1) {
        this.initializeOneTalentGroup(Const.CURSE_ARUA, 1, Object.keys(this.gTalentsTree)+1, true, true, false, false, [0,0,0,0], false)
      }
    },

    initializeWithBuildJson()
    {
      this.totalStatPoints = this.buildJson.SP
      this.totalCPoints = this.buildJson.CP
      this.totalCategoryPoints = this.buildJson.TP
      this.totalGPoints = this.buildJson.GP
      this.prodigyId1 = this.buildJson.P1 ? this.buildJson.P1 : ""
      this.prodigyId2 = this.buildJson.P2 ? this.buildJson.P2 : ""
      this.inscriptionSlots = this.buildJson.IS
      let keys = Const.STAT_KEYS
      for (let i in this.buildJson.S) {
        this.stats[keys[i]].base = this.buildJson.S[i]
        this.stats[keys[i]].total = this.buildJson.S[i]
      }

      for (let treeJson of [this.buildJson.CT, this.buildJson.GT]) {
        let type = treeJson == this.buildJson.CT ? Const.TALENTS_TYPES_CLASS : Const.TALENTS_TYPES_GENERIC
        let trees = this.classConfig[this.classSelected][type]
        let defaultTalents = this.classConfig[this.classSelected]["talents"]
        let talentGroups = Object.keys(trees)
        let count = 0
        for (let t in treeJson) {
          let index = talentGroups.indexOf(t)
          let mastery = treeJson[t][1]
          let unlocked = treeJson[t][0]
          let curLevels = treeJson[t][2]
          if (index != -1) {
            let defaultUnlocked = trees[t][0]
            let enhanced = mastery != trees[t][1]
            talentGroups.splice(index, 1)
            this.initializeOneTalentGroup(t, mastery, count, unlocked, defaultUnlocked, enhanced, true, curLevels, type==Const.TALENTS_TYPES_CLASS)
          } else {
            this.initializeOneTalentGroup(t, mastery, count, unlocked, false, mastery==1, true, curLevels, type==Const.TALENTS_TYPES_CLASS)
          }
          count += 1
        }
  
        for (let t of talentGroups) {
          let mastery = trees[t][1]
          let unlocked = trees[t][0]
          this.initializeOneTalentGroup(t, mastery, count, unlocked, unlocked, false, false, defaultTalents, type==Const.TALENTS_TYPES_CLASS)
          count += 1
        }
      }
      this.build=""
    },

    async initializeOneTalentGroup(talentGroupID, mastery, index, unlocked, defaultUnlocked, enhanced, dirty, curLevels, isClass)
    {
      console.log("start loading: " + talentGroupID)
      this.loadingCount += 1
      let type = talentGroupID.split("/")[0]
      //workaround for whitehoof / kruk yeti
      if (talentGroupID == "race/whitehoof") {
        talentGroupID="race/whitehooves"
      } else if(talentGroupID == "race/kruk_yeti") {
        talentGroupID="race/yeti"
      }

      await import(`@/assets/data/${this.tomeVersion}/talents.${type}-${mastery}.json`).then((module)=>{
        // console.log(ctg)
        for (let i in module) {
          if (module[i]["type"] == talentGroupID) {
            let tStatus = {
                  "index" : index,
                  "mastery" : mastery,
                  "unlocked" : unlocked,
                  "default_unlocked" : defaultUnlocked,
                  "enhanced" : enhanced,
                  "dirty" : dirty,
            }
            let config = { ...tStatus, ...module[i]}
            for(let t of config["talents"]) {

              if (Array.isArray(curLevels)) {
                t["cur_level"] = curLevels[config["talents"].indexOf(t)]
              } else {
                if (t["id"] in curLevels) {
                  t["cur_level"] = parseInt(curLevels[t.id])
                } else {
                  t["cur_level"] = 0
                }
              }

              t["max_level"] = t["points"]
              t["img_url"] = require("./assets/talents/"+ t["image"])
              t["index"] = i
            }
            if (isClass) {
              this.cTalentsTree[talentGroupID] = config
            } else {
              this.gTalentsTree[talentGroupID] = config
            }
            console.log("load one talent group: " + talentGroupID)
            this.loadingCount -= 1
            if (this.loadingCount == 0) {
              this.isReseting = false
            }
          }
        }
      })
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

      if (this.hasBuildURL()) {
        this.initializeWithBuildJson()
      } else {
        this.initializeWithRaceAndClass()
      }

    },

    hasBuildURL()
    {
      return this.build && this.build != ""
    },

    finishLoading()
    {
      console.log("=====Finish Loading")
      this.isReseting = false
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
                 IS:this.inscriptionSlots,
                 P1:this.prodigyId1,
                 P2:this.prodigyId2,
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
      this.prodigyId1 = this.buildJson.P1 ? this.buildJson.P1 : ""
      this.prodigyId2 = this.buildJson.P2 ? this.buildJson.P2 : ""
      this.inscriptionSlots = this.buildJson.IS
      let keys = Const.STAT_KEYS
      for (let i in this.buildJson.S) {
        this.stats[keys[i]].base = this.buildJson.S[i]
        this.stats[keys[i]].total = this.buildJson.S[i]
      }

      for (let t in this.buildJson.CT) {
        // console.log(t)
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
      loadingCount : 0,

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
          base : Const.BASE_STAT_POINT,
          total : Const.BASE_STAT_POINT
        },
        "dex" : {
          name : "DEX",
          img_url : new URL("./assets/stats/dexterity.png", import.meta.url),
          base : Const.BASE_STAT_POINT,
          total : Const.BASE_STAT_POINT
        },
        "con" : {
          name : "CON",
          img_url : new URL("./assets/stats/constitution.png", import.meta.url),
          base : Const.BASE_STAT_POINT,
          total : Const.BASE_STAT_POINT
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

.readme-panel {
  display: flex;
  justify-content: center;
}

.readme-list {
  text-align: left;
  list-style: square;
}

h2 {
  color: #759022;
}

h3 {
  color: #759022;
}

a:link {
  color:#eee;
}

</style>
