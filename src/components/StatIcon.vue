<template>
  <li class="stat-icon">
    <img class="icon" :src = p_img_url @click="on_click_stat" @mouseover="on_hover_stat">
    <div class="desc">
      <p :class="points_class">{{p_total}}({{p_base}}) </p>
      <button class="btn" id="max-btn" @click="on_click_max_stat">{{max_or_clear}}</button>
    </div>
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
    },

    on_click_max_stat()
    {
      this.$emit("max_stat", this.p_id)
    }
  },

  computed: {
    points_class() {
      return this.p_base >= 60 ? "max" : "normal" 
    },

    max_or_clear() {
      return this.p_base >= 60 ? "C" : "M"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  #max-btn {
    border-width: 1px;
  }

  .stat-icon {
    list-style: none;
    display:flex;
    flex-direction: column;
  }

  .desc {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .max {
    color: #969696;
    margin-top: 0%;
  }

  .normal {
    color: white;
    margin-top: 0%;
    margin-bottom: 0%;
  }

  .icon {
    border-style: solid;
    border-width: 2px;
    border-color: #969696;
  }

</style>
