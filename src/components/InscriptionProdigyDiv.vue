<template>
    <div class="base-panel">
        <button class="btn" id="inscription-btn" @click="onClickInscriptionBtn">Inscription Slots:{{pInscriptionSlots}}</button>
        <p>Prodigies:</p>
        <img class="icon" id="prodigy1" :src="pProdigyConfig1.img_url" @click="onClickProdigySlot">
        <img class="icon" id="prodigy2" :src="pProdigyConfig2.img_url" @click="onClickProdigySlot">
    </div>
  </template>
  
  <script>
  
  
  
  export default {
    name: 'InscriptionProdigyDiv',
    props: {
      pInscriptionSlots: Number,
      pProdigyConfig1: Object,
      pProdigyConfig2: Object,
    },
    emits: ['click-inscription-btn', 'click-prodigy-slot'],

    methods: {
      onClickInscriptionBtn()
      {
        console.log("Click inscription button")
        this.$emit("click-inscription-btn")
      },
  
      onClickProdigySlot()
      {
        this.$emit("click-prodigy-slot")
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
    }
  
    p {
      margin-top: 0%;
      /* float:left; */
    }
  
   
  </style>
  