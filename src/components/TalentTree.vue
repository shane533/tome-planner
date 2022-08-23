<template>
  <div class="talent_tree">
    <!-- <p v-for="t in p_talents_groups" :key="t.name"> {{t.name}} + {{t.talents_list}}</p> -->
    <ol>
        <TalentGroup v-for="t in p_talents_groups" :key="t.name" :p_name="t.name" :p_mastery="t.mastery" :p_talents="t.talents_list" />
        
    </ol>
  </div>
</template>

<script>
import TalentGroup from './TalentGroup.vue';


export default {
    name: "TalentTree",
    props: {
        p_talents_groups: Array
    },
    components: { TalentGroup }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
