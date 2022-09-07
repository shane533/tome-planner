<template>
  <li class="talent_icon">
    <div class="icon">
      <img :src = p_img_url @click="on_click_talent" @mouseover="on_hover_talent">
    </div>
    <p :class="{max: p_cur_level==p_max_level}">{{p_cur_level}}/{{p_max_level}}</p>
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
    p_img_url: String
  },

  methods: {
    on_click_talent() {
      // console.log("TalentIcon.Click talent:" + this.p_name)
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

  .icon {
    border-style: solid;
    border-width: 2px;
    border-color: #969696
  }

  .max {
    color: #00FF00
  }

  li {
    list-style: none;
    float:left;
    margin-left : 3%;
  }
</style>
