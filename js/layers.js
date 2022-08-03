addLayer("p", {
    name: "Particles", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		sc: new Decimal(20),
		v: new Decimal(0),
    }},
    color: "#4BDC13",
				nodeStyle() {
		if (player.p.v.gte(1)) return {
			'background': 'rgb(139, 0, 240)',
		}
	},
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Particles", // Name of prestige currency
    baseResource: "points",	// Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.001, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (hasUpgrade("p", 11)) mult = mult.add(2)
		if (hasUpgrade("p", 12)) mult = mult.mul(upgradeEffect("p", 12))
		if (hasUpgrade("p", 13)) mult = mult.mul(upgradeEffect("p", 13))
		if (hasUpgrade("p", 21)) mult = mult.mul(upgradeEffect("p", 21))
					if (hasUpgrade("p", 32)) mult = mult.pow(upgradeEffect("p", 32))
        return mult
    },
	    effect() {
        if (!hasUpgrade("p", 14))
            return new Decimal(0.5);
        let eff = Decimal.pow(1);
		        if (hasUpgrade("p", 31))
            eff = eff.times(2.5);
        if (hasUpgrade("p", 22))
            eff = eff.add(7.5);
        return eff;
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
            function() { if (player.tab == "p")  return ["upgrades", [1,3]]
 },
 ]
        },
		        "Voids": {
								unlocked() {return (hasUpgrade("p", 14))},
					            buttonStyle: { "border-color": "rgb(139, 0, 240)" },
        content:[
		                    function() {if (player.tab == "p") return [ "column", 
            [
                ["display-text", 
                   "You have <h2 style='color: #8b00f0; text-shadow: 0 0 10px #8b00f0'>" + format(player.p.v) + "</h2> Void. <br>" + "You are generating " + format(tmp.p.effect) + " Voids/s"
                ],
            ]
        ]
				},
            function() { if (hasUpgrade("p", 14)) return ["upgrades", [2]]
        },
		]
				},
				        "Dices": {
					embedLayer: 'd',
								unlocked() {return (hasUpgrade("p", 23))},
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
					description() {return "Each upgrade gains boost to particle gain <br> <br>Currently: " + format(upgradeEffect("p", 13)) + "x"},
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
					title: "Empower",
					description() {return "Unspent Void boosts Particles gain, and unlock a new row of Particle Upgrades <br> <br>Currently: " + format(upgradeEffect("p", 21)) + "x"},
					cost: new Decimal(20),
					effect() { if (upgradeEffect("p", 21).gte(100)) return player.p.sc
					else return player.p.v.pow(0.4) },
										                currencyDisplayName: "Voids", // Use if using a nonstandard currency
                currencyInternalName: "v", // Use if using a nonstandard currency
                currencyLayer: "p",
				},
								22: {
					title: "Empower II",
					description() {return "Gives +15 to Void base gain"},
					cost: new Decimal(300),
					unlocked() {return (hasUpgrade("p", 34))},
															                currencyDisplayName: "Voids", // Use if using a nonstandard currency
                currencyInternalName: "v", // Use if using a nonstandard currency
                currencyLayer: "p",
				},
												23: {
					title: "Synthesis",
					description() {return "Unlock a new tab"},
					cost: new Decimal(750),
					unlocked() {return (hasUpgrade("p", 34))},
															                currencyDisplayName: "Voids", // Use if using a nonstandard currency
                currencyInternalName: "v", // Use if using a nonstandard currency
                currencyLayer: "p",
				},
												 31: {
					title: "Tier UP",
					description() {return "x5.00 to Void gain"},
					cost: new Decimal(56000),
					unlocked() {return (hasUpgrade("p", 21))},
				},
																 32: {
					title: "Exponential",
					description() {return "Each upgrade exponents Particles gain. <br> <br>Currently: ^" + format(upgradeEffect("p", 32))},
					cost: new Decimal(140),
					unlocked() {return (hasUpgrade("p", 21))},
				                currencyDisplayName: "Voids", // Use if using a nonstandard currency
                currencyInternalName: "v", // Use if using a nonstandard currency
                currencyLayer: "p",
								effect() { 	let ret = Decimal.pow(1.05, player[this.layer].upgrades.length)
		          		return ret},
			},
															 33: {
					title: "Hardcap goes 200",
					description() {return "Remove the first hardcap of <b>Boost I</b> upgrade"},
					cost: new Decimal(8000000),
					unlocked() {return (hasUpgrade("p", 21))},
				},
																			 34: {
					title: "New upgrades here!",
					description() {return "Unlock 2 Void upgrades "},
					cost: new Decimal(45000000),
					unlocked() {return (hasUpgrade("p", 21))},
				},
			},
									passiveGeneration() {			
return (player.points.gte(1)?1:0)
  },
    update(diff) {
        if (hasUpgrade("p", 14))
          return player.p.v = player.p.v.add(tmp.p.effect.times(diff));
    },
    layerShown(){return true}
})
addLayer("d", {
    name: "Dices", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
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
    row: 1, // Row the layer is in on the tree (0 is the first row)
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
    layerShown(){if (hasUpgrade("p", 22)) return "ghost"}
})