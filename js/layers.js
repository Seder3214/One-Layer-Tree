addLayer("p", {
    name: "Particles", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		sc: new Decimal(20),
    }},
    color: "#4BDC13",
				nodeStyle() {
		if (player.v.points.gte(1)) return {
			'background': 'rgb(139, 0, 240)',
		}
	},
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
		if (hasUpgrade("v", 11)) mult = mult.mul(upgradeEffect("v", 11))
					if (hasUpgrade("p", 22)) mult = mult.pow(upgradeEffect("p", 22))
        return mult
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
					            buttonStyle: { "border-color": "rgb(139, 0, 240)" },
        content:[
		                    function() {if (player.tab == "p") return "main-display"
				},
            function() { if (player.v.unlocked) return "resource-display"},
			"blank",
			'upgrades'
            ]
        },
				        "Dices": {
					embedLayer: 'd',
								unlocked() {return (hasUpgrade("v", 13))},
					            buttonStyle: { "border-color": "white" },
        content:[
		                    function() {if (player.tab == "p") return "main-display"
				},
            function() { if (player.p.unlocked) return "resource-display"},
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
					effect() { 	if (hasUpgrade("p", 23) && upgradeEffect("p", 12).gte(200)) return player.p.sc.times(10)
					if (hasUpgrade("p", 23)) return player.p.points.pow(0.55)
					if (upgradeEffect("p", 12).gte(20)) return player.p.sc
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
												 21: {
					title: "Tier UP",
					description() {return "x5.00 to Void gain"},
					cost: new Decimal(56000),
					unlocked() {return (hasUpgrade("v", 11))},
				},
																 22: {
					title: "Exponential",
					description() {return "Each Void upgrade exponents Particles gain. <br> <br>Currently: ^" + format(upgradeEffect("p", 22))},
					cost: new Decimal(140),
					unlocked() {return (hasUpgrade("v", 11))},
				                currencyDisplayName: "Voids", // Use if using a nonstandard currency
                currencyInternalName: "points", // Use if using a nonstandard currency
                currencyLayer: "v",
									effect() { 	let ret = Decimal.pow(1.15, player.v.upgrades.length)
		          		return ret},
			},
															 23: {
					title: "Hardcap goes 200",
					description() {return "Remove the first hardcap of <b>Boost I</b> upgrade"},
					cost: new Decimal(620000),
					unlocked() {return (hasUpgrade("v", 11))},
				},
																			 24: {
					title: "New upgrades here!",
					description() {return "Unlock 2 Void upgrades "},
					cost: new Decimal(45000000),
					unlocked() {return (hasUpgrade("v", 11))},
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
				sc: new Decimal(100),
    }},
    color: "rgb(139, 0, 240)",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Voids", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points},
canReset() { return (!player.v.unlocked) },	// Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.001, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
				if (hasUpgrade("p", 21)) mult = mult.times(5)
				if (hasUpgrade("v", 12)) mult = mult.add(15)
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
					description() {return "Unspent Void boosts Particles gain, and unlock a new row of Particle Upgrades <br> <br>Currently: " + format(upgradeEffect("v", 11)) + "x"},
					cost: new Decimal(20),
					effect() { if (upgradeEffect("v", 11).gte(100)) return player.v.sc
						else return player.v.points.pow(0.4)},
				},
								12: {
					title: "Empower II",
					description() {return "Gives +15 to Void base gain"},
					cost: new Decimal(300),
				},
												13: {
					title: "Synthesis",
					description() {return "Unlock a new tab"},
					cost: new Decimal(750),
				},
			},
									passiveGeneration() {			
return (hasUpgrade("p", 14)?0.5:0)
  },
    layerShown(){if (hasUpgrade("p", 14)) return "ghost"}
})
addLayer("d", {
    name: "Dices", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
				sc: new Decimal(100),
				at: 1,
    }},
    color: "white",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Dices", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points},
canReset() { return (!player.d.unlocked) },
effectDescription() {return "Timeout: " + format(player.d.at)},	// Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.001, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
	        prestigeButtonText(){
                let start =  "You cant reset using that button <br>(Only Clickable Gain)"
				return start;
        },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	clickables: {
    11: {
		title: "Random",
        display() {
			return "Roll a Dice. Adds you 1 to 5 Dices"},
		canClick() { return (player.d.at == 0)},
onClick() {
	 player.d.at = 5
  let roll = Math.random() * (5 - 1) + (1);  // replacing min and max with their proper variable locations
  addPoints("d",roll)
},
		},
    },
 update(diff) {
  if (player.d.at > 0) player.d.at = Math.max(0,player.d.at - diff)
},
			upgrades: {
				11: {
					title: "Empower",
					description() {return "Unspent Void boosts Particles gain, and unlock a new row of Particle Upgrades <br> <br>Currently: " + format(upgradeEffect("v", 11)) + "x"},
					cost: new Decimal(20),
					effect() { if (upgradeEffect("v", 11).gte(100)) return player.v.sc
						else return player.v.points.pow(0.4)},
				},
			},
    layerShown(){if (hasChallenge("v", 12)) return "ghost"}
})