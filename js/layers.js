addLayer("p", {
    name: "Particles", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		mpoints: new Decimal(0),
		sc: new Decimal(20),
		v: new Decimal(0),
		rc: new Decimal(0),
		at: 1,
		sl: 10,
		gb: 30,
		ph: 15,
		att: new Decimal(0),
		i: new Decimal(0),
		t: new Decimal(0),
		d: new Decimal(0),
		mt: new Decimal(1),
		mp: new Decimal(2),
		br: new Decimal(1),
		bh: new Decimal(1),
		pwr: new Decimal(0),
		req: new Decimal(10),
		prcs: new Decimal(0),
			mr: new Decimal(1),
		ps: new Decimal(1),
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
    baseAmount() {return player.points},
effectDescrption() {return "You are gaining " + format(player.p.mt.times(upgradeEffect("p", 12)).times(upgradeEffect("p", 13)).times(upgradeEffect("p", 21)).pow(upgradeEffect("p", 32)).times(upgradeEffect("p", 42)).pow((upgradeEffect("p", 51)))) + " Particles"},	// Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.001, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (hasUpgrade("p", 11)) mult = mult.add(2)
		if (hasUpgrade("p", 12)) mult = mult.mul(upgradeEffect("p", 12))
		if (hasUpgrade("p", 13)) mult = mult.mul(upgradeEffect("p", 13))
		if (hasUpgrade("p", 21)) mult = mult.mul(upgradeEffect("p", 21))
					if (hasUpgrade("p", 32)) mult = mult.pow(upgradeEffect("p", 32))
			if (hasUpgrade("p", 42)) mult = mult.times(upgradeEffect("p", 42))	
		if (hasUpgrade("p", 51)) mult = mult.pow(upgradeEffect("p", 51))		
		if (hasMilestone("p", 0)) mult = mult.times(1.3)
		if (player.p.buyables[11].gte(1)) mult = mult.times(buyableEffect("p", 11))	
if (hasUpgrade("p", 53)) mult = mult.times(upgradeEffect("p", 53))
		if (hasMilestone("p", 1)) mult = mult.times(1.4)	
		if (hasUpgrade("p", 54)) mult = mult.mul(upgradeEffect("p", 54))
		if (hasUpgrade("p", 73)) mult = mult.mul(upgradeEffect("p", 73))
		if (hasUpgrade("p", 81)) mult = mult.mul(upgradeEffect("p", 81).times(1e7))
			if (hasUpgrade("p", 104)) mult = mult.mul(upgradeEffect("p", 104))
			if (hasUpgrade("p", 93)) mult = mult.mul(25e10)
			if (hasUpgrade("p", 94)) mult = mult.mul(25e40)
			if (hasUpgrade("p", 131)) mult = mult.mul(upgradeEffect("p", 131))
			if (hasUpgrade("p", 141)) mult = mult.div(mult.max(1))
			if (hasUpgrade("p", 142)) mult = mult.mul(308)
        return mult
    },
	    effect() {
        if (!hasUpgrade("p", 14))
            return new Decimal(0.5);
        let eff = Decimal.pow(0.5);
		        if (hasUpgrade("p", 31))
            eff = eff.times(5);
        if (hasUpgrade("p", 22))
            eff = eff.add(7.5);
		if (player.p.buyables[11].gte(1))
			eff = eff.times(buyableEffect("p", 11).pow(upgradeEffect("p", 53)))
		if (hasMilestone("p", 1))
			eff = eff.times(1.4)
        return eff;
    },
		    effte() {
        if (!hasUpgrade("p", 171))
            return new Decimal(0.1);
        let eff = Decimal.add(0.1);
				if (hasUpgrade("p", 171))
			eff = eff.times(22)
				if (hasUpgrade("p", 181))
			eff = eff.times(10)
        return eff;
    },
		    effmp() {
				if (!hasUpgrade("p", 91))
            return new Decimal(1);
        let eff = Decimal.pow(1);
		        if (player.p.buyables[21].gte(1))
			eff = eff.times(buyableEffect("p", 21))
				if (hasUpgrade("p", 122))
			eff = eff.pow(upgradeEffect("p", 122))
        return eff;
    },
			    effmr() {
				if (!player.p.buyables[41].gte(1))
            return new Decimal(0);
        let eff = Decimal.pow(1);
				if (hasUpgrade("p", 102))
			eff = eff.times(player.p.pwr.div(3).max(3))
        return eff;
    },
				    efpwr() {
				if (!player.p.buyables[41].gte(1))
            return new Decimal(3e7);
        let eff = Decimal.pow(30);
		if (hasUpgrade("p", 101))
			eff = eff.times(player.p.prcs.div(2).min(100))
			if (hasUpgrade("p", 103))
			eff = eff.times(15)
							if (hasUpgrade("p", 92))
			eff = eff.pow(1.6)
					if (hasUpgrade("p", 111))
			eff = eff.times(2)
		if (hasUpgrade("p", 112))
			eff = eff.times(upgradeEffect("p", 112))
		if (hasUpgrade("p", 113))
			eff = eff.times(upgradeEffect("p", 113))
		if (hasUpgrade("p", 114))
			eff = eff.times(4)
		if (player.p.pwr.gte(1e10))
			eff = eff.div(300)
		if (hasUpgrade("p", 121))
			eff = eff.times(upgradeEffect("p", 121))
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
            function() {if (player.tab == "p") return "main-display"
},
            function() { if (player.tab == "p")  return ["column", [
			["upgrades", [1,3,4,5,6,9]],
			"blank",
			["infobox", "gain"],
			["infobox", "effects"]
			]
			]
 },
 ]
        },
		        "Playtime Rewards": {
        content:[
            function() {if (player.tab == "p") return "main-display"
},
            function() { if (player.tab == "p")  return ["column", [
			"milestones"
			]
			]
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
		        "Dice": {
								unlocked() {return (hasUpgrade("p", 23))},
					            buttonStyle: { "border-color": "white" },
        content:[
		                    function() {if (player.tab == "p") return [ "column", 
            [
                ["display-text", 
                   "You have <h2 style='color: white; text-shadow: 0 0 10px white'>" + format(player.p.d) + "</h2> Dice Points." + "<br> Timeout: " + format(player.p.at) + "s"
                ],
            ]
        ]
				},
            function() { if (hasUpgrade("p", 23)) return [ "column", 
            [
			["clickable", 11],
			["blank", '15px'],
			["upgrades", [7,8]]
			]
			]
        },
		]
				},
						        "Time": {
								unlocked() {return (hasUpgrade("p", 52))},
					            buttonStyle: { "border-color": "red" },
        content:[
		                    function() {if (player.tab == "p") return [ "column", 
            [
                ["display-text", 
                   "You ascended <h2 style='color: red; text-shadow: 0 0 10px red'>" + format(player.p.rc) + "</h2> Time Collapses."
                ],
				["buyable", [11]]
            ]
        ]
				},
            function() { if (hasUpgrade("p", 52)) return "blank"
			
        },
		]
				},
										        "Mega": {
								unlocked() {return (hasUpgrade("p", 91))},
					            buttonStyle: { "border-color": "lightblue" },
        content:[
		                    function() {if (player.tab == "p") return [ "column", 
            [
                ["display-text", 
                   "You have <h2 style='color: lightblue; text-shadow: 0 0 10px lightblue'>" + format(player.p.mp) + "</h2> Mega Points"
                ],
				["buyables", [2,3, 4]]
            ]
        ]
				},
            function() { if (hasUpgrade("p", 52)) return "blank"
			
        },
		]
				},
														        "Mega Robots": {
								unlocked() {return (player.p.buyables[41].gte(1))},
					            buttonStyle: { "border-color": "#9dc4d1" },
        content:[
		                    function() {if (player.tab == "p") return [ "column", 
            [
                ["display-text", 
                   "You have <h2 style='color: lightblue; text-shadow: 0 0 10px lightblue'>" + format(player.p.mr) + "</h2> Mega Robots and <h2 style='color: yellow; text-shadow: 0 0 10px yellow'>" + format(player.p.pwr) + "</h2> Power"
                ],
								["bar", "bar"],
											["upgrades", [10, 11,12]],
            ]
        ]
				},
            function() { if (hasUpgrade("p", 52)) return "blank"
        },
		]
				},
																		        "Infinity": {
								unlocked() {return (player.p.buyables[32].gte(1))},
					            buttonStyle: { "border-color": "green" },
        content:[
		                    function() {if (player.tab == "p") return [ "column", 
            [
                ["display-text", 
                   "You have <h2 style='color: green; text-shadow: 0 0 10px green'>" + format(player.p.i) + "</h2> Infinities and  <h2 style='color: green; text-shadow: 0 0 10px green'>" + format(player.p.mpoints) + "</h2> Essences"
                ],
											["clickables", [2,3,4,5,6,7,8,9]],
											"blank",
											["upgrades", [13,14,15,16]],
																			"blank",
											["milestone", [5]],
											["milestone", [6]],
											["milestone", [7]],
											["milestone", [8]]
            ]
        ]
				},
            function() { if (hasUpgrade("p", 52)) return "blank"
        },
		]
				},
																						        "Infinity Tree": {
								unlocked() {return (hasUpgrade("p", 162))},
					            buttonStyle: { "border-color": "green" },
        content:[
		                    function() {if (player.tab == "p") return [ "column", 
            [
                ["display-text", 
                   "You have <h2 style='color: green; text-shadow: 0 0 10px green'>" + format(player.p.t) + "</h2> Tree Essences"
                ],
["upgrades", [17,18,19,20,21,22,23,24,25]]
            ]
        ]
				},
            function() { if (hasUpgrade("p", 52)) return "blank"
        },
		]
				},
			},
			upgrades: {
				11: {
					title: "Collect Particles",
					description: "Gain +2 to Particle gain",
					cost: new Decimal(20),
					unlocked() {return (!hasUpgrade("p", 44))},
				},
                12: {
					title: "Boost I",
					description() {return "Particles boost themselves gain <br> <br>Currently: " + format(upgradeEffect("p", 12)) + "x"},
					cost: new Decimal(90),
					effect() { 	if (hasUpgrade("p", 33) && upgradeEffect("p", 12).gte(200)) return player.p.sc.times(10)
					if (hasUpgrade("p", 33)) return player.p.points.pow(0.55)
					if (upgradeEffect("p", 12).gte(20)) return player.p.sc
						else return player.p.points.pow(0.55)},
					unlocked() {return (!hasUpgrade("p", 44))},
				},
				 13: {
					title: "Power up Particles",
					description() {return "Each upgrade gains boost to particle gain <br> <br>Currently: " + format(upgradeEffect("p", 13)) + "x"},
					cost: new Decimal(1300),
					effect() { 	let ret = Decimal.pow(1.7, player[this.layer].upgrades.length)
		          		return ret},
					unlocked() {return (!hasUpgrade("p", 44))},
				},
								 14: {
					title: "Obtain Void",
					description() {return "Create 0.5 Void/sec"},
					cost: new Decimal(7000),
					unlocked() {return (!hasUpgrade("p", 44))},
				},
								21: {
					title: "Empower",
					description() {return "Unspent Void boosts Particles gain, and unlock a new row of Particle Upgrades <br> <br>Currently: " + format(upgradeEffect("p", 21)) + "x"},
					cost: new Decimal(20),
					effect() { if (upgradeEffect("p", 21).gte(100)) return player.p.sc
					else return player.p.v.pow(0.4).max(1) },
										                currencyDisplayName: "Voids", // Use if using a nonstandard currency
                currencyInternalName: "v", // Use if using a nonstandard currency
                currencyLayer: "p",
								style() {
									if (hasUpgrade("p", 21)) return {
										'background-color': '#77bf5f'
									}
											if (player.p.v.gte(20)) return {
										'background-color': '#8b00f0'
									}
					else return {
						'background-color': '#bf8f8f'
					}
				},
				},
								22: {
					title: "Empower II",
					description() {return "Gives +15 to Void base gain"},
					cost: new Decimal(300),
					unlocked() {return (hasUpgrade("p", 34))},
															                currencyDisplayName: "Voids", // Use if using a nonstandard currency
                currencyInternalName: "v", // Use if using a nonstandard currency
                currencyLayer: "p",
								style() {
									if (hasUpgrade("p", 22)) return {
										'background-color': '#77bf5f'
									}
																		if (player.p.v.gte(300)) return {
										'background-color': '#8b00f0'
									}
					else return {
						'background-color': '#bf8f8f'
					}
				},
				},
												23: {
					title: "Synthesis",
					description() {return "Unlock a new tab"},
					cost: new Decimal(750),
					unlocked() {return (hasUpgrade("p", 34))},
															                currencyDisplayName: "Voids", // Use if using a nonstandard currency
                currencyInternalName: "v", // Use if using a nonstandard currency
                currencyLayer: "p",
								style() {
									if (hasUpgrade("p", 23)) return {
										'background-color': '#77bf5f'
									}
										if (player.p.v.gte(750)) return {
										'background-color': '#8b00f0'
									}
					else return {
						'background-color': '#bf8f8f'
					}
				},
				},
												 31: {
					title: "Tier UP",
					description() {return "x5.00 to Void gain"},
					cost: new Decimal(56000),
					unlocked() {return (hasUpgrade("p", 21) && (!hasUpgrade("p", 44)))},
				},
																 32: {
					title: "Exponential",
					description() {return "Each upgrade exponents Particles gain. <br> <br>Currently: ^" + format(upgradeEffect("p", 32))},
					cost: new Decimal(140),
					unlocked() {return (hasUpgrade("p", 21) && (!hasUpgrade("p", 44)))},
				                currencyDisplayName: "Voids", // Use if using a nonstandard currency
                currencyInternalName: "v", // Use if using a nonstandard currency
                currencyLayer: "p",
								effect() { 	let ret = Decimal.pow(1.01, player[this.layer].upgrades.length)
		          		return ret},
			},
															 33: {
					title: "Hardcap goes 200",
					description() {return "Remove the first hardcap of <b>Boost I</b> upgrade"},
					cost: new Decimal(1200000),
					unlocked() {return (hasUpgrade("p", 21) && (!hasUpgrade("p", 44)))},
				},
																			 34: {
					title: "New upgrades here!",
					description() {return "Unlock 2 Void upgrades "},
					cost: new Decimal(45000000),
					unlocked() {return (hasUpgrade("p", 21) && (!hasUpgrade("p", 44)))},
				},
					 41: {
					title: "Add 2nd Die",
					description() {return "The <b>Random</b> now works twice if you click"},
					cost: new Decimal(65),
									                currencyDisplayName: "Dices Points", // Use if using a nonstandard currency
                currencyInternalName: "d", // Use if using a nonstandard currency
                currencyLayer: "p",
					unlocked() {return (player.p.d.gte(1) && (!hasUpgrade("p", 44)))},
				},
									 42: {
					title: "Dice Boost I",
					description() {return "Unspent Dices Points boosts particles gain <br> <br>Currently: " + format(upgradeEffect("p", 42)) + "x"},
					cost: new Decimal(130),
					unlocked() {return (player.p.d.gte(1) && (!hasUpgrade("p", 44)))},
				 currencyDisplayName: "Dice Points", // Use if using a nonstandard currency
                currencyInternalName: "d", // Use if using a nonstandard currency
                currencyLayer: "p",
				effect() {
					return player.p.d.pow(0.32)
				},
				},
													 43: {
					title: "Add 4th Die ",
					description() {return "Now <b>Random</b> clickable works 4 times on click. <br><i>To buy this upgrade you need: 5000 Void, 180 Dices Points</i>"},
					cost: new Decimal(180),
					canAfford() {return player.p.v.gte(5000)},
					unlocked() {return (player.p.d.gte(1) && (!hasUpgrade("p", 44)))},
				 currencyDisplayName: "Dice Points", // Use if using a nonstandard currency
                currencyInternalName: "d", // Use if using a nonstandard currency
                currencyLayer: "p",
				effect() {
					return player.p.d.pow(0.32)
				},
				pay() {player.p.d = player.p.d.sub(180)
					player.p.v = player.p.v.sub(5000)},
				},
					44: {
					title: "Infobox!",
					description() {return "Now <b>Random</b> timeout sets to <i>1.5s</i>, and move all Particle upgrades into infobox with following effects <br> |------------------|<br> Unlock 3 new rows of Particle upgrades"},
					cost: new Decimal(460),
					unlocked() {return (player.p.d.gte(1)&& (!hasUpgrade("p", 44)))},
				 currencyDisplayName: "Dice Points", // Use if using a nonstandard currency
                currencyInternalName: "d", // Use if using a nonstandard currency
                currencyLayer: "p",
				},
					51: {
					title: "Boost II",
					description() {return "Each upgrade gives you a bonus to particle gain<br> <br>Currently: ^" + format(upgradeEffect("p", 51))},
					cost: new Decimal(2.46e11),
					unlocked() {return (hasUpgrade("p", 44))},
					effect() {
					let ret = Decimal.pow(1.06, player.p.upgrades.length)
					return ret;
					},
				},
				 52: {
					title: "Boost III",
					description() {return "Unlock Time tab"
},
					cost: new Decimal(3e25),
					unlocked() {return (hasUpgrade("p", 44))},
				},
				 53: {
					title: "Boost IV",
					description() {return "Make DevSpeed more brrr by upgrades <br>Currently: ^" + format(upgradeEffect("p", 53))
},
					cost: new Decimal(2e33),
					unlocked() {return (hasUpgrade("p", 44))},
								effect() {
					let ret = Decimal.pow(1.04, player.p.upgrades.length).max(1)
					return ret;
					},
				},
				                54: {
					title: "<h3 style='color: cyan; text-shadow: 0 0 10px cyan'>Re: Boost I</h3>",
					description() {return "Particles boost themselves gain <br> <br>Currently: " + format(upgradeEffect("p", 54)) + "x"},
					cost: new Decimal(2e38),
					effect() {
					if (upgradeEffect("p", 54).gte(20)) return player.p.sc.pow(3)
						else return player.p.points.pow(0.55)},
					unlocked() {return (hasUpgrade("p", 55))},
				},
								 55: {
					title: "Boost V",
					description() {return "Buying this upgrade, you will be able to re-buy Boost I upgrades with more efficient effect"
},
					cost: new Decimal(1.5e37),
					unlocked() {return (hasUpgrade("p", 44))},
				},
												 61: {
					title: "Dice Boost II",
					description() {return "Scale a <b>Random</b> Die max number by each upgrade <br>Currently: D" + formatWhole(upgradeEffect("p", 61))
},
					cost: new Decimal(1000),
					unlocked() {return (hasUpgrade("p", 44))},
									 currencyDisplayName: "Dice Points", // Use if using a nonstandard currency
                currencyInternalName: "d", // Use if using a nonstandard currency
                currencyLayer: "p",
									effect() {
					let ret = Decimal.times(2, player.p.upgrades.length)
					return ret;
					},
				},
																 62: {
					title: "Dice Boost III",
					description() {return "Unlock an upgrade labirynth that will have another 3 Dice Boosts"
},
					cost: new Decimal(3000),
					unlocked() {return (hasUpgrade("p", 44))},
									 currencyDisplayName: "Dice Points", // Use if using a nonstandard currency
                currencyInternalName: "d", // Use if using a nonstandard currency
                currencyLayer: "p",
				},
																				 71: {
					title: "Brick",
					description() {return "Just a brick. <br><br><i>Have 4500 Dice Points to find an upgrade</i>"
},
					unlocked() {return (hasUpgrade("p", 62))},
									 canAfford() {return (player.p.d.gte(1e300))},
									 currencyDisplayName: "Dice Points", // Use if using a nonstandard currency
                currencyInternalName: "d", // Use if using a nonstandard currency
                currencyLayer: "p",
effect() {return player.p.br},
				style() {
					return {
						'background-color':'gray'
					}
				},
				},
				72: {
					title: "Brick",
					description() {return "Just a brick. <br><br><i>Have 4500 Dice Points to find an upgrade</i>"
},
					unlocked() {return (hasUpgrade("p", 62))},
									 canAfford() {return (player.p.d.gte(1e300))},
									 currencyDisplayName: "Dice Points", // Use if using a nonstandard currency
                currencyInternalName: "d", // Use if using a nonstandard currency
                currencyLayer: "p",
	effect() {return player.p.br},
				style() {
					return {
						'background-color':'gray'
					}
				},
				},
								73: {
					title() {if (hasUpgrade("p", 73)) return "Dice Boost IV"
						else return "Brick"},
					description() {if (hasUpgrade("p", 73)) return "Boosts Particle gain by amount of bricks in 1st row of this upgrades. <br> Currently: " + format(upgradeEffect("p", 71).add(upgradeEffect("p", 72)).add(upgradeEffect("p", 74)).add(upgradeEffect("p", 81)).add(upgradeEffect("p", 82)).add(upgradeEffect("p", 83)).times(4)) + "x"
						else return "Just a brick. <br><br><i>Have 4500 Dice Points to find an upgrade</i>"
},
				 canAfford() {return (player.p.d.gte(4500))},
				 pay() {return player.p.d = player.p.d.sub(4500)},
					unlocked() {return (hasUpgrade("p", 62))},
									 currencyDisplayName: "Dice Points", // Use if using a nonstandard currency
                currencyInternalName: "d", // Use if using a nonstandard currency
                currencyLayer: "p",
				style() {
										if (player.p.d.gte(4500) || (hasUpgrade("p", 73))) return {
						'background-color':'#77bf5f'
					}
					else return {
						'background-color':'gray'
					}
				},
				effect() {return player.p.br.times(upgradeEffect("p", 71).add(upgradeEffect("p", 72)).add(upgradeEffect("p", 74)).times(4).times(1e7))},
				},
												74: {
					title: "Brick",
					description() {return "Just a brick. <br><br><i>Have 4500 Dice Points to find an upgrade</i>"
},
				 canAfford() {return (player.p.d.gte(1e300))},
					unlocked() {return (hasUpgrade("p", 62))},
									 currencyDisplayName: "Dice Points", // Use if using a nonstandard currency
                currencyInternalName: "d", // Use if using a nonstandard currency
                currencyLayer: "p",
effect() {return player.p.br},
				style() {
					 return {
						'background-color':'gray'
					}
				},
				},
																								 81: {
					title() {if (hasUpgrade("p", 81)) return "<h3 style='color: cyan; text-shadow: 0 0 10px cyan'>Re: Dice Boost I</h3>"
						else return "Brick"},
					description() {	if (hasUpgrade("p", 81)) return "Unspent Dices Points boosts particles gain and Dice max number <br>Currently: " + format(upgradeEffect("p", 81)) + "x (<i>softcap - 1k</i>)"
					else return "Just a brick. <br><br><i>Have 8500 Dice Points to find an upgrade</i>"
},
					unlocked() {return (hasUpgrade("p", 73))},
				 canAfford() {return (player.p.d.gte(8500))},
				 pay() {return player.p.d = player.p.d.sub(8500)},
									 currencyDisplayName: "Dice Points", // Use if using a nonstandard currency
                currencyInternalName: "d", // Use if using a nonstandard currency
                currencyLayer: "p",
				style() {
										if (player.p.d.gte(8500) || (hasUpgrade("p", 81))) return {
						'background-color':'#77bf5f'
					}
					else return {
						'background-color':'gray'
					}
				},
				effect() {return player.p.br.times(upgradeEffect("p", 42).times(20).min(1000))},
				},
				82: {
					title: "Brick",
					description() {return "Just a brick. <br><br><i>Have 6500 Dice Points to find an upgrade</i>"
},
					unlocked() {return (hasUpgrade("p", 73))},
									 canAfford() {return (player.p.d.gte(1e300))},
									 currencyDisplayName: "Dice Points", // Use if using a nonstandard currency
                currencyInternalName: "d", // Use if using a nonstandard currency
                currencyLayer: "p",
	effect() {return player.p.br},
				style() {
					return {
						'background-color':'gray'
					}
				},
				},
								83: {
					title() {return "Brick"},
					description() { return "Just a brick. <br><br><i>Have 6500 Dice Points to find an upgrade</i>"
},
				 canAfford() {return (player.p.d.gte(1e300))},
					unlocked() {return (hasUpgrade("p", 73))},
									 currencyDisplayName: "Dice Points", // Use if using a nonstandard currency
                currencyInternalName: "d", // Use if using a nonstandard currency
                currencyLayer: "p",
				style() {
					return {
						'background-color':'gray'
					}
				},
				},
												84: {
					title() {if (hasUpgrade("p", 84)) return "Dice Boost V"
						else return "Brick"},
					description() {if (hasUpgrade("p", 84)) return "Scales <b>Random</b> max number by amount of bricks in 1st row of this upgrades. <br> Currently: +D" + formatWhole(upgradeEffect("p", 71).add(upgradeEffect("p", 72)).add(upgradeEffect("p", 74)).add(upgradeEffect("p", 81)).add(upgradeEffect("p", 82)).add(upgradeEffect("p", 83)).times(2).add(upgradeEffect("p", 61)))
						else return "Just a brick. <br><br><i>Have 6500 Dice Points to find an upgrade</i>"
},
				 canAfford() {return (player.p.d.gte(6500))},
				 pay() {return player.p.d = player.p.d.sub(6500)},
					unlocked() {return (hasUpgrade("p", 73))},
									 currencyDisplayName: "Dice Points", // Use if using a nonstandard currency
                currencyInternalName: "d", // Use if using a nonstandard currency
                currencyLayer: "p",
effect() {return player.p.br},
				style() {
										if (player.p.d.gte(6500) || (hasUpgrade("p", 84))) return {
						'background-color':'#77bf5f'
					}
					else return {
						'background-color':'gray'
					}
				},
								effect() {return player.p.br.times(upgradeEffect("p", 71).add(upgradeEffect("p", 72)).add(upgradeEffect("p", 74)).add(upgradeEffect("p", 81)).add(upgradeEffect("p", 82)).add(upgradeEffect("p", 83)).times(2)).add(upgradeEffect("p", 61))},
				},
																 91: {
					title: "Tickspeed Boost I",
					description() {return "Reqires: 8 Time Ascensions. <br> Unlock a new <b>Mega</b> tab"
},
					cost: new Decimal(2e84),
					canAfford() {return (player.p.buyables[11].gte(8))},
					unlocked() {return (hasUpgrade("p", 44))},
				},
																				 92: {
					title: "Tickspeed Boost II",
					description() {return "Reqires: 10 Time Ascensions. <br> Raise Power gain by 25.00x"
},
					cost: new Decimal(2e127),
					canAfford() {return (player.p.buyables[11].gte(8))},
					unlocked() {return (hasUpgrade("p", 44))},
				},
																								 93: {
					title: "Tickspeed Boost III",
					description() {return "Reqires: 10 Time Ascensions. <br> Raise Particle gain by 2.5e11x"
},
					cost: new Decimal(1e222),
					canAfford() {return (player.p.buyables[11].gte(8))},
					unlocked() {return (hasUpgrade("p", 44))},
				},
																												 94: {
					title: "Tickspeed Boost X",
					description() {return "Reqires: 10 Time Ascensions. <br> Raise Particle gain by 2.5e41x"
},
					cost: new Decimal(2e249),
					canAfford() {return (player.p.buyables[11].gte(8))},
					unlocked() {return (hasUpgrade("p", 44))},
				},
																				 101: {
					title: "Robot Upgrade",
					description() {return "Gain more power based on Creating Percentage"
},
					cost: new Decimal(1.5),
					canAfford() {return (player.p.buyables[11].gte(8))},
					unlocked() {return (hasUpgrade("p", 44))},
									style() {
										if (hasUpgrade("p", 101)) return {
						'background-color':'#77bf5f'
					}
					else return {
						'background-color':'lightblue'
					}
				},
														 currencyDisplayName: "Power", // Use if using a nonstandard currency
                currencyInternalName: "pwr", // Use if using a nonstandard currency
                currencyLayer: "p",
effect() {return player.p.br},
				},
																								 102: {
					title: "Reverse Upgrade",
					description() {return "Gain percentage faster based on Power"
},
					cost: new Decimal(25),
					canAfford() {return (player.p.buyables[11].gte(8))},
					unlocked() {return (hasUpgrade("p", 44))},
									style() {
										if (hasUpgrade("p", 102)) return {
						'background-color':'#77bf5f'
					}
					else return {
						'background-color':'lightblue'
					}
				},
														 currencyDisplayName: "Power", // Use if using a nonstandard currency
                currencyInternalName: "pwr", // Use if using a nonstandard currency
                currencyLayer: "p",
effect() {if (hasUpgrade("p", 103)) return player.p.br.add(1.5)
	else return player.p.ps},
				},
																												 103: {
					title: "Boosty Package",
					description() {return "Now creating time increased by 2.50x, but you will obtain even more power. <br> Currently: " + format(upgradeEffect("p", 102)) + "x"
},
					cost: new Decimal(150),
					canAfford() {return (player.p.buyables[11].gte(8))},
					unlocked() {return (hasUpgrade("p", 44))},
									effect() {
					if (hasUpgrade("p", 103)) return player.points.div(player.points).add(2.5)
				},
									style() {
										if (hasUpgrade("p", 103)) return {
						'background-color':'#77bf5f'
					}
					else return {
						'background-color':'lightblue'
					}
				},

														 currencyDisplayName: "Power", // Use if using a nonstandard currency
                currencyInternalName: "pwr", // Use if using a nonstandard currency
                currencyLayer: "p",
				},
																																 104: {
					title: "Boosty Package II",
					description() {return "Boost Particles gain by Power amount. Currently: " + format(upgradeEffect("p", 104)) + "x"
},
					cost: new Decimal(5000),
					canAfford() {return (player.p.buyables[11].gte(8))},
					unlocked() {return (hasUpgrade("p", 44))},
									style() {
										if (hasUpgrade("p", 104)) return {
						'background-color':'#77bf5f'
					}
					else return {
						'background-color':'lightblue'
					}
				},

														 currencyDisplayName: "Power", // Use if using a nonstandard currency
                currencyInternalName: "pwr", // Use if using a nonstandard currency
                currencyLayer: "p",
effect() { return player.p.pwr.pow(0.65)},
				},
					111: {
					title: "Mega Booster I",
					description() {return "Double Power Gain."
},
					cost: new Decimal(60000),
					canAfford() {return (player.p.buyables[11].gte(8))},
					unlocked() {return (hasUpgrade("p", 44))},
									style() {
										if (hasUpgrade("p", 111)) return {
						'background-color':'#77bf5f'
					}
					else return {
						'background-color':'lightblue'
					}
				},

														 currencyDisplayName: "Power", // Use if using a nonstandard currency
                currencyInternalName: "pwr", // Use if using a nonstandard currency
                currencyLayer: "p",
effect() { return player.p.pwr.pow(0.65)},
				},
									112: {
					title: "Mega Booster II",
					description() {return "<b>Mega Generator</b> buyable level boost Power gain <br>Currently: " + format(upgradeEffect("p", 112))+ "x"
},
					cost: new Decimal(800000),
					canAfford() {return (player.p.buyables[11].gte(8))},
					unlocked() {return (hasUpgrade("p", 44))},
									style() {
										if (hasUpgrade("p", 112)) return {
						'background-color':'#77bf5f'
					}
					else return {
						'background-color':'lightblue'
					}
				},

														 currencyDisplayName: "Power", // Use if using a nonstandard currency
                currencyInternalName: "pwr", // Use if using a nonstandard currency
                currencyLayer: "p",
effect() { return player.p.buyables[21].pow(0.5)},
				},
													113: {
					title: "Mega Booster III",
					description() {return "<b>Mega Upgrader</b> buyable level boost Power gain <br>Currently: " + format(upgradeEffect("p", 113))+ "x"
},
					cost: new Decimal(11000000),
					canAfford() {return (player.p.buyables[11].gte(8))},
					unlocked() {return (hasUpgrade("p", 44))},
									style() {
										if (hasUpgrade("p", 113)) return {
						'background-color':'#77bf5f'
					}
					else return {
						'background-color':'lightblue'
					}
				},

														 currencyDisplayName: "Power", // Use if using a nonstandard currency
                currencyInternalName: "pwr", // Use if using a nonstandard currency
                currencyLayer: "p",
effect() { return player.p.buyables[22].pow(0.5)},
				},
																	114: {
					title: "Mega Booster IV",
					description() {return "Double all Mega Boosters"
},
					cost: new Decimal(210000000),
					canAfford() {return (player.p.buyables[11].gte(8))},
					unlocked() {return (hasUpgrade("p", 44))},
									style() {
										if (hasUpgrade("p", 114)) return {
						'background-color':'#77bf5f'
					}
					else return {
						'background-color':'lightblue'
					}
				},

														 currencyDisplayName: "Power", // Use if using a nonstandard currency
                currencyInternalName: "pwr", // Use if using a nonstandard currency
                currencyLayer: "p",
				},
						121: {
					title: "MEGA-MEGA BOOST I",
					description() {return "Just mega boost power gain by upgrades amount. Currently: " + format(upgradeEffect("p", 121)) + "x"
},
					cost: new Decimal(8.2e9),
					canAfford() {return (player.p.buyables[11].gte(8))},
					unlocked() {return (hasUpgrade("p", 44))},
									style() {
										if (hasUpgrade("p", 121)) return {
						'background-color':'#77bf5f',
						'height': '240px',
						'width': '240px'
					}
					else return {
						'background-color':'lightblue',
										'height': '240px',
						'width': '240px'
					}
				},

														 currencyDisplayName: "Power", // Use if using a nonstandard currency
                currencyInternalName: "pwr", // Use if using a nonstandard currency
                currencyLayer: "p",
effect() { let ret = Decimal.pow(2.63, player.p.upgrades.length)
return ret},
				},
										122: {
					title: "MEGA-MEGA BOOST II",
					description() {return "Just mega boost Mega Points gain by upgrades amount Currently: " + format(upgradeEffect("p", 122)) + "x"
},
					cost: new Decimal(.46e23),
					canAfford() {return (player.p.buyables[11].gte(8))},
					unlocked() {return (hasUpgrade("p", 44))},
									style() {
										if (hasUpgrade("p", 122)) return {
						'background-color':'#77bf5f',
						'height': '240px',
						'width': '240px'
					}
					else return {
						'background-color':'lightblue',
										'height': '240px',
						'width': '240px'
					}
				},

														 currencyDisplayName: "Power", // Use if using a nonstandard currency
                currencyInternalName: "pwr", // Use if using a nonstandard currency
                currencyLayer: "p",
effect() { let ret = Decimal.pow(1.08, player.p.upgrades.length)
return ret},
				},
														131: {
					title: "Infinity Upgrade 11",
					description() {return "Boost Particle gain by current playtime. <br> Currently: " + format(upgradeEffect("p", 131)) + "x"
},
					cost: new Decimal(1),
					canAfford() {return (player.p.buyables[11].gte(8))},
					unlocked() {return (hasUpgrade("p", 44))},
									style() {
										if (hasUpgrade("p", 131)) return {
						'background-color':'#77bf5f',
					}
					else return {
						'background-color':'green',
					}
				},

														 currencyDisplayName: "Infinity", // Use if using a nonstandard currency
                currencyInternalName: "i", // Use if using a nonstandard currency
                currencyLayer: "p",
effect() { return player.points.pow(4)},
				},
																		132: {
					title: "Infinity Upgrade 12",
					description() {return "Set the main cost currency to essences but increase upgrades cost"
},
					cost: new Decimal(2),
					canAfford() {return (player.p.buyables[11].gte(8))},
					unlocked() {return (hasUpgrade("p", 44))},
									style() {
										if (hasUpgrade("p", 132)) return {
						'background-color':'#77bf5f',
					}
					else return {
						'background-color':'green',
					}
				},

														 currencyDisplayName: "Infinity", // Use if using a nonstandard currency
                currencyInternalName: "i", // Use if using a nonstandard currency
                currencyLayer: "p",
effect() { return player.points.pow(4)},
				},
																		141: {
					title: "Infinity Upgrade 21",
					description() {return "Decrease Particles gain but decrease essence requirement"
},
					cost: new Decimal(120),
					canAfford() {return (player.p.buyables[11].gte(8))},
					unlocked() {return (hasUpgrade("p", 44))},
									style() {
										if (hasUpgrade("p", 141)) return {
						'background-color':'#77bf5f',
					}
					else return {
						'background-color':'green',
					}
				},


														 currencyDisplayName: "Essences", // Use if using a nonstandard currency
                currencyInternalName: "mpoints", // Use if using a nonstandard currency
                currencyLayer: "p",
				},
																		142: {
					title: "Infinity Upgrade 22",
					description() {return "Wow! 308 Essences! Create a 308x boost to Particle gain!"
},
					cost: new Decimal(308),
					canAfford() {return (player.p.buyables[11].gte(8))},
					unlocked() {return (hasUpgrade("p", 44))},
									style() {
										if (hasUpgrade("p", 142)) return {
						'background-color':'#77bf5f',
					}
					else return {
						'background-color':'green',
					}
				},

														 currencyDisplayName: "Essences", // Use if using a nonstandard currency
                currencyInternalName: "mpoints", // Use if using a nonstandard currency
                currencyLayer: "p",
				},
																						151: {
					title: "Infinity Upgrade 31",
					description() {return "Wow! 1250 Essences! Create a 150x boost to essence gain"
},
					cost: new Decimal(1250),
					canAfford() {return (player.p.buyables[11].gte(8))},
					unlocked() {return (hasUpgrade("p", 44))},
									style() {
										if (hasUpgrade("p", 151)) return {
						'background-color':'#77bf5f',
					}
					else return {
						'background-color':'green',
					}
				},

														 currencyDisplayName: "Essences", // Use if using a nonstandard currency
                currencyInternalName: "mpoints", // Use if using a nonstandard currency
                currencyLayer: "p",
				},
																										152: {
					title: "Infinity Upgrade 32",
					description() {return "So much scaling... Boost essence gain by this upgrade cost!"
},
					cost: new Decimal(320000),
					canAfford() {return (player.p.buyables[11].gte(8))},
					unlocked() {return (hasUpgrade("p", 44))},
									style() {
										if (hasUpgrade("p", 152)) return {
						'background-color':'#77bf5f',
					}
					else return {
						'background-color':'green',
					}
				},

														 currencyDisplayName: "Essences", // Use if using a nonstandard currency
                currencyInternalName: "mpoints", // Use if using a nonstandard currency
                currencyLayer: "p",
				},
																														161: {
					title: "Infinity Upgrade 41",
					description() {return "Does nothing? Unlock Milestones chamber!"
},
					cost: new Decimal(3e10),
					canAfford() {return (player.p.buyables[11].gte(8))},
					unlocked() {return (hasUpgrade("p", 44))},
									style() {
										if (hasUpgrade("p", 161)) return {
						'background-color':'#77bf5f',
					}
					else return {
						'background-color':'green',
					}
				},

														 currencyDisplayName: "Essences", // Use if using a nonstandard currency
                currencyInternalName: "mpoints", // Use if using a nonstandard currency
                currencyLayer: "p",
				},
																																		162: {
					title: "Infinity Upgrade FINALE",
					description() {return "Yeah, that's the end of this tab... But unlock another Infinity Tab! Let's go!"
},
					cost: new Decimal(1e308),
					canAfford() {return (player.p.buyables[11].gte(8))},
					unlocked() {return (hasUpgrade("p", 44))},
									style() {
										if (hasUpgrade("p", 162)) return {
						'background-color':'#77bf5f',
					}
					else return {
						'background-color':'green',
					}
				},

														 currencyDisplayName: "Essences", // Use if using a nonstandard currency
                currencyInternalName: "mpoints", // Use if using a nonstandard currency
                currencyLayer: "p",
				},
						171: {
					title: "11",
					description() {return "Start generating tree essences"
},
					cost: new Decimal(1e308),
					canAfford() {return (player.p.buyables[11].gte(8))},
					unlocked() {return (hasUpgrade("p", 44))},
									style() {
										if (hasUpgrade("p", 171)) return {
						'background-color':'#77bf5f',
					}
					else return {
						'background-color':'green',
					}
				},

														 currencyDisplayName: "Essences", // Use if using a nonstandard currency
                currencyInternalName: "mpoints", // Use if using a nonstandard currency
                currencyLayer: "p",
				},
										181: {
					title: "12",
					description() {return "Generate <b>more</b> tree essences"
},
					cost: new Decimal(3),
					canAfford() {return (player.p.buyables[11].gte(8))},
					unlocked() {return (hasUpgrade("p", 171))},
					branches: [171],
									style() {
										if (hasUpgrade("p", 181)) return {
						'background-color':'#77bf5f',
						'margin-top': '70px',
											'margin-right': '70px'
					}
					else return {
						'background-color':'green',
					'margin-top': '70px',
					'margin-right': '70px'
					}
				},

														 currencyDisplayName: "Tree Essences", // Use if using a nonstandard currency
                currencyInternalName: "t", // Use if using a nonstandard currency
                currencyLayer: "p",
				},
														182: {
					title: "13",
					description() {return "Generate much more tree essences"
},
					cost: new Decimal(38),
					canAfford() {return (player.p.buyables[11].gte(8))},
					unlocked() {return (hasUpgrade("p", 171))},
					branches: [171],
									style() {
										if (hasUpgrade("p", 182)) return {
						'background-color':'#77bf5f',
						'margin-top': '50px',
											'margin-left': '70px'
					}
					else return {
						'background-color':'green',
					'margin-top': '50px',
					'margin-left': '70px'
					}
				},

														 currencyDisplayName: "Tree Essences", // Use if using a nonstandard currency
                currencyInternalName: "t", // Use if using a nonstandard currency
                currencyLayer: "p",
				},
																		183: {
					title: "14",
					description() {return "Generate <b> much more</b> tree essences"
},
					cost: new Decimal(360),
					canAfford() {return (player.p.buyables[11].gte(8))},
					unlocked() {return (hasUpgrade("p", 171))},
					branches: [171],
									style() {
										if (hasUpgrade("p", 183)) return {
						'background-color':'#77bf5f',
						'margin-top': '50px',
											'margin-left': '70px'
					}
					else return {
						'background-color':'green',
					'margin-top': '50px',
					'margin-left': '70px'
					}
				},

														 currencyDisplayName: "Tree Essences", // Use if using a nonstandard currency
                currencyInternalName: "t", // Use if using a nonstandard currency
                currencyLayer: "p",
				},
																						191: {
					title: "15",
					description() {return "Generate more tree essences"
},
					cost: new Decimal(1220),
					canAfford() {return (player.p.buyables[11].gte(8))},
					unlocked() {return (hasUpgrade("p", 182) && hasUpgrade("p", 183))},
					branches: [182, 183],
									style() {
										if (hasUpgrade("p", 191)) return {
						'background-color':'#77bf5f',
						'margin-top': '70px',
											'margin-left': '140px'
					}
					else return {
						'background-color':'green',
					'margin-top': '70px',
					'margin-left': '140px'
					}
				},

														 currencyDisplayName: "Tree Essences", // Use if using a nonstandard currency
                currencyInternalName: "t", // Use if using a nonstandard currency
                currencyLayer: "p",
				},
										201: {
					title: "16",
					description() {return "Generate more tree essences"
},
					cost: new Decimal(36000),
					canAfford() {return (player.p.buyables[11].gte(8))},
					unlocked() {return (hasUpgrade("p", 181)&& (hasUpgrade("p", 191)))},
					branches: [181, 182],
									style() {
										if (hasUpgrade("p", 201)) return {
						'background-color':'#77bf5f',
								'margin-right': '210px'
					}
					else return {
						'background-color':'green',
						'margin-bottom': '40px',
									'margin-right': '210px'
					}
				},

														 currencyDisplayName: "Tree Essences", // Use if using a nonstandard currency
                currencyInternalName: "t", // Use if using a nonstandard currency
                currencyLayer: "p",
				},
														202: {
					title: "17",
					description() {return "Generate more tree essences"
},
					cost: new Decimal(125000),
					canAfford() {return (player.p.buyables[11].gte(8))},
					unlocked() {return (hasUpgrade("p", 201))},
					branches: [201],
									style() {
										if (hasUpgrade("p", 202)) return {
						'background-color':'#77bf5f',
											'margin-top': '60px',
								'margin-right': '60px'
					}
					else return {
						'background-color':'green',
						'margin-top': '60px',
									'margin-right': '60px'
					}
				},

														 currencyDisplayName: "Tree Essences", // Use if using a nonstandard currency
                currencyInternalName: "t", // Use if using a nonstandard currency
                currencyLayer: "p",
				},
																		212: {
					title: "18",
					description() {return "Generate more tree essences"
},
					cost: new Decimal(1250000),
					canAfford() {return (player.p.buyables[11].gte(8))},
					unlocked() {return (hasUpgrade("p", 191))},
					branches: [191],
									style() {
										if (hasUpgrade("p", 212)) return {
						'background-color':'#77bf5f',
			'margin-right': '60px'
					}						
					else return {
						'background-color':'green',
						'margin-right': '60px'
					}
				},

														 currencyDisplayName: "Tree Essences", // Use if using a nonstandard currency
                currencyInternalName: "t", // Use if using a nonstandard currency
                currencyLayer: "p",
				},
																						211: {
					title: "20",
					description() {return "Generate more tree essences"
},
					cost: new Decimal(2e11),
					canAfford() {return (player.p.buyables[11].gte(8))},
					unlocked() {return (hasUpgrade("p", 201))},
					branches: [201],
									style() {
										if (hasUpgrade("p", 211)) return {
						'background-color':'#77bf5f',
									'margin-right': '30px'
					}
					else return {
						'background-color':'green',
											'margin-right': '30px'
					}
				},

														 currencyDisplayName: "Tree Essences", // Use if using a nonstandard currency
                currencyInternalName: "t", // Use if using a nonstandard currency
                currencyLayer: "p",
				},
																						221: {
					title: "19",
					description() {return "Generate more tree essences"
},
					cost: new Decimal(120000000),
					canAfford() {return (player.p.buyables[11].gte(8))},
					unlocked() {return (hasUpgrade("p", 202) && hasUpgrade("p", 212))},
					branches: [202, 212],
									style() {
										if (hasUpgrade("p", 221)) return {
						'background-color':'#77bf5f',
											'margin-top': '60px',
								'margin-left': '60px'
					}
					else return {
						'background-color':'green',
						'margin-top': '60px',
									'margin-left': '60px'
					}
				},

														 currencyDisplayName: "Tree Essences", // Use if using a nonstandard currency
                currencyInternalName: "t", // Use if using a nonstandard currency
                currencyLayer: "p",
				},
				},
				
			buyables: {
			    11: {
        cost(x) { return new Decimal(6e27).times(x.add(1).pow(x.add(5).times(5))) },
		purchaseLimit: 10,
        display() {
                let data = tmp[this.layer].buyables[this.id]
				return "<h2><b>Time Collapse</b></h2> <br>" + "Requirement: " + format(data.cost) + " Particles <br>" + "Ascended: " + formatWhole(player[this.layer].buyables[this.id]) + "/10 <br> Effect: x" + format(data.effect) + " to devSpeed"},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
			                cost = tmp[this.layer].buyables[this.id].cost
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x) {return x = x.pow(0.82).max(1.34)},
											style() {
					if (player.p.buyables[11].gte(10)) return {
						'background-color': '#77bf5f'
					}
											else return {
						'background-color': 'red'
					}
			},
    },
				    21: {
        cost(x) { return new Decimal(1).times(x.pow(2.4).max(2)).max(2) },
		purchaseLimit: 1500,
        display() {
                let data = tmp[this.layer].buyables[this.id]
				return "<h2><b>Mega Generator</b></h2> <br>" + "Requirement: " + format(data.cost) + " Mega Points <br>" + "Level: " + formatWhole(player[this.layer].buyables[this.id]) + "/1500 <br> Effect: +" + format(data.effect) + " to Mega Points gain"},
        canAfford() { return player[this.layer].mp.gte(this.cost()) },
        buy() {
			                cost = tmp[this.layer].buyables[this.id].cost
            player[this.layer].mp = player[this.layer].mp.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1).add(player.p.buyables[31]).max(1))
        },
														style() {
															                let data = tmp[this.layer].buyables[this.id]
				if (player.p.mp.lt(data.cost)) return {
						'background-color': '#bf8f8f'
					}
				else return {
						'background-color': 'lightblue'
					}
			},
		effect(x) {if (player.p.buyables[22].gte(1)) return x = x.times(1.6).max(1).times(buyableEffect("p", 22))
			else return x = x.times(1.6).max(1)},
    },
					    22: {
        cost(x) { return new Decimal(300).times(x.pow(1.6).max(1.5)).max(300) },
		purchaseLimit: 4000,
        display() {
                let data = tmp[this.layer].buyables[this.id]
				return "<h2><b>Mega Upgrader</b></h2> <br>" + "Requirement: " + format(data.cost) + " Mega Points <br>" + "Level: " + formatWhole(player[this.layer].buyables[this.id]) + "/4000 <br> Effect: x" + format(data.effect) + " to Mega Generator"},
        canAfford() { return player[this.layer].mp.gte(this.cost()) },
        buy() {
			                cost = tmp[this.layer].buyables[this.id].cost
            player[this.layer].mp = player[this.layer].mp.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1).add(player.p.buyables[31]).max(1))
        },
														style() {
															                let data = tmp[this.layer].buyables[this.id]
				if (player.p.mp.lt(data.cost)) return {
						'background-color': '#bf8f8f'
					}
				else return {
						'background-color': 'lightblue'
					}
			},
		effect(x) {if (player.p.buyables[33].gte(1)) return x = x.pow(1.8).max(1).times(buyableEffect("p", 23)).times(buyableEffect("p", 33))
			else if (player.p.buyables[23].gte(1)) return x = x.pow(1.8).max(1).times(buyableEffect("p", 23))
			else return x = x.add(0.1).pow(1.6).max(1)},
    },
						    23: {
        cost(x) { return new Decimal(150000).times(x.pow(6).max(1)).max(150000) },
		purchaseLimit: 17,
        display() {
                let data = tmp[this.layer].buyables[this.id]
				return "<h2><b>Mega Tierer</b></h2> <br>" + "Requirement: " + format(data.cost) + " Mega Points <br>" + "Level: " + formatWhole(player[this.layer].buyables[this.id]) + "/17 <br> Effect: x" + format(data.effect) + " to Mega Upgrader"},
        canAfford() { return player[this.layer].mp.gte(this.cost()) },
        buy() {
			                cost = tmp[this.layer].buyables[this.id].cost
            player[this.layer].mp = player[this.layer].mp.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1).add(player.p.buyables[31]).max(1))
        },
														style() {
															                let data = tmp[this.layer].buyables[this.id]
				if (player.p.mp.lt(data.cost)) return {
						'background-color': '#bf8f8f'
					}
				else return {
						'background-color': 'lightblue'
					}
			},
		effect(x) {if (player.p.buyables[31].gte(1)) return x = x.times(1.2).max(1).times(buyableEffect("p", 31))
			else return x = x.times(1.2).max(1)},
    },
							    31: {
        cost(x) { return new Decimal(18000000).times(x.pow(6).max(1)).max(18000000) },
		purchaseLimit: 10,
        display() {
                let data = tmp[this.layer].buyables[this.id]
				return "<h2><b>Mega Scaler</b></h2> <br>" + "Requirement: " + format(data.cost) + " Mega Points <br>" + "Level: " + formatWhole(player[this.layer].buyables[this.id]) + "/10 <br> Effect: x" + format(data.effect) + " to Mega Tierer and scale up buying of 1st row of buyables up to 1 per click per level"},
        canAfford() { return player[this.layer].mp.gte(this.cost()) },
        buy() {
			                cost = tmp[this.layer].buyables[this.id].cost
            player[this.layer].mp = player[this.layer].mp.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
														style() {
															                let data = tmp[this.layer].buyables[this.id]
				if (player.p.mp.lt(data.cost)) return {
						'background-color': '#bf8f8f'
					}
				else return {
						'background-color': 'lightblue'
					}
			},
		effect(x) {if (player.p.buyables[32].gte(1)) return x = x.times(0.06).add(1).add(buyableEffect("p", 32))
			else return x = x.times(0.06).add(1)},
    },
								    32: {
        cost(x) { return new Decimal(1.78e308).times(x.pow(12).max(1)).max(1.78e308) },
		purchaseLimit: 1,
        display() {
                let data = tmp[this.layer].buyables[this.id]
				return "<h2><b>Mega Omega</b></h2> <br>" + "Requirement: " + format(data.cost) + " Mega Points <br>" + "Level: " + formatWhole(player[this.layer].buyables[this.id]) + "/1 <br>  Unlock <b>Infinities</b>"},
        canAfford() { return player[this.layer].mp.gte(this.cost()) },
        buy() {
			                cost = tmp[this.layer].buyables[this.id].cost
            player[this.layer].mp = player[this.layer].mp.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
														style() {
															                let data = tmp[this.layer].buyables[this.id]
				if (player.p.mp.lt(data.cost)) return {
						'background-color': 'black',
						'color': 'white'
					}
				else return {
						'background-color': 'lightblue'
					}
			},
		effect(x) {return x = x.max(0.2).times(0.005)},
    },
									    33: {
        cost(x) { return new Decimal(1e11).times(x.pow(12).max(1)).max(1e11) },
		purchaseLimit: 2,
        display() {
                let data = tmp[this.layer].buyables[this.id]
				return "<h2><b>Mega Mega</b></h2> <br>" + "Requirement: " + format(data.cost) + " Mega Points <br>" + "Level: " + formatWhole(player[this.layer].buyables[this.id]) + "/2 <br> Effect: x" + format(data.effect) + " to Mega Upgrader"},
        canAfford() { return player[this.layer].mp.gte(this.cost()) },
        buy() {
			                cost = tmp[this.layer].buyables[this.id].cost
            player[this.layer].mp = player[this.layer].mp.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
														style() {
															                let data = tmp[this.layer].buyables[this.id]
				if (player.p.mp.lt(data.cost) && player.p.buyables[33].lt(2)) return {
						'background-color': '#bf8f8f'
					}
				else return {
						'background-color': 'lightblue'
					}
			},
		effect(x) {if (player.p.buyables[43].gte(1)) return x = x.max(1).times(2.75).times(buyableEffect("p", 42)).pow(buyableEffect("p", 43).div(2))
			else if (player.p.buyables[42].gte(1)) return x = x.max(1).times(2.75).times(buyableEffect("p", 42))
			else return x = x.max(1).times(2.75)},
    },
										    41: {
        cost(x) { return new Decimal(1e13).times(x.pow(500).max(1)).max(1e11) },
		purchaseLimit: 1,
        display() {
                let data = tmp[this.layer].buyables[this.id]
				return "<h2><b>Mega Mega^2</b></h2> <br>" + "Requirement: " + format(data.cost) + " Mega Points <br>" + "Level: " + formatWhole(player[this.layer].buyables[this.id]) + "/1 <br> Description: Obtain " + format(data.effect) + " Mega Robot"},
        canAfford() { return player[this.layer].mp.gte(this.cost()) },
        buy() {
			                cost = tmp[this.layer].buyables[this.id].cost
            player[this.layer].mp = player[this.layer].mp.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
														style() {
															                let data = tmp[this.layer].buyables[this.id]
				if (player.p.mp.lt(data.cost) && player.p.buyables[41].lt(1)) return {
						'background-color': '#bf8f8f'
					}
				else return {
						'background-color': 'lightblue'
					}
			},
		effect(x) {return x = x},
    },
											    42: {
        cost(x) { return new Decimal(1e150).times(x.pow(50).max(1)).max(1e11) },
		purchaseLimit: 1,
        display() {
                let data = tmp[this.layer].buyables[this.id]
				return "<h2><b>Mega Ultra</b></h2> <br>" + "Requirement: " + format(data.cost) + " Mega Points <br>" + "Level: " + formatWhole(player[this.layer].buyables[this.id]) + "/1 <br> Description: Get " + format(data.effect) + "x boost to Mega Mega"},
        canAfford() { return player[this.layer].mp.gte(this.cost()) },
        buy() {
			                cost = tmp[this.layer].buyables[this.id].cost
            player[this.layer].mp = player[this.layer].mp.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
														style() {
															                let data = tmp[this.layer].buyables[this.id]
				if (player.p.mp.lt(data.cost) && player.p.buyables[42].lt(1)) return {
						'background-color': '#bf8f8f'
					}
				else return {
						'background-color': 'lightblue'
					}
			},
		effect(x) {return x = x.times(15)},
    },
												    43: {
        cost(x) { return new Decimal(1e230).times(x.pow(50).max(1)).max(1e11) },
		purchaseLimit: 1,
        display() {
                let data = tmp[this.layer].buyables[this.id]
				return "<h2><b>The last one</b></h2> <br>" + "Requirement: " + format(data.cost) + " Mega Points <br>" + "Level: " + formatWhole(player[this.layer].buyables[this.id]) + "/1 <br> Description: Get ^" + format(data.effect.div(2)) + " boost to Mega Mega"},
        canAfford() { return player[this.layer].mp.gte(this.cost()) },
        buy() {
			                cost = tmp[this.layer].buyables[this.id].cost
            player[this.layer].mp = player[this.layer].mp.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
														style() {
															                let data = tmp[this.layer].buyables[this.id]
				if (player.p.mp.lt(data.cost) && player.p.buyables[43].lt(1)) return {
						'background-color': '#bf8f8f'
					}
				else return {
						'background-color': 'lightblue'
					}
			},
		effect(x) {return x = x.times(15)},
    },
			},

				clickables: {
    11: {
		title: "Random",
        display() {
			if (hasUpgrade("p", 84)) return "Roll D" + formatWhole((upgradeEffect("p", 84))) + " Die. Adds you 1 to " + formatWhole((upgradeEffect("p", 84))) +  " Dice Points"
						if (hasUpgrade("p", 61)) return "Roll D" + formatWhole(upgradeEffect("p", 61)) + " Die. Adds you 1 to " + formatWhole(upgradeEffect("p", 61)) +  " Dice Points"
			if (hasUpgrade("p", 43)) return "Roll D20 Die. Adds you 1 to 20 Dice Points"
			if (hasUpgrade("p", 41)) return "Roll D10 Die. Adds you 1 to 10 Dice Points"
			else return "Roll a Die. Adds you 1 to 5 Dices Points"},
		canClick() { return (player.p.at == 0)},
onClick() {
if (player.p.buyables[11].gte(1)) player.p.at = 1.5 / buyableEffect("p", 11).pow(upgradeEffect("p", 53))
	else if (hasUpgrade("p", 44)) player.p.at = 1.5
	else player.p.at = 3
	if (hasUpgrade("p", 84)) roll = Math.random() * (upgradeEffect("p", 84)) + (1)
  else if (hasUpgrade("p", 61)) roll = Math.random() * (upgradeEffect("p", 61)) + (1)
  else roll = Math.random() * (5 - 1) + (1);  // replacing min and max with their proper variable locations
   if (hasUpgrade("p", 61)) return player.p.d = player.p.d.add(roll).ceil()
   if (hasUpgrade("p", 43)) return player.p.d = player.p.d.add(roll).add(roll).add(roll).add(roll).ceil()
 if (hasUpgrade("p", 41)) return player.p.d = player.p.d.add(roll).add(roll).ceil()
  else return player.p.d = player.p.d.add(roll).ceil()
},
								style() {
											if (player.p.at > 0) return {
						'background-color': '#bf8f8f'
					}
					if (player.p.at == 0) return {
						'background-color': 'white'
					}
				}
		},
				    12: {
		title: "Reward I",
        display() {
return "The reward by killing Particle Slime: 4 RPG Coins and full health"},
		canClick() { return (player.p.sl <= 0 && player.p.rc.lte(2))},
		unlocked() {return player.p.sl <= 0},
onClick() {
return player.p.rc = player.p.rc.add(4)
player.p.att = player.p.rc.sub(15)		
},
								style() {
																if (player.p.rc.gte(2)) return {
						'background-color': '#bf8f8f'
					}
					else return {
						'background-color': 'red'
					}
				}
		},
						    21: {
		title: "Obtain Infinity (1)",
        display() {
return "Requires: 1.78e308 Particles "},
		canClick() { return (player.p.points.gte(1.78e308))},
		unlocked() {return (!player.p.i.gte(1))},
onClick() {
return player.p.i = player.p.i.add(1)
player.p.points = player.p.points.sub(player.p.points)		
},
								style() {
																if (player.p.i.gte(1)) return {
						'background-color': '#bf8f8f'
					}
					else return {
						'background-color': 'green'
					}
				}
		},
								    22: {
		title: "Obtain Infinity (2)",
        display() {return "Requires: 1 Essence"},
		canClick() { return (player.p.mpoints.gte(1))},
		unlocked() {return (!player.p.i.gte(2))},
onClick() {
return player.p.i = player.p.i.add(1)
player.p.points = player.p.points.sub(player.p.points)		
},
								style() {
																if (player.p.i.gte(2)) return {
						'background-color': '#bf8f8f'
					}
					else return {
						'background-color': 'green'
					}
				}
		},
										    31: {
		title: "<h3>Convert to Essence</h3>",
        display() {if (hasUpgrade("p", 141)) return "Requires: 10 Particles "
else return "Requires: 1e308 Particles "},
		canClick() {if (hasUpgrade("p", 141)) return (player.p.points.gte(10))
			else return (player.p.points.gte(1e308))},
		unlocked() {return true},
onClick() {
	player.p.points = player.p.points.sub(player.p.points)
if (hasMilestone("p", 5)) return player.p.mpoints = player.p.mpoints.add(2.0736e18).pow(2)
if (hasMilestone("p", 5)) return player.p.mpoints = player.p.mpoints.add(2.0736e18)
if (hasUpgrade("p", 152)) return player.p.mpoints = player.p.mpoints.add(1440000000)
if (hasUpgrade("p", 151)) return player.p.mpoints = player.p.mpoints.add(4500)
if (hasUpgrade("p", 141)) return player.p.mpoints = player.p.mpoints.add(30)
else return player.p.mpoints = player.p.mpoints.add(1)
		
},
								style() {
					if (player.p.points.lte(10) && (hasUpgrade("p", 141))) return {
						'background-color': '#bf8f8f'
					}
																else if (player.p.points.lte(1e308) && (!player.p.points.gte(10))) return {
						'background-color': '#bf8f8f'
					}
					else return {
						'background-color': 'green'
					}
				}
		},
    },
	bars: {
    bar: {
        direction: RIGHT,
        width: 400,
        height: 20,
        progress() { if (hasUpgrade("p", 103)) return Math.max(0, player.p.prcs.div(10).div(player.p.pwr.div(30).max(1)).div(2.5))
		else return Math.max(0, player.p.prcs.div(10).div(player.p.pwr.div(30).max(1))) },
		 instant: true,
		 unlocked() {return true
		 },
		 display() {
			if (hasUpgrade("p", 103)) return "Creating power...    " + format(player.p.prcs.div(10).div(player.p.pwr.div(30).max(1)).times(100).div(2.5)) + "%"
                else return "Creating power...    " + format(player.p.prcs.div(10).div(player.p.pwr.div(30).max(1)).times(100)) + "%"
            },
		fillStyle() {
			return {
				'background-color': 'lightblue',
				'color': 'black'
			}
		},
    },
},
infoboxes: {
	    gain: {
        title: "Gain: ",
        body() { return "You are gaining " + format(mult) + " Particles/s"},
    },
    effects: {
        title: "Effects: ",
        body() { return "Boost I: " + format(upgradeEffect("p", 12)) + "x<br> Power up Particles: " + format(upgradeEffect("p", 13)) + "x <br> Exponential: ^" + format(upgradeEffect("p", 32)) + " <br> Dices Boost I: " + format(upgradeEffect("p", 42)) + "x"  },
		unlocked() {return (hasUpgrade("p", 44))},
    },
},
	milestones: {
    0: {
        requirementDescription: "5 Minutes of playtime",
        effectDescription() {return "Check mod info for reward descriptions."},
        done() { return (player.points.gte(310)) },
    },
	    1: {
        requirementDescription: "20 Minutes of playtime",
        effectDescription() {return "Check mod info for reward descriptions."},
        done() { return (player.points.gte(1210)) },
    },
			    2: {
        requirementDescription: "1 Hour of playtime",
        effectDescription() {return "Check mod info for reward descriptions."},
        done() { return (player.points.gte(3610)) },
    },
				    3: {
        requirementDescription: "2 Hours of playtime",
        effectDescription() {return "Check mod info for reward descriptions."},
        done() { return (player.points.gte(7210)) },
    },
					    4: {
        requirementDescription: "4 Hours of playtime",
        effectDescription() {return "Check mod info for reward descriptions."},
        done() { return (player.points.gte(14410)) },
    },
						    5: {
        requirementDescription: "1e11 Essences!",
        effectDescription() {return "Maybe again super boost? ^2 to essence gain!"},
				unlocked() {return (hasUpgrade("p", 161))},
        done() { return (player.p.mpoints.gte(1e11)) },
    },
							    6: {
        requirementDescription: "1e20 Essences!",
        effectDescription() {return "Maybe again super boost? ^2 to essence gain!"},
				unlocked() {return (hasUpgrade("p", 161))},
        done() { return (player.p.mpoints.gte(1e20)) },
    },
	},
									passiveGeneration() {			
return (player.points.gte(1)?1:0)
  },
    update(diff) {  
 if (hasUpgrade("p", 171)) {
player.p.t = player.p.t.add(tmp.p.effte.times(diff))
}
	
 if (player.p.prcs.gte(player.p.req.times(player.p.pwr.div(30).max(1)).times(upgradeEffect("p", 102))) && player.p.buyables[41].gte(1)) {
		player.p.mp = player.p.mp.add(tmp.p.effmp.times(diff))
		player.p.prcs = player.p.prcs.div(1000)
		player.p.pwr = player.p.pwr.add(tmp.p.efpwr.times(diff)).add(tmp.p.efpwr.times(diff))
}
	else if (player.p.mr.gte(1) && player.p.buyables[41].gte(1)) {
		player.p.mp = player.p.mp.add(tmp.p.effmp.times(diff))
		player.p.prcs = player.p.prcs.add(tmp.p.effmr.times(diff))
	}
if (player.p.buyables[21].gte(1)) return player.p.mp = player.p.mp.add(tmp.p.effmp.times(diff))


			  if (player.p.at > 0) player.p.at = Math.max(0,player.p.at - diff)	
					
			if (player.p.sl <= 0) player.p.rc = player.p.rc
       
	   if (hasUpgrade("p", 14))
          return player.p.v = player.p.v.add(tmp.p.effect.times(diff))

	},
    layerShown(){return true}
})