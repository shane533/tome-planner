<template>
    <div class="base-panel">
        <button class="btn" id="inscription-btn" @click="onClickInscriptionBtn">Inscription Slots:{{pInscriptionSlots}}</button>
        <button class="btn" id="prodigy-btn" @click="onClickProdigyBtn">Prodigies:</button>
        <div class="prodigy-text">
          <slot></slot>
        </div>
    </div>
  </template>
  
  <script>
  
  
  
  export default {
    name: 'InscriptionProdigyDiv',
    props: {
      pInscriptionSlots: Number,
    },
    emits: ['click-inscription-btn', 'click-prodigy-btn'],

    methods: {
      onClickInscriptionBtn()
      {
        console.log("Click inscription button")
        this.$emit("click-inscription-btn")
      },
  
      onClickProdigyBtn()
      {
        this.$emit("click-prodigy-btn")
      }
    },
  
    computed: {

    },

    mounted() {
        console.log(this.pData)
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>

    #inscription-btn {
        align-self:left;
    }
  
    .icon {
      border-style: solid;
      border-width: 2px;
      border-color: #969696;
    }

    .base-panel {
        bottom:0%;
        display:flex;
        align-items: center;
        gap: 5px;
        /* justify-content: space-between; */
    }
  
    .prodigy-text {
      color:#00ff00;
      /* float:left; */
    }
  
   
  </style>
  