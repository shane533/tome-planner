<template>
  <li class="attr_icon">
    <img :src = p_img_url>
    <p>{{p_total}}({{p_base}}) </p>
  </li>
</template>

<script>


export default {
  name: 'AttrIcon',
  props: {
    p_base: Number,
    p_total: Number,
    p_img_url: String
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  li {
    list-style: none;
    /* float:left; */
  }
</style>
