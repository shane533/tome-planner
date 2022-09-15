<template>
    <div class="prodigy_panel_bg">
        <div class="prodigy_panel_inner">
            <div v-if="p_data && Object.keys(this.p_data) != 0 " class="prodigy_panel">
                <h3>Prodigies</h3>
                <div class="prodigy_container">
                    <ol v-for="pg in this.p_data" :key="pg.type">
                        <li v-for="p in pg.talents" :key="p.type" :class="isNormalProdigy(p) ? 'show':'hide'"> 
                            <!-- <p>{{p.name}}</p> -->
                            <img :src="p.img_url"/>
                        </li>
                    </ol>
                </div>
            </div>
            <div style="clear: both;"></div>
            <div class="prodigy_desc">
                <p>Heres some descption</p>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  
  
  
  export default {
    name: 'ProdigyPanel',
    props: {
      p_data: Object,
      p_id_1: String,
      p_id_2: String
    },
  
    methods: {
        isNormalProdigy() {
            return true
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
    
    .prodigy_panel_bg {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        z-index: 1;
    }

    .prodigy_panel_inner {
        margin-top:10%;
        width:800px;
        text-align: center;
        border-style: solid;
        border-width: 64px;
        border-image: url("../assets/ui/border-dialog.png") 64 fill repeat;
    }

    .prodigy_container {
        height: 600px;
        overflow: auto;
    }

    .prodigy_desc {
        float: right
    }

    ol {
        list-style: none;
        float:left;
    }

    img {
        border-style: solid;
        border-width: 2px;
        border-color: #969696;
    }

   
  </style>
  