"use strict";(self["webpackChunktome_planner"]=self["webpackChunktome_planner"]||[]).push([[5719],{40769:function(e){e.exports=JSON.parse('[{"__ATOMIC":true,"category":"other","description":"Unclassified talents of the various horrors of the world.","hide":true,"name":"horror powers","points":1,"source":"@vanilla@","talents":[{"cooldown":10,"direct_hit":true,"hide":true,"id":"T_ECHOES_FROM_THE_VOID","image":"echoes_from_the_void.png","info_text":"<p>Shows the target the madness of the void.  Each turn for 6 turns the target must make a mental save or suffer <acronym class=\\"variable\\" title=\\"Values for<br>talent levels 1-5,<br>talent mastery 0.80,<br>mindpower 100\\">54, 72, 86, 98, 108</acronym> mind damage as well as resource damage (based off the mind damage and nature of the resource).</p>","message":"@Source@ shows @Target@ the madness of the void.","mode":"activated","name":"Echoes From The Void","points":5,"range":"10.0","requires_target":true,"short_name":"ECHOES_FROM_THE_VOID","source_code":["1.7.4/data/talents/misc/horrors.lua",230],"type":["other/horror",1],"use_speed":"Standard"},{"cooldown":20,"hide":true,"id":"T_VOID_SHARDS","image":"void_shards.png","info_text":"<p>Summons <acronym class=\\"talent-variable\\" title=\\"Values for<br>talent levels 1-5,<br>talent mastery 0.80\\">1, 2, 3, 4, 5</acronym> void shards.  The void shards come into being destabilized and will suffer <acronym class=\\"variable\\" title=\\"Values for<br>talent levels 1-5,<br>talent mastery 0.80,<br>mindpower 100\\">26, 35, 42, 48, 53</acronym> temporal damage each turn for five turns.  If they die while destabilized they\'ll explode for <acronym class=\\"variable\\" title=\\"Values for<br>talent levels 1-5,<br>talent mastery 0.80,<br>mindpower 100\\">55, 74, 88, 101, 111</acronym> temporal and <acronym class=\\"variable\\" title=\\"Values for<br>talent levels 1-5,<br>talent mastery 0.80,<br>mindpower 100\\">55, 74, 88, 101, 111</acronym> physical damage in a radius of 4.</p>","is_summon":true,"message":"@Source@ summons void shards.","mode":"activated","name":"Void Shards","points":5,"radius":5,"range":"10.0","requires_target":true,"short_name":"VOID_SHARDS","source_code":["data/talents/misc/horrors.lua",260],"type":["other/horror",1],"use_speed":"Summon"},{"cooldown":15,"hide":true,"id":"T_AMAKTHEL_SLUMBER","image":"amakthel_slumber.png","info_text":"<p>The Dead God slumbers. For now.</p>","message":"@Source@ enters a deep slumber.","mode":"sustained","name":"Slumbering...","no_energy":true,"points":1,"range":"melee/personal","short_name":"AMAKTHEL_SLUMBER","source_code":["data-orcs/talents/misc/npcs.lua",210],"type":["other/horror",1],"use_speed":"Instant"},{"cooldown":12,"hide":true,"id":"T_AMAKTHEL_TENTACLE_SPAWN","image":"amakthel_tentacle_spawn.png","info_text":"<p>The Dead God wishes to tickle you&hellip;</p>","message":"@Source@ spawns a tentacle near @target@.","mode":"activated","name":"Tentacle Spawn","points":1,"range":"10.0","short_name":"AMAKTHEL_TENTACLE_SPAWN","source_code":["1.7.4/data-orcs/talents/misc/npcs.lua",259],"type":["other/horror",1],"use_speed":"Standard"},{"cooldown":4,"direct_hit":true,"id":"T_DIMENSIONAL_SKITTER","image":"dimensional_skitter.png","info_text":"<p>Teleport to a target within range 10 and strike them with your fangs dealing 100% weapon damage.</p>","is_melee":true,"is_teleport":true,"mode":"activated","name":"Dimensional Skitter","points":1,"range":"10.0","requires_target":true,"short_name":"DIMENSIONAL_SKITTER","source_code":["data-cults/talents/demented/rift.lua",572],"type":["other/horror",1],"use_speed":"Weapon"},{"cooldown":6,"id":"T_VOID_CRASH","image":"void_crash.png","info_text":"<p>Slam your weapons into the ground, creating a radius 2 explosion of void energy dealing <acronym class=\\"talent-variable\\" title=\\"Values for<br>talent levels 1-5,<br>talent mastery 0.80\\">140%, 156%, 169%, 180%, 189%</acronym> damage split between darkness and temporal.</p>","is_melee":true,"mode":"activated","name":"Void Crash","points":5,"radius":2,"random_ego":"attack","range":"0.0","requires_target":true,"short_name":"VOID_CRASH","source_code":["1.7.4/data-cults/talents/demented/oblivion.lua",303],"type":["other/horror",1],"use_speed":"Weapon"},{"cooldown":2,"id":"T_GRASPING_TENDRILS","image":"grasping_tendrils.png","info_text":"<p>Grab a target and drag it to your side, dealing 150% weapon damage and taunting it.</p>","mode":"activated","name":"Grasping Tendrils","points":1,"range":"7.0","requires_target":true,"short_name":"GRASPING_TENDRILS","source_code":["data-cults/talents/demented/nether.lua",327],"type":["other/horror",1],"use_speed":"Standard"}],"type":"other/horror"},{"__ATOMIC":true,"category":"other","description":"Abilities of the various objects of the world.","name":"object powers","no_silence":true,"points":1,"source":"@vanilla@","talents":[],"type":"other/objects"},{"__ATOMIC":true,"category":"other","description":"Talents of the various entities of the world.","hide":true,"name":"other","points":1,"source":"@vanilla@","talents":[{"cooldown":3,"hide":true,"id":"T_MULTIPLY","image":"multiply.png","info_text":"<p>Multiply yourself! (up to 0 times)</p>","mode":"activated","name":"Multiply","points":1,"range":"10.0","requires_target":true,"short_name":"MULTIPLY","source_code":["data/talents/misc/npcs.lua",38],"type":["other/other",1],"unlearn_on_clone":true,"use_speed":"Standard"},{"cooldown":10,"hide":true,"id":"T_SUSPENDED","image":"arcane_feed.png","info_text":"<p>The target will not react until attacked.</p>","mode":"sustained","name":"Suspended","points":1,"range":"melee/personal","short_name":"SUSPENDED","source_code":["1.7.4/data/talents/misc/npcs.lua",2221],"type":["other/other",1],"use_speed":"Standard"},{"cooldown":24,"cost":"15 stamina","hide":true,"id":"T_EMPOWER_POISONS","image":"empower_poisons.png","info_text":"<p>Reduces the duration of all poisons on the target by 50%, but increases their damage by <acronym class=\\"variable\\" title=\\"Values for<br>talent levels 1-5,<br>talent mastery 0.80,<br>Cunning 100\\">176%, 198%, 214%, 228%, 240%.</acronym></p><p>The effect increases with your Cunning.</p>","mode":"activated","name":"Empower Poisons","no_energy":true,"points":5,"range":"melee/personal","requires_target":true,"short_name":"EMPOWER_POISONS","source_code":["data/talents/misc/npcs.lua",2798],"stamina":15,"type":["other/other",1],"use_speed":"Instant"},{"cooldown":60,"cost":"25 stamina","hide":true,"id":"T_WILLFUL_COMBAT","image":"willful_combat.png","info_text":"<p>For <acronym class=\\"talent-variable\\" title=\\"Values for<br>talent levels 1-5,<br>talent mastery 0.80\\">3, 5, 6, 7, 8</acronym> turns, you put all your will into your blows, adding <acronym class=\\"stat-variable\\" title=\\"Values for<br>Cunning 10, 25, 50, 75, 100,<br>Willpower 10, 25, 50, 75, 100\\">8, 23, 44, 63, 80</acronym> physical power to each strike.</p><p>The effect will improve with your Cunning and Willpower stats.</p>","mode":"activated","name":"Willful Combat","no_energy":true,"points":5,"random_ego":"attack","range":"melee/personal","short_name":"WILLFUL_COMBAT","source_code":["data/talents/misc/npcs.lua",2842],"stamina":25,"type":["other/other",1],"use_speed":"Instant"},{"cooldown":12,"cost":"15 stamina","hide":true,"id":"T_DEADLY_STRIKES","image":"deadly_strikes.png","info_text":"<p>You hit your target, doing <acronym class=\\"talent-variable\\" title=\\"Values for<br>talent levels 1-5,<br>talent mastery 0.80\\">104%, 113%, 121%, 128%, 133%</acronym> damage. If your attack hits, you gain <acronym class=\\"variable\\" title=\\"Values for<br>talent levels 1-5,<br>talent mastery 0.80,<br>Cunning 100\\">15, 20, 24, 27, 29</acronym> armor penetration (APR) for <acronym class=\\"talent-variable\\" title=\\"Values for<br>talent levels 1-5,<br>talent mastery 0.80\\">4, 6, 7, 8, 8</acronym> turns.</p><p>The APR will increase with your Cunning.</p>","is_melee":true,"mode":"activated","name":"Deadly Strikes","no_energy":true,"points":5,"random_ego":"attack","range":"melee/personal","requires_target":true,"short_name":"DEADLY_STRIKES","source_code":["data/talents/misc/npcs.lua",2867],"stamina":15,"type":["other/other",1],"use_speed":"Instant"},{"cooldown":15,"cost":"10 stamina","hide":true,"id":"T_STICKY_SMOKE","image":"sticky_smoke.png","info_text":"<p>Throws a vial of sticky smoke that explodes in radius <acronym class=\\"talent-variable\\" title=\\"Values for<br>talent levels 1-5,<br>talent mastery 0.80\\">0, 0, 1, 1, 2</acronym> on your foes, reducing their vision range by <acronym class=\\"talent-variable\\" title=\\"Values for<br>talent levels 1-5,<br>talent mastery 0.80\\">1, 1, 3, 4, 4</acronym> for 5 turns.</p><p>Creatures affected by smoke bomb can never prevent you from stealthing, even if their proximity would normally forbid it.</p><p>Use of this will not break stealth.</p>","mode":"activated","name":"Sticky Smoke","no_break_stealth":true,"points":5,"proj_speed":10,"range":"10.0","reflectable":true,"requires_target":true,"short_name":"STICKY_SMOKE","source_code":["data/talents/misc/npcs.lua",2908],"speed":"combat","stamina":10,"type":["other/other",1],"use_speed":"Combat"},{"cooldown":10,"cost":"15 stamina","hide":true,"id":"T_SWITCH_PLACE","image":"switch_place.png","info_text":"<p>Using a series of tricks and maneuvers, you switch places with your target.</p><p>Switching places will confuse your foes, granting you Evasion (50%) for 3 turns.</p><p>While switching places, your weapon(s) will connect with the target; this will not do weapon damage, but on hit effects of the weapons can trigger.</p>","is_melee":true,"mode":"activated","name":"Switch Place","points":5,"random_ego":"defensive","range":"melee/personal","requires_target":true,"short_name":"SWITCH_PLACE","source_code":["1.7.4/data/talents/misc/npcs.lua",2940],"speed":"weapon","stamina":15,"type":["other/other",1],"use_speed":"Weapon"},{"cooldown":25,"cost":"20 stamina","hide":true,"id":"T_CRIPPLE","image":"cripple.png","info_text":"<p>You hit your target, doing <acronym class=\\"talent-variable\\" title=\\"Values for<br>talent levels 1-5,<br>talent mastery 0.80\\">136%, 150%, 162%, 172%, 180%</acronym> damage. If your attack connects, the target is crippled for <acronym class=\\"talent-variable\\" title=\\"Values for<br>talent levels 1-5,<br>talent mastery 0.80\\">3, 4, 5, 6, 7</acronym> turns, losing <acronym class=\\"variable\\" title=\\"Values for<br>talent levels 1-5,<br>talent mastery 0.80,<br>Cunning 100\\">19%, 21%, 22%, 23%, 24%</acronym> melee, spellcasting and mind speed.</p><p>The chance to land the status improves with Accuracy, and the status power improves with Cunning.</p>","is_melee":true,"mode":"activated","name":"Cripple","points":5,"random_ego":"attack","range":"melee/personal","requires_target":true,"short_name":"CRIPPLE","source_code":["data/talents/misc/npcs.lua",2990],"speed":"weapon","stamina":20,"type":["other/other",1],"use_speed":"Weapon"},{"cooldown":"<acronym class=\\"talent-variable\\" title=\\"Values for<br>talent levels 1-5,<br>talent mastery 0.80\\">36, 31, 27, 24, 22</acronym>","hide":true,"id":"T_NIMBLE_MOVEMENTS","image":"nimble_movements.png","info_text":"<p>Quickly and quietly dash your way to the target square, if it is not blocked by enemies or obstacles. This talent will not break Stealth.</p>","message":"@Source@ dashes quickly!","mode":"activated","name":"Nimble Movements","no_break_stealth":true,"points":5,"random_ego":"attack","range":"<acronym class=\\"talent-variable\\" title=\\"Values for<br>talent levels 1-5,<br>talent mastery 0.80\\">6.0, 7.0, 7.0, 7.0, 8.0</acronym>","requires_target":true,"short_name":"NIMBLE_MOVEMENTS","source_code":["data/talents/misc/npcs.lua",3030],"speed":"movement","type":["other/other",1],"use_speed":"Movement"},{"cooldown":40,"cost":"20 stamina","hide":false,"id":"T_HIDE_IN_PLAIN_SIGHT","image":"hide_in_plain_sight.png","info_text":"<p>You have learned how to be stealthy even when in plain sight of your foes.  You may attempt to enter stealth regardless of how close you are to your enemies, but success is more likely against fewer opponents that are farther away.</p><p>Your chance to succeed is determined by comparing <acronym class=\\"talent-variable\\" title=\\"Values for<br>talent levels 1-5,<br>talent mastery 0.80\\">0.75, 1.29, 1.70, 2.05, 2.36</acronym> times your stealth power (currently 0) to the stealth detection of all enemies (reduced by 10% per tile distance) that have a clear line of sight to you.</p><p>You always succeed if you are not directly observed.</p><p>This resets the cooldown of your Stealth talent, and, if successful, all creatures currently following you will lose track of your position.</p><p>You estimate your current chance to hide as 100.0%.</p>","mode":"activated","name":"Hide in Plain Sight","no_break_stealth":true,"no_energy":true,"points":5,"range":"melee/personal","short_name":"HIDE_IN_PLAIN_SIGHT","source_code":["data/talents/misc/npcs.lua",3080],"stamina":20,"type":["other/other",3],"use_speed":"Instant"},{"hide":false,"id":"T_UNSEEN_ACTIONS","image":"unseen_actions.png","info_text":"<p>You are able to perform usually unstealthy actions (attacking, using objects, &hellip;) without breaking stealth.\\t When you perform such an action while stealthed, you have a chance to stay hidden.</p><p>Success is more likely against fewer opponents and is determined by comparing <acronym class=\\"talent-variable\\" title=\\"Values for<br>talent levels 1-5,<br>talent mastery 0.80\\">0.27, 0.72, 1.06, 1.35, 1.61</acronym> times your stealth power (currently 0) to the stealth detection (reduced by 10% per tile distance) of all enemies that have a clear line of sight to you.</p><p>Your base chance of success is 100% if you are not directly observed, and good or bad luck may also affect it.</p><p>You estimate your current chance to maintain stealth as 100.0%.</p>","mode":"passive","name":"Unseen Actions","points":5,"short_name":"UNSEEN_ACTIONS","source_code":["data/talents/misc/npcs.lua",3136],"type":["other/other",1]},{"cooldown":14,"cost":"30 stamina","hide":true,"id":"T_HACK_N_BACK","image":"hack_n_back.png","info_text":"<p>You hit your target, doing <acronym class=\\"talent-variable\\" title=\\"Values for<br>talent levels 1-5,<br>talent mastery 0.80\\">64%, 73%, 81%, 88%, 93%</acronym> damage, distracting it while you jump back <acronym class=\\"talent-variable\\" title=\\"Values for<br>talent levels 1-5,<br>talent mastery 0.80\\">2, 2, 3, 3, 3</acronym> squares away.</p>","is_melee":true,"mode":"activated","name":"Hack\'n\'Back","points":5,"range":"melee/personal","requires_target":true,"short_name":"HACK_N_BACK","source_code":["1.7.4/data/talents/misc/npcs.lua",3165],"stamina":30,"type":["other/other",1],"use_speed":"Weapon"},{"hide":true,"id":"T_MOBILE_DEFENCE","image":"mobile_defence.png","info_text":"<p>Whilst wearing leather or lighter armour, you gain <acronym class=\\"talent-variable\\" title=\\"Values for<br>talent levels 1-5,<br>talent mastery 0.80\\">3%, 13%, 19%, 25%, 29%</acronym> Defense and <acronym class=\\"talent-variable\\" title=\\"Values for<br>talent levels 1-5,<br>talent mastery 0.80\\">1%, 8%, 13%, 17%, 21%</acronym> Armour hardiness.</p>","mode":"passive","name":"Mobile Defence","points":5,"short_name":"MOBILE_DEFENCE","source_code":["data/talents/misc/npcs.lua",3203],"type":["other/other",1]},{"hide":true,"id":"T_LIGHT_OF_FOOT","image":"light_of_foot.png","info_text":"<p>You are light on your feet, handling your armour better. Each step you take regenerates <acronym class=\\"talent-variable\\" title=\\"Values for<br>talent levels 1-5,<br>talent mastery 0.80\\">0.20, 0.40, 0.60, 0.80, 1.00</acronym> stamina, and your fatigue is permanently reduced by <acronym class=\\"talent-variable\\" title=\\"Values for<br>talent levels 1-5,<br>talent mastery 0.80\\">0.4%, 2.0%, 3.3%, 4.3%, 5.2%.</acronym></p><p>At level 3 you are able to walk so lightly that you never trigger traps that require pressure.</p>","mode":"passive","name":"Light of Foot","points":5,"short_name":"LIGHT_OF_FOOT","source_code":["data/talents/misc/npcs.lua",3221],"type":["other/other",1]},{"hide":true,"id":"T_STRIDER","image":"strider.png","info_text":"<p>You literally dance around your foes, increasing your movement speed by <acronym class=\\"talent-variable\\" title=\\"Values for<br>talent levels 1-5,<br>talent mastery 0.80\\">1%, 3%, 5%, 6%, 8%</acronym> and reducing the cooldown of Hack\'n\'Back, Rush, Disengage and Evasion by <acronym class=\\"talent-variable\\" title=\\"Values for<br>talent levels 1-5,<br>talent mastery 0.80\\">-1, 1, 2, 3, 3</acronym> turns.</p>","mode":"passive","name":"Strider","points":5,"short_name":"STRIDER","source_code":["data/talents/misc/npcs.lua",3239],"type":["other/other",1]},{"hide":true,"id":"T_CHARM_MASTERY","image":"charm_mastery.png","info_text":"<p>Your cunning manipulations allow you to use charms (wands, totems and torques) more efficiently, reducing their cooldowns by <acronym class=\\"talent-variable\\" title=\\"Values for<br>talent levels 1-5,<br>talent mastery 0.80\\">9%, 17%, 24%, 29%, 34%.</acronym></p>","mode":"passive","name":"Charm Mastery","points":5,"short_name":"CHARM_MASTERY","source_code":["data/talents/misc/npcs.lua",3259],"type":["other/other",1]},{"hide":true,"id":"T_PIERCING_SIGHT","image":"piercing_sight.png","info_text":"<p>You look at your surroundings with more intensity than most people, allowing you to see stealthed or invisible creatures.</p><p>Increases stealth detection by <acronym class=\\"variable\\" title=\\"Values for<br>talent levels 1-5,<br>talent mastery 0.80,<br>Cunning 100\\">41, 53, 62, 68, 74</acronym> and invisibility detection by <acronym class=\\"variable\\" title=\\"Values for<br>talent levels 1-5,<br>talent mastery 0.80,<br>Cunning 100\\">41, 53, 62, 68, 74.</acronym></p><p>The detection power increases with your Cunning.</p>","mode":"passive","name":"Piercing Sight","points":5,"short_name":"PIERCING_SIGHT","source_code":["data/talents/misc/npcs.lua",3280],"type":["other/other",1]},{"cant_steal":true,"id":"T_SWIFT_HANDS_EQUIP","image":"swift_hands_equip.png","info_text":"<p>Manage your swift hands readied tools.</p>","mode":"activated","name":"Manage Swift Hands","points":1,"range":"melee/personal","short_name":"SWIFT_HANDS_EQUIP","source_code":["1.7.4/data/talents/uber/dex.lua",92],"type":["other/other",1],"use_speed":"Standard"}],"type":"other/other"}]')}}]);