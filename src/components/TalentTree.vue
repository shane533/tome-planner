<template>
  <div class="talent-tree">
    <ol>
        <TalentGroup v-for="t of pTalentsGroups" :key="t.type" :pData="t" @click-talent="onClickTalent" @hover-talent="onHoverTalent" @reset-talent-group="onResetTalentGroup" @click-mastery="onClickMastery" /> 
    </ol>
  </div>
</template>

<script>
import TalentGroup from './TalentGroup.vue';


export default {
    name: "TalentTree",
    props: {
        pType : String,
        pTalentsGroups: Object
    },
    components: { TalentGroup },

    methods : {
    
      onClickMastery(groupName)
      {
        console.log("TalentTree.onClickMastery: " + groupName)
        this.$emit("click-mastery", groupName, this.pType)
      },

      onClickTalent(name, groupName) {
        console.log("TalentTree.onClickTalent" + name + "/" +  groupName + "/" + this.p_type)
        this.$emit("click-talent", name, groupName, this.pType)
      },

      onHoverTalent(name, groupName) {
        // console.log("TalentTree.onHoverTalent" + t_name + "/" +  t_group_name + "/" + this.p_type)
        this.$emit("hover-talent", name, groupName, this.pType)
      },

      onResetTalentGroup(groupName) {
        this.$emit("reset-talent-group", groupName, this.pType)
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .talent-tree {
    flex: 1 0 400px;
    height: 700px;
    overflow: auto;
  }

  .talent-tree::-webkit-scrollbar {
    width:20px;
  }

  .talent-tree::-webkit-scrollbar-track {
    background-image: url("../assets/ui/scrollbar_top.png"), url("../assets/ui/scrollbar.png"), url("../assets/ui/scrollbar_bottom.png");
    background-repeat: no-repeat, repeat, no-repeat;
    background-position-y: top, center, bottom;
    background-size: auto, 80%, auto;
  }
  
  .talent-tree::-webkit-scrollbar-thumb {
    background-image: url("../assets/ui/scrollbar-sel.png");
    background-repeat: no-repeat;
  }
/* h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
