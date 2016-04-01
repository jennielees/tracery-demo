var abilityGrammar = {
	"pronoun": ["his", "her", "their"],
	"champSets": [
		"[champName:Draven][champPronoun:his][champWeapon:axes][champSummon:ego]",
		"[champName:Jax][champPronoun:his][champWeapon:lamp-post][champSummon:lamp-post]",
		"[champName:Illaoi][champPronoun:her][champWeapon:idol][champSummon:tentacles]",
		"[champName:Kindred][champPronoun:their][champWeapon:arrows][champSummon:spirits]"],
	"nounaction": ["unleashes", "smashes"],
	"weapon": ["hammer", "idol", "sword", "weapon", "crossbow"],
	"targetaction": ["bites", "leaps to", "knocks back", "blasts", "sends spirit energy toward"],
	"summonable": ["tentacle", "wave", "beam of energy", "wall"],
	"aoeeffect": ["knocking up nearby enemies", "stunning nearby enemies for $smallNums", "slowing nearby enemies by $percent%"],
	"targeteffect": ["knocking them up", "stunning them for $smallNums", "slowing them by $percent%", "silencing them for $smallNums"],
	"damage": ["magic", "physical", "true"],
	"damagetype": ["", "to enemies in a line", "to nearby enemies"],
	"ability": [
			   "#champName# #nounaction# #champPronoun# #champWeapon# at #champPronoun# target, dealing $number #damage# damage #damagetype#",
			   "#champName# #nounaction# #champPronoun# #champWeapon# at #champPronoun# target, dealing $number #damage# damage and #aoeeffect#",
			   "#champName# #nounaction# #champPronoun# #champWeapon# at #champPronoun# target, #targeteffect# and dealing $number #damage# damage #damagetype#",
			   "#champName# #nounaction# #champPronoun# #champWeapon# at #champPronoun# target, dealing $percent% of #champPronoun# health as #damage# damage #damagetype#",
			   "#champName# #nounaction# #champPronoun# #champWeapon# at #champPronoun# target, #targeteffect# and dealing $percent% of #champPronoun# health as #damage# damage #damagetype#",
			   "#champName# #targetaction# #champPronoun# target, #targeteffect# and dealing $number #damage# damage #damagetype#",
			   "#champName# #targetaction# #champPronoun# target, dealing $number #damage# damage #damagetype#",
			   "#champName# #targetaction# #champPronoun# target, dealing $number #damage# damage and #aoeeffect#",
			   "#champName# #targetaction# #champPronoun# target, #targeteffect# and dealing $percent% of their health as #damage# damage #damagetype#",
			   "#champName# #targetaction# #champPronoun# target, dealing $percent% of their health as #damage# damage #damagetype#",
			   "#champName# summons #champPronoun# #champSummon#, #aoeeffect# and dealing $number #damage# damage",
			   "#champName# summons #champPronoun# #champSummon#, dealing $number #damage# damage #damagetype#"],
	"origin": ["#[#champSets#]ability#"]
}

var summonerNameGrammar = {
	"adjective": ["Victorious", "Odoriferous", "Bearded", "Clumsy", "Genuine", "Elizabethan", "Destitute", "Grateful"],
	"colour": ["Blue", "Red", "Violet", "Cerise", "Silver", "Azure", "Magenta", "Mustard"],
	"animal": ["Tortoise", "Tyrannosaurus", "Cockroach", "Koala", "Lemur", "Quail"],
	"food": ["Sandwich", "Bacon", "Taco", "Gelato", "Coffee", "Fruit", "Pizza"],
	"name": ["#adjective##colour##animal#", "#colour##adjective##animal#",
			 "#adjective##colour##food#", "#colour##adjective##food#",
			 "#colour##animal##food#", "#adjective##animal##food#"]
}


$(document).ready(function() {

	function load() {
		genSummoner();
		genAbility();
	};

	// Need a wee timeout to make sure all the tracery stuff has loaded
	setTimeout(function() {
		load();
	}, 10);

	function genSummoner() {
		var summ = tracery.createGrammar(summonerNameGrammar);
		var summName = summ.flatten("#name#");
		console.log(summName);
		$("#sumName").append(summName);
	}

	function genAbility() {
		var abilityTrace = tracery.createGrammar(abilityGrammar);
		var ability = abilityTrace.flatten("#origin#");
		console.log(ability);

		// Fill in random numbers
		var randNum = Math.floor(Math.random() * 1000)+100;
		var randSmall = Math.floor(Math.random() * 5)+0.5;
		var randPercent = Math.floor(Math.random() * 100);

		ability = ability.replace("$number", randNum);
		ability = ability.replace("$smallNum", randSmall);
		ability = ability.replace("$percent", randPercent);
		ability = ability.replace("$percent", randPercent);
		ability = ability.trim();
		ability = ability + ".";

		$("#champAbility").append(ability);
	}


	$("#summonerToggle").click(function() {
		$("#summoner").toggle();
	});

	$("#abilityToggle").click(function() {
		$("#ability").toggle();
	});

	$("#generateSumButton").click(function() {
		$("#sumName").empty();
		genSummoner();
	});

	$("#generateAbilityButton").click(function() {
		$("#champAbility").empty();
		genAbility();
	});

});



