const RATES = {
	HP: 0.05,
	STAM: 0.125,
	MANA: 0.05,
	REPAIR: 0.1
}

const SKILLS = {
	FITNESS: RATES.HP * (1 + 0.2),
	FAST_MAINTENANCE: RATES.REPAIR * (1 + 0.5),
	NIGHTMARES_MANA: 0.25,
	NIGHTMARES_STAM: RATES.STAM * (1 - 0.25)
}

function calcSleepTime() {
	// Vitals
	let hpCur = Number($("#hp-cur").val());
	let hpMax = Number($("#hp-max").val());
	let stamCur = Number($("#stam-cur").val());
	let stamMax = Number($("#stam-max").val());
	
	// Gear
	let mhCur = Number($("#dur-mh-cur").val());
	let mhMax = Number($("#dur-mh-max").val());
	let ohCur = Number($("#dur-oh-cur").val());
	let ohMax = Number($("#dur-oh-max").val());
	let headCur = Number($("#dur-head-cur").val());
	let headMax = Number($("#dur-head-max").val());
	let chestCur = Number($("#dur-chest-cur").val());
	let chestMax = Number($("#dur-chest-max").val());
	let feetCur = Number($("#dur-feet-cur").val());
	let feetMax = Number($("#dur-feet-max").val());
	
	// Skills
	let skillFitness = document.getElementById("skill-fitness").checked;
	let skillFast = document.getElementById("skill-fast-maintenance").checked;
	let skillNightmare = document.getElementById("skill-nightmares").checked;
	
	// Sleep Calculation
	var sleep = 0;
	
	let hpRate = ((skillFitness) ? SKILLS.FITNESS : RATES.HP),
		hpDiff = hpMax - hpCur,
		hpPer = hpRate * hpMax,
		hpTime = hpDiff / hpPer;
	
	let stamRate = ((skillNightmare) ? SKILLS.NIGHTMARES_STAM : RATES.STAM),
		stamDiff = stamMax - stamCur,
		stamPer = stamRate * stamMax,
		stamTime = stamDiff / stamPer;
	
	hpTime = (isNaN(hpTime) ? 0 : hpTime);
	stamTime = (isNaN(stamTime) ? 0 : stamTime);
	
	sleep = Math.ceil(Math.max(hpTime, stamTime));
	
	// Repair Calculation
	var repair = 0;
	
	let mhRate = ((skillFast) ? SKILLS.FAST_MAINTENANCE : RATES.REPAIR),
		mhDiff = mhMax - mhCur,
		mhPer = mhRate * mhMax,
		mhTime = mhDiff / mhPer;

	let ohRate = ((skillFast) ? SKILLS.FAST_MAINTENANCE : RATES.REPAIR),
		ohDiff = ohMax - ohCur,
		ohPer = ohRate * ohMax,
		ohTime = ohDiff / ohPer;
	
	let headRate = ((skillFast) ? SKILLS.FAST_MAINTENANCE : RATES.REPAIR),
		headDiff = headMax - headCur,
		headPer = headRate * headMax,
		headTime = headDiff / headPer;
		
	let chestRate = ((skillFast) ? SKILLS.FAST_MAINTENANCE : RATES.REPAIR),
		chestDiff = chestMax - chestCur,
		chestPer = chestRate * chestMax,
		chestTime = chestDiff / chestPer;
		
	let feetRate = ((skillFast) ? SKILLS.FAST_MAINTENANCE : RATES.REPAIR),
		feetDiff = feetMax - feetCur,
		feetPer = feetRate * feetMax,
		feetTime = feetDiff / feetPer;
	
	mhTime = (isNaN(mhTime) ? 0 : mhTime);
	ohTime = (isNaN(ohTime) ? 0 : ohTime);
	headTime = (isNaN(headTime) ? 0 : headTime);
	chestTime = (isNaN(chestTime) ? 0 : chestTime);
	feetTime = (isNaN(feetTime) ? 0 : feetTime);
		
	repair = Math.ceil(Math.max(mhTime, ohTime, headTime, chestTime, feetTime));
	
	// Guard Calculation
	var guard = sleep + repair;
	
	// Display results
	$("#calc--sleep").text(sleep);
	$("#calc--repair").text(repair);
	$("#calc--guard").text(guard);
}

function setVitals(value) {
	setInputValues(["hp", "stam"], value);
	inputChanged();
}

function setGear(value) {
	setInputValues(["dur-mh", "dur-oh", "dur-head", "dur-chest", "dur-feet"], value);
	inputChanged();
}

function setInputValues(targets, percentage) {
	targets.forEach((v, k) => {
		console.log(v);
		let tarCur = $("#" + v + "-cur");
		let tarMax = $("#" + v + "-max");
		$(tarCur).val($(tarMax).val() * percentage);
	});
}

function inputChanged() {
	calcSleepTime();
	updateBuildURL();
}

function updateBuildURL() {
	var out = "";
	$("input[type=number]").each((k,v) => {
		var s = $(v);
		out += s.val() + "_";
	});
	$("input[type=checkbox]").each((k,v) => {
		out += (v.checked ? "1" : "0") + "_";
	});
	
	document.location.hash = "v1_" + out.slice(0, -1);
}

