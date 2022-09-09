<template>
    <div class="talent_desc">
        <p id="desc_title">{{p_data.name}}</p>
        <p id="talent_level">Current talent level: {{p_data.cur_level}}</p>
        <ol id="requre_list">
            <li :style="{color: p_data.unlocked ? '#00ff00' : 'red'}">Talent category known</li>
            <li v-if="!this.p_data.no_levelup_category_deps && p_data.index!=0" :style="{color: p_data.category_dep ? '#00ff00' : 'red'}">Lower talents of the same category: {{p_data.index}}</li>
            <li v-if="stat_req!=''">{{stat_req}}</li>
            <li>Level: {{level_str}}</li>
        </ol>
        <p style="color:#00ff00" id="effect_level"><span class="c1">Effect talent level:</span> {{effect_level_str}}</p>
        <p style="color:#00ff00"><span class="c1">Use mode: </span>{{use_mode_str}}</p>
        <p style="color:#00ff00" v-if="this.p_data.cost"><span class="c1" >{{resource_str}} cost: </span>{{cost_str}}</p>
        <p v-if="this.p_data.range"><span class="c1">Range: </span>{{range_str}}</p>
        <p v-if="this.p_data.cooldown"><span class="c1">Cooldown: </span>{{cd_str}}</p>
        <p v-if="this.p_data.proj_speed"><span class="c1">Travel Speed: </span>{{tra_spd_str}}</p>
        <p v-if="this.p_data.use_speed"><span class="c1">Use Speed: </span>{{use_spd_str}}</p>
        <p v-if="is_str!=''"><span class="c1" >Is: </span>{{is_str}}</p>
        <p class="c1" id="desc_head">Description:</p>
        <div v-html="info_str"></div>

    </div>    
</template>
  
  <script>
  
  
  export default {
    name: 'TalentDesc',
    props: {
      p_data: Object
    },

    computed: {
        effect_level_str(){
            let arr = []
            for (let i=1; i<6; i++) {
                arr.push( (i*parseFloat(this.p_data.mastery)).toFixed(1) )
            }
            return arr.join(" ")
        },

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

        stat_req() {
            if (this.p_data.require) {
                let tmp = this.p_data.require[0].split(", ")
                if (tmp.length == 1) {
                    return ""
                } else {
                    let stat = tmp[1].split(" ")[0]
                    let t = []
                    for (let r of this.p_data.require) {
                        t.push(r.split(", ")[1].split(" ")[1])
                    }
                    return stat + " " + t.join(", ")
                }
            } else {
                return ""
            }
        }, 

        use_mode_str() {
            if (this.p_data.mode) {
                return this.cap_first(this.p_data.mode)
            } else {
                return "Activated"
            }
        },

        range_str() {
            return this.parse_data(this.p_data.range)
        },

        cd_str() {
            return this.parse_data(this.p_data.cooldown)
            
        },

        tra_spd_str() {
            return this.p_data.proj_speed
        },

        use_spd_str() {
            return this.p_data.use_speed
        },

        resource_str() {
            if (this.p_data.mode == "sustained") {
                return "Sustain " + this.p_data.cost.split(" ")[1]
            } else {
                return this.cap_first(this.p_data.cost.split(" ")[1])
            }
        },

        cost_str() {
            if (this.p_data.cost && typeof(this.p_data.cost) == "string" ) {
                return this.p_data.cost.split(" ")[0]
            } else {
                return ""
            }
        },

        is_str() {
            let ret=""
            let pairs = {
                is_antimagic : "an antimagic ability",
                is_mind : "an mind power",
                is_nature : "an nature gift",
                is_spell : "an spell"
            }
            let out= []
            for (let k in pairs) {
                if (this.p_data[k]) {
                    out.push(pairs[k])
                }
            }
            if (out.length == 1) {
                ret = out[0]
            }else if(out.length > 1) {
                let last = out.pop()
                ret = out.join(", ")
                ret = ret + " and " + last
            }
            return ret
        },

        info_str() {
            if(this.p_data.info_text) {
                return "<p style=\"margin-top: 0px;\"" + this.p_data.info_text.slice(2)
            } else {
                return ""
            }
        }
    },
  
    methods: {
        parse_data(str) {
            if (typeof(str)=="string" && str.startsWith("<")) {
                let tmp = str.slice(1,-1).split(">")
                let tmp2 = tmp[tmp.length-1].split("<")[0]
                return tmp2
            } else {
                return str
            }
        },

        cap_first(str) {
            return str.charAt(0).toUpperCase() + str.slice(1)
        }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>

    #desc_title {
        color:#ffd800;
        margin-bottom:3%;
    }

    #desc_head {
        margin-top:10px;
    }
    
    .talent_desc {
        text-align: left;
    }

    .info {
        margin-top:0px;
    }
    
    .c1 {
        color: #4ce675;
    }
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
        color: #00FF00;
        margin-inline-start: 10px; 
    }

  </style>
  