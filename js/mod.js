let modInfo = {
	name: "One Layer Tree",
	id: "tabs tree",
	author: "Seder3214",
	pointsName: "",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.43",
	name: "One Layer Tree: Mega (Robots) Tab v2.00!",
}

let changelog = `<h1>Changelog:</h1><br> NO`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)
let dev = new Decimal(1)
if (player.p.buyables[11].gte(1)) dev = dev.times(buyableEffect("p", 11))
if (hasUpgrade("p", 53)) dev = dev.pow(upgradeEffect("p", 53))
	if (hasMilestone("p", 1)) dev = dev.times(2.2)
return dev	
	let gain = new Decimal(1)
		if (player.p.buyables[11].gte(1)) gain = gain.times(dev)	
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
"Current Endgame: 2 Time Ascensions"
]

// Determines when the game "ends"
function isEndgame() {
	return (player.p.buyables[11].gte(2))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}