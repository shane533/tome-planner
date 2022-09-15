<template>
  <li>
    <div class="title">
        <label :for="p_data.type">
          <img :src="expand_img">
        </label>
        <input :id="p_data.type" type="checkbox" style="display:none" v-model="expanded"/>
        <p :class="name_class" @click="on_click_mastery">{{p_data.category}} / {{p_data.name}} ({{p_data.mastery.toFixed(2)}}) </p>
        <button class="btn" id="reset" @click="on_click_reset_button">X</button>
    </div>
    <div style="clear: both;"></div>
    <ol v-show="expanded" :class="{locked_group: !p_data.unlocked}">
        <TalentIcon v-for="(t, index) in p_data.talents" :key="t.name" :p_index="index" :p_data="t" :p_req="this.meet_category_reqs(index)" @click_talent="on_click_talent" @hover_talent="on_hover_talent" />
        <div style="clear: both;"></div>
    </ol>
  </li>
</template>

<script>
import TalentIcon from './TalentIcon.vue';


export default {
    name: "TalentGroup",
    props: {
        p_data: Object
    },
    components: { TalentIcon },
    emits: ['click_talent', 'hover_talent'],

    data() {
      return {
        expanded: this.p_data.unlocked
      }
    },

    computed:
    {
      expand_img() {
        return this.expanded ? require("../assets/ui/minus.png") : require("../assets/ui/plus.png")
      },
      name_class() {
        return this.p_data.unlocked ? "unlocked" : "locked"
      }
    },

    methods: {

      meet_category_reqs(index)
      {
        if (index == 0 || this.p_data.talents[index].no_levelup_category_deps) {
          return true
        } else {
          return this.p_data.talents[index-1].cur_level > 0
        }
      },

      on_click_mastery()
      {
        console.log("TalentGroup.click mastery")
        this.$emit("click_mastery", this.p_data.type)
      },

      on_click_reset_button()
      {
        console.log("TalentGroup.click reset button" + this.p_data.type)
        this.$emit("reset_talent_group", this.p_data.type)
      },

      on_click_talent(name)
      {
        console.log("TalentGroup.on_click_talent: " + name)
        this.$emit("click_talent", name, this.p_data.type)
      },

      on_hover_talent(index)
      {
        // console.log("TalentGroup.on_hover_talent: " + index)
        this.$emit("hover_talent", index, this.p_data.type)
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ol {
    padding-inline-start: 20px;
  }

  li {
      list-style: none;
  }

  p {
      display: inline
  }

  .title {
      float: left
  }

  .mastery {
      float :left
  }

  .unlocked {
    margin-left: 5px;
    color: #00FF00;
    font-weight: bold;
  }

  .locked {
    margin-left: 5px;
    color: #969696;
    font-weight: bold;
  }
  
  .locked_group {
    filter: brightness(50%);
  }

  #reset {
    border-width: 1px;
  }

</style>
