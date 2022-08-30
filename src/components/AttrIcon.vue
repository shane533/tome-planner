<template>
  <li class="attr_icon">
    <img :src = p_img_url @click="on_click_attr" @mouseover="on_hover_attr">
    <p>{{p_total}}({{p_base}}) </p>
  </li>
</template>

<script>



export default {
  name: 'AttrIcon',
  props: {
    p_id: String,
    p_base: Number,
    p_total: Number,
    p_img_url: URL
  },

  methods: {
    on_click_attr()
    {
      console.log("Click attr button")
      this.$emit("click_attr", this.p_id)
    },

    on_hover_attr()
    {
    //   console.log("hover attr button")
      this.$emit("hover_attr", this.p_id)
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
