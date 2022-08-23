<template>
  <li class="talent_icon">
    <img :src = p_img_url @click="on_click_talent">
    <h1>{{p_cur_level}} / {{p_max_level}}</h1>
  </li>
</template>

<script>


export default {
  name: 'TalentIcon',
  props: {
    p_name: String,
    p_cur_level: Number,
    p_max_level: Number,
    p_img_url: URL
  },

  methods: {
    on_click_talent() {
      console.log("TalentIcon.Click talent")
      this.$emit("click_talent", this.p_name)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  li {
    list-style: none;
    float:left;
  }
</style>
