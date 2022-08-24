<template>
  <li class="talent_icon">
    <img :src = p_img_url @click="on_click_talent" @mouseover="on_hover_talent">
    <p>{{p_cur_level}} / {{p_max_level}}</p>
  </li>
</template>

<script>


export default {
  name: 'TalentIcon',
  props: {
    p_index: Number,
    p_name: String,
    p_cur_level: Number,
    p_max_level: Number,
    p_img_url: URL
  },

  methods: {
    on_click_talent() {
      console.log("TalentIcon.Click talent:" + this.p_name)
      this.$emit("click_talent", this.p_index)
    },

    on_hover_talent() {
      // console.log("TalentIcon.Hover: " + this.p_name)
      this.$emit("hover_talent", this.p_index)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  p {
    margin-top:0%
  }

  li {
    list-style: none;
    float:left;
  }
</style>
