<template>
  <div class="misc-panel">
    <div class="inscription-prodigy-panel">
        <button class="btn" id="inscription-btn" @click="onClickInscriptionBtn">Inscription Slots:{{pInscriptionSlots}}</button>
        <button class="btn" id="prodigy-btn" @click="onClickProdigyBtn">Prodigies:</button>
        <div class="prodigy-text">
          <slot></slot>
        </div>
    </div>
    <p class="escort-title">Add Escort Talent Tree</p>
    <div class="escort-panel">
      <select id="escort-select" v-model="treeSelected">
        <option disabled value="">select a escort talent class</option>
        <template v-for="c in escortConfig" :key="c">
            <option :value="c">{{c}}</option>
        </template>
      </select>
      <button class="btn" @click="onClickEscortButton">Add</button>
    </div>
  </div>
</template>
  
  <script>
  
  
  
  export default {
    name: 'MiscPanel',
    props: {
      pInscriptionSlots: Number,
    },
    emits: ['click-inscription-btn', 'click-prodigy-btn', 'click-escort-btn'],

    data() {
      return {
        treeSelected : "",
        escortConfig : ["Spell / Staff Combat", 
                        "Spell / Stone Alchemy", 
                        "Wild-Gift / Mindstar Mastery",
                        "Corruption / Curses",
                        "	Psionic / Feedback",
                        "Spell / Divination",
                        "Wild-Gift / Call of the Wild",
                        "Celestial / Chants",
                        "Psionic / Augmented Mobility",
                        "Chronomancy / Chronomancy",
                        "Psionic / Dreaming",
                        "Cunning / Survival",
                        "Cunning / Scoundrel",
                        "SteamTech"]
      }
    },

    methods: {
      onClickInscriptionBtn()
      {
        console.log("Click inscription button")
        this.$emit("click-inscription-btn")
      },
  
      onClickProdigyBtn()
      {
        this.$emit("click-prodigy-btn")
      },

      onClickEscortButton()
      {
        console.log("Click escort button")
        this.$emit("click-escort-btn", this.treeSelected)
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

    .misc-panel {
      display: flex;
      flex-direction: column;
    }

    .inscription-prodigy-panel {
        bottom:0%;
        display:flex;
        align-items: center;
        gap: 5px;
        /* justify-content: space-between; */
    }

    .escort-panel {
      display: flex;
    }
  
    .prodigy-text {
      color:#00ff00;
      /* float:left; */
    }

    .escort-title {
      text-align: left;
    }
  
   
  </style>
  