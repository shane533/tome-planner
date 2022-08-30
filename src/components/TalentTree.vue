<template>
  <div class="talent_tree">
    <!-- <p v-for="t in p_talents_groups" :key="t.name"> {{t.name}} + {{t.talents_list}}</p> -->
    <ol>
        <TalentGroup v-for="t of p_talents_groups" :key="t.name" :p_name="t.type" :p_mastery="t.mastery" :p_unlocked="t.unlocked" :p_talents="t.talents" @click_talent="on_click_talent" @hover_talent="on_hover_talent"/> 
    </ol>
  </div>
</template>

<script>
import TalentGroup from './TalentGroup.vue';


export default {
    name: "TalentTree",
    props: {
        p_type : String,
        p_talents_groups: Object
    },
    components: { TalentGroup },

    methods : {
    
      on_click_mastery(t_group_name)
      {
        console.log("TalentTree.onClickMastery: " + t_group_name)
        this.$emit("click_mastery", t_group_name, this.p_type)
      },

      on_click_talent(t_name, t_group_name) {
        console.log("TalentTree.onClickTalent" + t_name + "/" +  t_group_name + "/" + this.p_type)
        this.$emit("click_talent", t_name, t_group_name, this.p_type)
      },

      on_hover_talent(t_name, t_group_name) {
        // console.log("TalentTree.onHoverTalent" + t_name + "/" +  t_group_name + "/" + this.p_type)
        this.$emit("hover_talent", t_name, t_group_name, this.p_type)
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .talent_tree {
    float: left
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
