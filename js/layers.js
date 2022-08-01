addLayer("p", {
    name: "Particles", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		sc: new Decimal(20),
		v: new Decimal(0),
			nodeStyle() {
		if (player.v.gte(1)) return {
			'background': 'purple',
		}
	},
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Particles", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.001, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (hasUpgrade("p", 11)) mult = mult.add(2)
		if (hasUpgrade("p", 12)) mult = mult.mul(upgradeEffect("p", 12))
		if (hasUpgrade("p", 13)) mult = mult.mul(upgradeEffect("p", 13))
        return mult
    },
	effectDescription() {
		if (hasChallenge("p", 14)) return "You generated " + format(player.p.v) + " Voids"
	},
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
			tabFormat: {
        "Particles": {
        content:[
            function() {if (player.tab == "p") return "main-display"},
            function() { if (player.tab == "p")  return "resource-display"},
			'blank',
			'upgrades'
			
            ]
        },
		        "Voids": {
					embedLayer: 'v',
								unlocked() {return (hasUpgrade("p", 14))},
					            buttonStyle: { "border-color": "purple" },
        content:[
		                    function() {if (player.tab == "v") return "main-display"
				},
            function() { if (player.v.unlocked) return "resource-display"},
			"blank",
			'upgrades'
            ]
        },
			},
			upgrades: {
				11: {
					title: "Collect Particles",
					description: "Gain +2 to Particle gain",
					cost: new Decimal(20),
				},
                12: {
					title: "Boost I",
					description() {return "Particles boost themselves gain <br> <br>Currently: " + format(upgradeEffect("p", 12)) + "x"},
					cost: new Decimal(90),
					effect() { if (upgradeEffect("p", 12).gte(20)) return player.p.sc
						else return player.p.points.pow(0.55)},
				},
				 13: {
					title: "Power up Particles",
					description() {return "Each Particle upgrade gains boost to particle gain <br> <br>Currently: " + format(upgradeEffect("p", 13)) + "x"},
					cost: new Decimal(1300),
					effect() { 	let ret = Decimal.pow(1.7, player[this.layer].upgrades.length)
		          		return ret},
				},
								 14: {
					title: "Obtain Void",
					description() {return "Create 0.5 Void/sec"},
					cost: new Decimal(7000),
				},
			},
									passiveGeneration() {			
return (player.points.gte(1)?1:0)
  },
  update(diff) {
	  if (hasChallenge("p", 14)) return player.p.v = player.p.v.add(diff)
  },
    layerShown(){return true}
})

addLayer("v", {
    name: "Voids", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "V", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "purple",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Voids", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points},
canReset() { return (!player.v.unlocked) },	// Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.001, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
	        prestigeButtonText(){
                let start =  "You cant reset using that button <br>(Only passiveGain)"
				return start;
        },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
			upgrades: {
				11: {
					title: "Empower",
					description: "Gain +2 to Particle gain",
					cost: new Decimal(20),
				},
			},
									passiveGeneration() {			
return (hasUpgrade("p", 14)?0.5:0)
  },
    layerShown(){if (hasChallenge("p", 14)) return "ghost"}
})