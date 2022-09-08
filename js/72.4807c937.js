"use strict";(self["webpackChunktome_planner"]=self["webpackChunktome_planner"]||[]).push([[72],{30072:function(e){e.exports=JSON.parse('[{"__ATOMIC":true,"category":"base","description":"The basic talents defining a class.","hide":true,"name":"class","points":1,"source":"@vanilla@","talents":[{"alternate_attacks":["T_DOUBLE_STRIKE","T_STORMSTRIKE"],"hide":"always","id":"T_ATTACK","ignored_by_hotkeyautotalents":true,"image":"attack.png","info_text":"<p>Hack and slash, baby!</p>","innate":true,"is_melee":true,"message":false,"mode":"activated","name":"Attack","no_break_stealth":true,"no_energy":"fake","no_unlearn_last":true,"points":1,"range":"melee/personal","requires_target":true,"short_name":"ATTACK","source_code":["data/talents/misc/misc.lua",36],"speed":"weapon","type":["base/class",1],"use_speed":"Weapon"},{"id":"T_HUNTED_PLAYER","image":"hunted_player.png","info_text":"<p>You are hunted!.</p><p>There is a <acronym class=\\"stat-variable\\" title=\\"Values for<br>character level 1, 10, 25, 40, 50\\">1%, 2%, 4%, 6%, 8%</acronym> chance each turn that all foes in a <acronym class=\\"stat-variable\\" title=\\"Values for<br>character level 1, 10, 25, 40, 50\\">10, 12, 15, 18, 20</acronym> radius get a glimpse of your position for 30 turns.</p>","mode":"passive","name":"Hunted!","no_unlearn_last":true,"points":1,"short_name":"HUNTED_PLAYER","source_code":["1.7.4/data/talents/misc/misc.lua",247],"type":["base/class",1]},{"cooldown":400,"id":"T_TELEPORT_ANGOLWEN","image":"teleport_angolwen.png","info_text":"<p>Allows a mage to teleport to the secret town of Angolwen.</p><p>You have studied the magic arts there and have been granted a special portal spell to teleport there.</p><p>Nobody must learn about this spell and so it should never be used while seen by any creatures.</p><p>The spell will take time to activate. You must be out of sight of any creature when you cast it and when the teleportation takes effect.</p>","is_spell":true,"mode":"activated","name":"Teleport: Angolwen","no_silence":true,"no_unlearn_last":true,"points":1,"range":"melee/personal","short_name":"TELEPORT_ANGOLWEN","type":["base/class",1],"use_speed":"Spell"},{"cooldown":400,"id":"T_TELEPORT_POINT_ZERO","image":"teleport_point_zero.png","info_text":"<p>Allows a chronomancer to timeport to Point Zero.</p><p>You have studied the chronomancy there and have been granted a special portal spell to teleport back.</p><p>This spell must be kept secret; it should never be used within view of uninitiated witnesses.</p><p>The spell takes time (40 turns) to activate, and you must be out of sight of any other creature when you cast it and when the timeportation takes effect.</p>","is_spell":true,"mode":"activated","name":"Timeport: Point Zero","no_silence":true,"no_unlearn_last":true,"points":1,"range":"melee/personal","short_name":"TELEPORT_POINT_ZERO","type":["base/class",1],"use_speed":"Spell"},{"cooldown":"<acronym class=\\"talent-variable\\" title=\\"Values for<br>talent levels 1-5,<br>talent mastery 1.20\\">52, 42, 37, 34, 31</acronym>","id":"T_RELENTLESS_PURSUIT","image":"relentless_pursuit.png","info_text":"<p>Not the Master himself, nor all the orcs in fallen Reknor, nor even the terrifying unknown beyond Reknor\'s portal could slow your pursuit of the Staff of Absorption.</p><p>Children will hear of your relentlessness in song for years to come.</p><p>When activated, this ability reduces the duration of all active detrimental effects by 20% of your associated save value or 2, whichever is greater:</p><p></p><p>Physical effect durations <acronym class=\\"stat-variable\\" title=\\"Values for<br>physical save 10, 25, 50, 75, 100,<br>spell save 10, 25, 50, 75, 100,<br>mental save 10, 25, 50, 75, 100\\">-2, -5, -10, -15, -20</acronym> turns</p><p>Magical effect durations <acronym class=\\"stat-variable\\" title=\\"Values for<br>physical save 10, 25, 50, 75, 100,<br>spell save 10, 25, 50, 75, 100,<br>mental save 10, 25, 50, 75, 100\\">-2, -5, -10, -15, -20</acronym> turns</p><p>Mental effect durations <acronym class=\\"stat-variable\\" title=\\"Values for<br>physical save 10, 25, 50, 75, 100,<br>spell save 10, 25, 50, 75, 100,<br>mental save 10, 25, 50, 75, 100\\">-2, -5, -10, -15, -20</acronym> turns</p>","mode":"activated","name":"Relentless Pursuit","no_energy":true,"points":5,"range":"melee/personal","short_name":"RELENTLESS_PURSUIT","source_code":["1.7.4/data/talents/misc/misc.lua",347],"type":["base/class",1],"use_speed":"Instant"},{"id":"T_DISARM_TRAP","image":"trap_priming.png","info_text":"<p>You search a nearby grid for a hidden trap (0 detection \'power\') and disarm it if possible (0 disarm \'power\', based on your skill with Device Mastery).</p><p>Disarming a trap requires at least a minimum skill level, and you must be able to enter the trap\'s grid to manipulate it, though you stay in your current location.  A failed attempt to disarm a trap may trigger it.</p><p>Your skill improves with your your Cunning.</p>","innate":true,"message":false,"mode":"activated","name":"Disarm Trap","no_break_stealth":true,"points":1,"range":"melee/personal","short_name":"DISARM_TRAP","source_code":["data/talents/cunning/survival.lua",141],"target":{"immediate_keys":true,"no_lock":false,"nowarning":true,"range":1,"type":"hit"},"type":["base/class",1],"use_speed":"Standard"},{"cooldown":400,"id":"T_TELEPORT_KROSHKKUR","image":"teleport_kroshkkur.png","info_text":"<p>Allows to teleport to Kroshkkur.</p><p>You have studied the forbidden secrets there and have been granted a special portal spell to teleport back.</p><p>This spell must be kept secret; it should never be used within view of uninitiated witnesses.</p><p>The spell takes time (40 turns) to activate, and you must be out of sight of any other creature when you cast it and when the teleportation takes effect.</p>","is_spell":true,"mode":"activated","name":"Teleport: Kroshkkur","no_silence":true,"no_unlearn_last":true,"points":1,"range":"melee/personal","short_name":"TELEPORT_KROSHKKUR","type":["base/class",1],"use_speed":"Spell"}],"type":"base/class"},{"__ATOMIC":true,"category":"base","description":"The various racial bonuses a character can have.","hide":true,"name":"race","points":1,"source":"@vanilla@","talents":[{"id":"T_YEEK_ID","image":"yeek_id.png","info_text":"<p>You merge your mind with the rest of the Way for a brief moment; the sum of all yeek knowledge gathers in your mind</p><p>and allows you to identify any item you could not recognize yourself.</p>","mode":"passive","name":"Knowledge of the Way","no_unlearn_last":true,"points":1,"short_name":"YEEK_ID","source_code":["data/talents/misc/races.lua",1055],"type":["base/race",1]}],"type":"base/race"}]')}}]);