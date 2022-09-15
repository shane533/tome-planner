<template>
  <li class="talent_icon">
    <img :class="{icon:true, dark:!p_req}"  :src = p_data.img_url @click="on_click_talent" @mouseover="on_hover_talent">
    <p :class="{max: p_data.cur_level==p_data.max_level, locked:!p_req}">{{p_data.cur_level}}/{{p_data.max_level}}</p>
  </li>
</template>

<script>


export default {
  name: 'TalentIcon',
  props: {
    p_data: Object,
    p_index: Number,
    p_req: Boolean 
  },

  emits: ['click_talent', 'hover_talent'],

  methods: {
    on_click_talent() {
      // console.log("TalentIcon.Click talent:" + this.p_name)
      if (this.p_req) {
        this.$emit("click_talent", this.p_index)
      }
    },

    on_hover_talent() {
      // console.log("TalentIcon.Hover: " + this.p_req)
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

  .dark {
    filter:brightness(0.5)
  }

  .max {
    color: #00FF00
  }

  .locked {
    color : red
  }

  li {
    list-style: none;
    float:left;
    margin-left : 5px;
  }
</style>
