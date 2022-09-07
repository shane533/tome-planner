<template>
    <div class="talent_desc">
        <p id="desc_title">{{p_data.name}}</p>
        <p id="talent_level">Current talent level: {{p_data.cur_level}}</p>
        <ol id="requre_list">
            <li :style="{color: p_data.unlocked ? '#00ff00' : 'red'}">Talent category known</li>
            <li>Level: {{level_str}}</li>
        </ol>
        <p id="effect_level"><span class="c1">Effect talent level:</span> {{effect_level_str}}</p>
        <p><span class="c1">Use mode: </span>{{use_mode_str}}</p>
        <p><span class="c1">Range: </span>{{range_str}}</p>
        <p><span class="c1">Cooldown: </span>{{cd_str}}</p>
        <p><span class="c1">Travel Speed: </span>{{tra_spd_str}}</p>
        <p><span class="c1">Use Speed: </span>{{use_spd_str}}</p>
        <p><span class="c1">Range: </span>{{range_str}}</p>
        <p class="c1" id="desc_head">Description:</p>
        <div v-html="p_data.info_text"></div>

    </div>    
</template>
  
  <script>
  
  
  export default {
    name: 'TalentDesc',
    props: {
      p_data: Object
    },

    data() {
        return {
            effect_level_str: "1.0 2.0 3.0 4.0 5.0",
            use_mode_str: "Activated",
            range_str: "melee/personal",
            cd_str: "0",
            tra_spd_str: "instantaneous",
            use_spd_str: "instant",
        }
    },

    computed: {
        level_str (){
            if(this.p_data.require) {
                let t = []
                for (let r of this.p_data.require) {
                    t.push(r.split(",")[0].split(" ")[1])
                }
                return t.join(", ")
            } else {
                return "0, 1, 2, 3, 4"
            }
        },
    },
  
    methods: {
  
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>

    p {
        margin-top: 0%;
        margin-bottom: 0%;
    }

    ol {
        list-style:square;
        margin-top: 0%;
        margin-bottom: 0%
    }

    li {
        color: #00FF00
    }

    #desc_title {
        color:#ffd800;
        margin-bottom:3%;
    }

    .talent_desc {
        text-align: left;
    }

    .c1 {
        color: #4ce675;
    }

  </style>
  