function loadBuildURL() {
	let skillHash = location.hash.replaceAll("#", "");
	if(skillHash == "")
		return;
	
	let skillCount = $("input").length;
	let buildVersion = skillHash.split("_")[0];
	let buildVersionNumber = buildVersion.replaceAll("v", "");
	let skillData = skillHash.split("_").slice(1);
	console.log("Loading", skillHash, skillHash.length, skillCount);
	
	var buildLoaders = {1: loadBuildV1};
	buildLoaders[buildVersionNumber](skillHash, buildVersion, skillData);
}

function loadBuildV1(skillHash, buildVersion, skillData) {
	let skillCount = $("input").length;
	
	if(buildVersion !== "v1") {
		console.error("Could not load build! Build version not supported.");
	}
	
	if(skillData.length > skillCount) {
		console.error("Could not load build! Data mismatch.");
		return;
	}
	
	// We're good to load
	let numInput = $("input[type=number]").length;
	$("input[type=number]").each((k, v) => {
		$(v).val(skillData[k]);
	});
	$("input[type=checkbox]").each((k, v) => {
		v.checked = (skillData[k + numInput] == 1 ? true : false);
	});
}

function genSafeName(name, lower = true) {
	if(lower) name = name.toLowerCase();
	name = name.str_replace([" ", "'"], ["_", "\\'"]);
	
	return name;
}

function updateBtnText() {
	if(window.innerWidth <= 580) {
		$(".tools--quarter-vitals").text("25%");
		$(".tools--half-vitals").text("50%");
		$(".tools--three-quarter-vitals").text("75%");
		$(".tools--full-vitals").text("100%");
		
		$(".tools--broken-gear").text("0%");
		$(".tools--quarter-gear").text("25%");
		$(".tools--half-gear").text("50%");
		$(".tools--three-quarter-gear").text("75%");
		$(".tools--full-gear").text("100%");
		$(".tools--percent-gear").html('<input type="number" max="100" min="0" value="75" id="tools--percent-gear-value">%');
	} else if(window.innerWidth <= 750) {
		$(".tools--quarter-vitals").text("25% Vit");
		$(".tools--half-vitals").text("50% Vit");
		$(".tools--three-quarter-vitals").text("75% Vit");
		$(".tools--full-vitals").text("100% Vit");
		
		$(".tools--broken-gear").text("0% Gear");
		$(".tools--quarter-gear").text("25% Gear");
		$(".tools--half-gear").text("50% Gear");
		$(".tools--three-quarter-gear").text("75% Gear");
		$(".tools--full-gear").text("100% Gear");
		$(".tools--percent-gear").html('<input type="number" max="100" min="0" value="75" id="tools--percent-gear-value">% Gear');
	} else {
		$(".tools--quarter-vitals").text("Set Vitals 25%");
		$(".tools--half-vitals").text("Set Vitals 50%");
		$(".tools--three-quarter-vitals").text("Set Vitals 75%");
		$(".tools--full-vitals").text("Set Vitals 100%");
		
		$(".tools--broken-gear").text("Set Gear 0%");
		$(".tools--quarter-gear").text("Set Gear 25%");
		$(".tools--half-gear").text("Set Gear 50%");
		$(".tools--three-quarter-gear").text("Set Gear 75%");
		$(".tools--full-gear").text("Set Gear 100%");
		$(".tools--percent-gear").html('Set Gear <input type="number" max="100" min="0" value="75" id="tools--percent-gear-value">%');
	}
}

$(function() {
	// Handlers
	$("input").on("change", inputChanged);
	$(".tools--quarter-vitals").click(() => { setVitals(0.25); });
	$(".tools--half-vitals").click(() => { setVitals(0.5); });
	$(".tools--three-quarter-vitals").click(() => { setVitals(0.75); });
	$(".tools--full-vitals").click(() => { setVitals(1); });
	$(".tools--broken-gear").click(() => { setGear(0); });
	$(".tools--quarter-gear").click(() => { setGear(0.25); });
	$(".tools--half-gear").click(() => { setGear(0.5); });
	$(".tools--three-quarter-gear").click(() => { setGear(0.75); });
	$(".tools--full-gear").click(() => { setGear(1); });
	
	$(".tools--percent-vitals").click(() => { setVitals($("#tools--percent-vitals-value").val() / 100); });
	$(".tools--percent-gear").click(() => { setGear($("#tools--percent-gear-value").val() / 100); });
	
	$(".tools--clear").click(() => {
		$("input[type=number]").each((k,v) => {
			$(v).val($(v).attr('value'));
		});
		$("input[type=checkbox]").each((k,v) => {
			v.checked = false;
		});
		inputChanged();
	})

	// Initialize Default Page Setup
	calcSleepTime();
	updateBtnText();
	
	// Build load handler
	window.onhashchange = loadBuildURL();
	
	// Resize event handler
	window.onresize = updateBtnText;
});