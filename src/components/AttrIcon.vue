<template>
  <li class="attr_icon">
    <img :src = p_img_url @click="on_click_attr">
    <p>{{p_total}}({{p_base}}) </p>
  </li>
</template>

<script>



export default {
  name: 'AttrIcon',
  props: {
    p_id: Number,
    p_base: Number,
    p_total: Number,
    p_img_url: URL
  },

  methods: {
    on_click_attr(){
      this.$emit("click_attr", this.p_id)
      console.log("Click attr button")
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
