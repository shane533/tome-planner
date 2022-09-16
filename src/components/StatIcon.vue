<template>
  <li class="stat-icon">
    <img class="icon" 
      :src = pImgUrl
      width="64"
      height="64" 
      @click="onClickStat" 
      @mouseover="onHoverStat">
    <div class="desc">
      <p :class="pointsClass">{{pTotal}}({{pBase}}) </p>
      <button class="btn" id="max-btn" @click="onClickMaxStat">{{maxOrClear}}</button>
    </div>
  </li>
</template>

<script>



export default {
  name: 'StatIcon',
  props: {
    pId: String,
    pBase: Number,
    pTotal: Number,
    pImgUrl: URL
  },

  methods: {
    onClickStat()
    {
      console.log("Click stat button")
      this.$emit("click-stat", this.pId)
    },

    onHoverStat()
    {
      this.$emit("hover-stat", this.pId)
    },

    onClickMaxStat()
    {
      this.$emit("max-stat", this.pId)
    }
  },

  computed: {
    pointsClass() {
      return this.pBase >= 60 ? "max" : "normal" 
    },

    maxOrClear() {
      return this.pBase >= 60 ? "C" : "M"
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
    margin-bottom: 0%;
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
    flex: 0 0 auto;
  }

</style>
