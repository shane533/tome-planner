<template>
    <div class="prodigy-panel-bg" @click="onClickBackground">
        <div class="prodigy-panel-inner" @click="onClickInner">
            <div class="title-panel">

            </div>
            <div class="prodigy-panel-content">
                <div v-if="pData && Object.keys(this.pData) != 0 " class="prodigy-panel">
                    <h3>Prodigies</h3>
                    <div class="prodigy-container">
                        <ol v-for="(pg, index1) in this.pData" :key="pg.type" class="prodigy-column">
                            <li v-for="(p, index2) in pg.talents" :key="p.type" :class="isNormalProdigy(p) ? 'show':'hide'"> 
                                <!-- <p>{{p.name}}</p> -->
                                <img  :class="{icon:true, chosen:this.isChosen(index1, index2)}" :src="p.img_url" @click="onClickProdigy(index1, index2)" @mouseover="onHoverProdigy(index1, index2)"/>
                            </li>
                        </ol>
                    </div>
                </div>
                <div class="prodigy-desc">
                    <TalentDesc 
                        :pData="this.selectingProdigy"
                    />
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  
  import { Const } from "../const.js"
import TalentDesc from "./TalentDesc.vue"
  
  export default {
    name: "ProdigyPanel",
    props: {
        pData: Object,
        pId1: String,
        pId2: String
    },
    data() {
        return {
            selectingProdigy: {}
        };
    },
    methods: {
        isNormalProdigy(config) {
            if (Const.RACE_EVOLUTION.indexOf(config.short_name) != -1) {
                return false;
            }
            if (config.is_class_evolution || config.not_listed) {
                return false;
            }
            return true;
        },
        isChosen(index1, index2) {
            let tmp = [index1, index2].join(Const.PRODIGY_KEY_DELIMITER);
            return tmp == this.pId1 || tmp == this.pId2;
        },
        onClickProdigy(index1, index2) {
            // console.log("Hover " + index1 + index2)
            this.$emit("click-prodigy", index1, index2);
        },
        onHoverProdigy(index1, index2) {
            // console.log("Hover " + index1 + index2)
            this.selectingProdigy = this.pData[index1].talents[index2];
        },
        onClickBackground() {
            console.log("CLICK background");
            this.$emit("close-prodigy-panel");
        },
        onClickInner(event) {
            event.stopPropagation();
        }
    },
    computed: {},
    components: { TalentDesc }
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
        max-width:80vw;
        max-height: 80vh;
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
        width: 40vw;
    }

    .prodigy-container {
        overflow: auto;
        height: 60vh;
        display:flex;
        flex-direction: row;
        gap:2px;
    }

    .prodigy-container::-webkit-scrollbar {
        width:20px;
    }

    .prodigy-container::-webkit-scrollbar-track {
        background-image: url("../assets/ui/scrollbar_top.png"), url("../assets/ui/scrollbar.png"), url("../assets/ui/scrollbar_bottom.png");
        background-repeat: no-repeat, repeat, no-repeat;
        background-position-y: top, center, bottom;
        background-size: auto, 80%, auto;
    }

    .prodigy-container::-webkit-scrollbar-thumb {
        background-image: url("../assets/ui/scrollbar-sel.png");
        background-repeat: no-repeat;
    }

    .prodigy-desc {
        flex: 1 1 400px;
        width: 35vh
    }

    .prodigy-column {
        list-style: none;
        padding-inline-start: 0px;
    }

    .icon {
        border-style: solid;
        border-width: 2px;
        border-color: #969696;
    }

    .chosen {
        border-color: #00ff00;
    }

   
  </style>
  