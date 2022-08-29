addLayer("p", {
    name: "Particles", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		sc: new Decimal(20),
		v: new Decimal(0),
		rc: new Decimal(0),
		at: 1,
		sl: 10,
		gb: 30,
		dmg: new Decimal(0),
		ph: 15,
		att: new Decimal(0),
		d: new Decimal(0),
		mt: new Decimal(1),
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
        return mult
    },
	    effect() {
        if (!hasUpgrade("p", 14))
            return new Decimal(0.5);
        let eff = Decimal.pow(1);
		        if (hasUpgrade("p", 31))
            eff = eff.times(2.5);
        if (hasUpgrade("p", 22))
            eff = eff.add(15);
		if (player.p.buyables[11].gte(1))
			eff = eff.times(buyableEffect("p", 11))
		if (hasMilestone("p", 1))
			eff = eff.times(1.4)
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
			["upgrades", [1,3,4,5]],
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
		        "Dices": {
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
            function() { if (hasUpgrade("p", 23)) return ["clickable", 11]
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
				"buyables"
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
					else return player.p.v.pow(0.4) },
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
					title: "Add 2nd Dice",
					description() {return "The <b>Random</b> now works twice if you click"},
					cost: new Decimal(65),
									                currencyDisplayName: "Dices Points", // Use if using a nonstandard currency
                currencyInternalName: "d", // Use if using a nonstandard currency
                currencyLayer: "p",
					unlocked() {return (player.p.d.gte(1) && (!hasUpgrade("p", 44)))},
				},
									 42: {
					title: "Dices Boost I",
					description() {return "Unspent Dices Points boosts particles gain <br> <br>Currently: " + format(upgradeEffect("p", 42)) + "x"},
					cost: new Decimal(130),
					unlocked() {return (player.p.d.gte(1) && (!hasUpgrade("p", 44)))},
				 currencyDisplayName: "Dices Points", // Use if using a nonstandard currency
                currencyInternalName: "d", // Use if using a nonstandard currency
                currencyLayer: "p",
				effect() {
					return player.p.d.pow(0.32)
				},
				},
													 43: {
					title: "Add 4th Dice",
					description() {return "Now <b>Random</b> clickable works 4 times on click. <br><i>To buy this upgrade you need: 10000 Void, 180 Dices Points</i>"},
					cost: new Decimal(180),
					canAfford() {return player.p.v.gte(5000)},
					unlocked() {return (player.p.d.gte(1) && (!hasUpgrade("p", 44)))},
				 currencyDisplayName: "Dices Points", // Use if using a nonstandard currency
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
				 currencyDisplayName: "Dices Points", // Use if using a nonstandard currency
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
					let ret = Decimal.pow(1.04, player.p.upgrades.length)
					return ret;
					},
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
		effect(x) {return x = x.pow(0.82)},
											style() {
					if (player.p.buyables[11].gte(10)) return {
						'background-color': '#77bf5f'
					}
											else return {
						'background-color': 'red'
					}
			},
    },
			},

				clickables: {
    11: {
		title: "Random",
        display() {
			if (hasUpgrade("p", 43)) return "Roll 4 Dices. Adds you 1 to 20 Dices Points"
			if (hasUpgrade("p", 41)) return "Roll 2 Dices. Adds you 1 to 10 Dices Points"
			else return "Roll a Dice. Adds you 1 to 5 Dices Points"},
		canClick() { return (player.p.at == 0)},
onClick() {
if (player.p.buyables[11].gte(1)) player.p.at = 1.5 / buyableEffect("p", 11)
	else if (hasUpgrade("p", 44)) player.p.at = 1.5
	else player.p.at = 3
  let roll = Math.random() * (5 - 1) + (1);  // replacing min and max with their proper variable locations
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
    },
	bars: {
    hp1: {
        direction: LEFT,
        width: 400,
        height: 20,
        progress() { return Math.max(0, player.p.dmg.div(10)) },
		 instant: true,
		 unlocked() {
			 if (player.p.sl <= 0) return false
			 else return true
		 },
		 display() {
                return `Lv.1 | Particle Slime ${format(player.p.sl)}/10 HP`
            },
		fillStyle() {
			return {
				'background-color': 'black'
			}
		},
				baseStyle() {
			return {
				'background-color': 'red'
			}
		},
    },
	    PlayerHP: {
        direction: LEFT,
        width: 100,
        height: 50,
        progress() { return Math.max(0, player.p.att.div(15)) },
		 instant: true,
		 display() {
                return `Your HP - ${format(player.p.ph)}/15 HP`
            },
		fillStyle() {
			return {
				'background-color': 'black',
			}
		},
				baseStyle() {
			return {
				'background-color': 'green',
				'border-radius': '0%'
			}
		},
    },
	    hp2: {
        direction: LEFT,
        width: 400,
        height: 20,
        progress() { return Math.max(0, player.p.dmg.div(10)) },
		 instant: true,
		 		 unlocked() {
			 return (player.p.sl <= 0)
		 },
		 display() {
                return `Lv.2 | Particle Goblin ${format(player.p.gb)}/30 HP`
            },
		fillStyle() {
			return {
				'background-color': 'black'
			}
		},
				baseStyle() {
			return {
				'background-color': 'red'
			}
		},
    }
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
        done() { return (player.points.gte(300)) },
    },
	    1: {
        requirementDescription: "20 Minutes of playtime",
        effectDescription() {return "Check mod info for reward descriptions."},
        done() { return (player.points.gte(1200)) },
    },
			    2: {
        requirementDescription: "1 Hour of playtime",
        effectDescription() {return "Check mod info for reward descriptions."},
        done() { return (player.points.gte(3600)) },
    },
				    3: {
        requirementDescription: "2 Hours of playtime",
        effectDescription() {return "Check mod info for reward descriptions."},
        done() { return (player.points.gte(7200)) },
    },
					    4: {
        requirementDescription: "4 Hours of playtime",
        effectDescription() {return "Check mod info for reward descriptions."},
        done() { return (player.points.gte(14400)) },
    },
	},
									passiveGeneration() {			
return (player.points.gte(1)?1:0)
  },
    update(diff) {  

			  if (player.p.at > 0) player.p.at = Math.max(0,player.p.at - diff)	
					
			if (player.p.sl <= 0) player.p.rc = player.p.rc
       
   if (hasUpgrade("p", 14))
          return player.p.v = player.p.v.add(tmp.p.effect.times(diff));
	},
    layerShown(){return true}
})