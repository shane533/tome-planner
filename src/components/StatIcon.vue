<template>
  <li class="stat_icon">
    <img :src = p_img_url @click="on_click_stat" @mouseover="on_hover_stat">
    <p>{{p_total}}({{p_base}}) </p>
  </li>
</template>

<script>



export default {
  name: 'StatIcon',
  props: {
    p_id: String,
    p_base: Number,
    p_total: Number,
    p_img_url: URL
  },

  methods: {
    on_click_stat()
    {
      console.log("Click stat button")
      this.$emit("click_stat", this.p_id)
    },

    on_hover_stat()
    {
      this.$emit("hover_stat", this.p_id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  p {
    margin-top: 0%;
  }

  li {
    list-style: none;
    /* float:left; */
  }
</style>
