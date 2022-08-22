<template>
  <div class="talent_icon">
    <img :src = img_url>
    <h1>{{cur_level}} / {{max_level}}</h1>
  </div>
</template>

<script>


export default {
  name: 'TalentIcon',
  props: {
    cur_level: Number,
    max_level: Number,
    img_url: String
  },

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
