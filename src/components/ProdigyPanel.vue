<template>
    <div class="prodigy-panel-bg">
        <div class="prodigy-panel-inner">
            <div class="title-panel">

            </div>
            <div class="prodigy-panel-content">
                <div v-if="pData && Object.keys(this.pData) != 0 " class="prodigy-panel">
                    <h3>Prodigies</h3>
                    <div class="prodigy-container">
                        <ol v-for="(pg, index1) in this.pData" :key="pg.type" class="prodigy-column">
                            <li v-for="(p, index2) in pg.talents" :key="p.type" :class="isNormalProdigy(p) ? 'show':'hide'"> 
                                <!-- <p>{{p.name}}</p> -->
                                <img :src="p.img_url" @click="onClickProdigy(index1, index2)" @mouseover="onHoverProdigy(index1, index2)"/>
                            </li>
                        </ol>
                    </div>
                </div>
                <div class="prodigy-desc">
                    <p>Diplaying Prodigy: {{this.selectingProdigy.name}}</p>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  
  
  
  export default {
    name: 'ProdigyPanel',
    props: {
      pData: Object,
      pId1: String,
      pId2: String
    },

    data() {
        return {
            selectingProdigy:{}
        }
    },
  
    methods: {
        isNormalProdigy() {
            return true
        },

        onClickProdigy(index1, index2) {
            // console.log("Hover " + index1 + index2)
            this.$emit("click-prodigy", index1, index2)
        },

        onHoverProdigy(index1, index2) {
            // console.log("Hover " + index1 + index2)
            this.selectingProdigy = this.pData[index1].talents[index2]
        }
        
    },
  
    computed: {
      
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>

    .hide {
        display: none;
    }
    
    .prodigy-panel-bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: rgba(1,1,1,0.8);

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .prodigy-panel-inner {
        max-width:1080px;
        max-height: 1080px;
        text-align: center;
        border-style: solid;
        border-width: 64px;
        border-image: url("../assets/ui/border-dialog.png") 64 fill repeat;
        display:flex;
        flex-direction: column;
    }

    .prodigy-panel-content {
        display: flex;
        flex-direction: row;
    }

    .prodigy-panel {
        flex: 1 1 450px;
    }

    .prodigy-container {
        overflow: auto;
        display:flex;
        flex-direction: row;
        gap:2px;
    }

    .prodigy-desc {
        flex: 1 1 400px;
    }

    .prodigy-column {
        list-style: none;
        padding-inline-start: 0px;
    }

    img {
        border-style: solid;
        border-width: 2px;
        border-color: #969696;
    }

   
  </style>
  