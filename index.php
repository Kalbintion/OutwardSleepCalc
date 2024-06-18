<?php
include("./lib/polyfill.php");

?>
<html>
<head>
	<title>Outward - Sleep Calculator</title>
	<link rel="stylesheet" href="css/main.css">
	<link rel="icon" type="image/x-icon" href="favicon.ico">
	<script src="./js/jquery-3.7.1.min.js"></script>
	<script src="./js/phpjs.js"></script>
	<script src="./js/main.js"></script>
</head>
<body>
	<div class="section calculator">
		<div class="calc--group">
			<div class="calc--header">Vitals</div>
			<div class="calc--group">
				<div class="calc--header">Health</div>
				<div class="calc--stat">Current: <input type="number" id="hp-cur" value="100" min="1" /></div>
				<div class="calc--stat">Max: <input type="number" id="hp-max" value="100" min="1" /></div>
			</div>
			<div class="calc--group">
				<div class="calc--header">Stamina</div>
				<div class="calc--stat">Current: <input type="number" id="stam-cur" value="100" min="1" /></div>
				<div class="calc--stat">Max: <input type="number" id="stam-max" value="100" min="1" /></div>
			</div>
		</div>
		<div class="calc--group">
			<div class="calc--header">Gear</div>
			<div class="calc--group">
				<div class="calc--header">Primary</div>
				<div class="calc--stat">Current: <input type="number" id="dur-mh-cur" value="0" min="0" /></div>
				<div class="calc--stat">Max: <input type="number" id="dur-mh-max" value="0" min="0" /></div>
			</div>
			<div class="calc--group">
				<div class="calc--header">Off-Hand</div>
				<div class="calc--stat">Current: <input type="number" id="dur-oh-cur" value="0" min="0" /></div>
				<div class="calc--stat">Max: <input type="number" id="dur-oh-max" value="0" min="0" /></div>
			</div>
			<div class="calc--group">
				<div class="calc--header">Head</div>
				<div class="calc--stat">Current: <input type="number" id="dur-head-cur" value="0" min="0" /></div>
				<div class="calc--stat">Max: <input type="number" id="dur-head-max" value="0" min="0" /></div>
			</div>
			<div class="calc--group">
				<div class="calc--header">Chest</div>
				<div class="calc--stat">Current: <input type="number" id="dur-chest-cur" value="0" min="0" /></div>
				<div class="calc--stat">Max: <input type="number" id="dur-chest-max" value="0" min="0" /></div>
			</div>
			<div class="calc--group">
				<div class="calc--header">Feet</div>
				<div class="calc--stat">Current: <input type="number" id="dur-feet-cur" value="0" min="0" /></div>
				<div class="calc--stat">Max: <input type="number" id="dur-feet-max" value="0" min="0" /></div>
			</div>
		</div>
		<div class="calc--group">
			<div class="calc--header">Skills</div>
			<div class="calc--group alt-grid">
				<div class="calc--header">Fitness</div>
				<div class="calc--stat">Learned? <input type="checkbox" id="skill-fitness" /></div>
			</div>
			<div class="calc--group alt-grid">
				<div class="calc--header">Fast Maintenance</div>
				<div class="calc--stat">Learned? <input type="checkbox" id="skill-fast-maintenance" /></div>
			</div>
			<div class="calc--group alt-grid">
				<div class="calc--header">Nightmares</div>
				<div class="calc--stat">Learned? <input type="checkbox" id="skill-nightmares" /></div>
			</div>
		</div>
	</div>
	<div class="section totals">
		<div class="totals--group">
			<div class="calc--sleep">Sleep:&nbsp;<span id="calc--sleep">0</span>&nbsp;hours</div>
		</div>
		<div class="totals--group">
			<div class="calc--repair">Repair:&nbsp;<span id="calc--repair">0</span>&nbsp;hours</div>
		</div>
		<div class="totals--group">
			<div class="calc--guard">Guard:&nbsp;<span id="calc--guard">0</span>&nbsp;hours</div>
		</div>
	</div>
	<div class="section tools">
		<div tabindex="0" role="button" class="tools-btn tools--quarter-vitals" title="Sets all vitals to half max.">Set Vitals 25%</div>
		<div tabindex="0" role="button" class="tools-btn tools--half-vitals" title="Sets all vitals to half max.">Set Vitals 50%</div>
		<div tabindex="0" role="button" class="tools-btn tools--three-quarter-vitals" title="Sets all vitals to half max.">Set Vitals 75%</div>
		<div tabindex="0" role="button" class="tools-btn tools--full-vitals" title="Sets all vitals to full max.">Set Vitals 100%</div>
		<div tabindex="0" role="button" class="tools-btn tools--percent-vitals" title="Sets all vitals to given percentage.">Set Vitals <input type="number" max="100" min="0" value="75" id="tools--percent-vitals-value">%</div>
	</div>
	<div class="section tools">
		<div tabindex="0" role="button" class="tools-btn tools--broken-gear" title="Sets all gear to no durability.">Set Gear 0%</div>
		<div tabindex="0" role="button" class="tools-btn tools--quarter-gear" title="Sets all gear to quarter durability.">Set Gear 25%</div>
		<div tabindex="0" role="button" class="tools-btn tools--half-gear" title="Sets all gear to half durability.">Set Gear 50%</div>
		<div tabindex="0" role="button" class="tools-btn tools--three-quarter-gear" title="Sets all gear to three quarter durability.">Set Gear 75%</div>
		<div tabindex="0" role="button" class="tools-btn tools--full-gear" title="Sets all gear to full durability.">Set Gear 100%</div>
		<div tabindex="0" role="button" class="tools-btn tools--percent-gear" title="Sets all vitals to given percentage.">Set Gear <input type="number" max="100" min="0" value="75" id="tools--percent-gear-value">%</div>
	</div>
	<div class="section tools">
		<div tabindex="0" role="button" class="tools-btn tools--clear" title="Resets calculator to defaults">Clear Values</div>
	</div>
	<div class="section footer"></div>
</body>
</html>