<template>
    <div class="base_panel">
        <button class="btn" id="inscription_btn" @click="on_click_inscription_btn">Inscription Slots:{{p_inscription_slots}}</button>
        <p>Prodigies:</p>
        <img class="icon" id="prodigy_1" :src="p_prodigy_config_1.img_url" @click="on_click_prodigy_slot">
        <img class="icon" id="prodigy_2" :src="p_prodigy_config_2.img_url" @click="on_click_prodigy_slot">
    </div>
  </template>
  
  <script>
  
  
  
  export default {
    name: 'InscriptionProdigyDiv',
    props: {
      p_inscription_slots: Number,
      p_prodigy_config_1: Object,
      p_prodigy_config_2: Object,
    },
    emits: ['click_inscription_btn', 'click_prodigy_slot'],

    methods: {
      on_click_inscription_btn()
      {
        console.log("Click inscription button")
        this.$emit("click_inscription_btn")
      },
  
      on_click_prodigy_slot()
      {
        this.$emit("click_prodigy_slot")
      }
    },
  
    computed: {
      
    },

    mounted() {
        console.log(this.p_data)
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>

    #inscription_btn {
        align-self:left;
    }
  
    .icon {
      border-style: solid;
      border-width: 2px;
      border-color: #969696;
    }

    .base_panel {
        bottom:0%;
    }
  
    p {
      margin-top: 0%;
      /* float:left; */
    }
  
   
  </style>
  