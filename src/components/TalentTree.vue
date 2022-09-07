<template>
  <div class="talent_tree">
    <!-- <p v-for="t in p_talents_groups" :key="t.name"> {{t.name}} + {{t.talents_list}}</p> -->
    <ol>
        <TalentGroup v-for="t of p_talents_groups" :key="t.type" :p_data="t" @click_talent="on_click_talent" @hover_talent="on_hover_talent" @reset_talent_group="on_reset_talent_group" @click_mastery="on_click_mastery" /> 
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
      },

      on_reset_talent_group(t_group_name) {
        this.$emit("reset_talent_group", t_group_name, this.p_type)
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .talent_tree {
    width: 45%;
    height: 700px;
    float: left;
    overflow: auto;
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
