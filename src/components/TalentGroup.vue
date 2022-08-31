<template>
  <li class="talent_group" :style="{'filter': 'grayscale(50%)'}">
    <div class="title">
        <input class="expand" type="checkbox"/>
        <button id="reset" @click="on_click_reset_button">Reset</button>
        <p class="name" @click="on_click_mastery">{{p_name}} ({{p_mastery}}) </p>
    </div>
    <div style="clear: both;"></div>
    <ol>
        <TalentIcon v-for="(t, index) in p_talents" :key="t.name" :p_index="index" :p_name="t.name" :p_img_url="t.img_url" :p_cur_level="t.cur_level" :p_max_level="t.max_level" @click_talent="on_click_talent" @hover_talent="on_hover_talent" />
        <div style="clear: both;"></div>
    </ol>
  </li>
</template>

<script>
import TalentIcon from './TalentIcon.vue';


export default {
    name: "TalentGroup",
    props: {
        p_name: String,
        p_unlocked: Boolean,
        p_mastery: Number,
        p_talents: Array
    },
    components: { TalentIcon },

    methods: {

      on_click_mastery()
      {
        console.log("TalentGroup.click mastery")
        this.$emit("click_mastery", this.p_name)
      },

      on_click_reset_button()
      {
        console.log("TalentGroup.click reset button" + this.p_name)
        this.$emit("reset_talent_group", this.p_name)
      },

      on_click_talent(name)
      {
        console.log("TalentGroup.on_click_talent: " + name)
        this.$emit("click_talent", name, this.p_name)
      },

      on_hover_talent(index)
      {
        // console.log("TalentGroup.on_hover_talent: " + index)
        this.$emit("hover_talent", index, this.p_name)
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .title {
        float: left
    }

    .mastery {
        float :left
    }

    li {
        /* float:left; */
        list-style: none;
    }

    p {
        display: inline
    }
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
