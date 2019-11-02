var autoLoot = function() {
	
var autoLoopTimer;
var autoLootOptions = {
	gatherCombatLoot: false,
	eatCombatFood: false,
	eatThievingFood: false,
	autoRunTimer: 5
}
	
var runAutomationLoop = function () {
	eatCombatFoodIfNecessary();
	eatThievingFoodIfNecessary();
	gatherCombatLoot();
}

var eatCombatFoodIfNecessary = function () {
	if (!autoLootOptions.eatCombatFood) return;
	
	var hpCurrentLabel = $("#combat-player-hitpoints-current");
	var hpMaxLabel = $("#combat-player-hitpoints-max");
	var eatButton = $("#combat-food-container").find("button:first");
	var max = +hpMaxLabel.text();
	var current = +hpCurrentLabel.text();
	var foodText = eatButton.text();
	foodText = foodText.substr(foodText.indexOf("+") + 1);
	var food = +foodText.substr(0, foodText.length - 3);
	if (max - current >= food) {
		eatButton.click();
	}
}

var eatThievingFoodIfNecessary = function () {
	if (!autoLootOptions.eatThievingFood) return;
	
	var hpCurrentLabel = $("#thieving-player-hitpoints-current");
	var hpMaxLabel = $("#thieving-player-hitpoints-max");
	var eatButton = $("#thieving-food-container").find("button:first");
	var max = +hpMaxLabel.text();
	var current = +hpCurrentLabel.text();
	var foodText = eatButton.text();
	foodText = foodText.substr(foodText.indexOf("+") + 1);
	var food = +foodText.substr(0, foodText.length - 3);
	if (max - current >= food) {
		eatButton.click();
	}
}

var gatherCombatLoot = function () {
if (!autoLootOptions.gatherLoot) return;

	var container = $("#combat-loot-container");
	container.find("button").each(function () {
		$(this).click();
}

var renderHeaderButton = function () {
	if ($("#auto-loot-settings-button").length) return;
	
	var containerRef = $(".content-side ul.nav-main li.nav-main-heading:last");
	var html = [
	'<li class="nav-main-item">',
	'<a class="nav-main-link" href="javascript:showAutoLootSettings();">',
	'<img class="nav-img" src="assets/media/main/question.svg">',
	'<span class="nav-main-link-name">AutoLoot Settings</span>',
	'</a>',
	'</li>'
	].join("");
	containerRef.appendBefore($(html));
}

var showAutoLootSettings = function () {
	var container = $("#auto-loot-settings-container");
	if (!container.length) {
		container = renderAutoLootSettings();
	}
	container.show();
	syncSettingButtons();
}

var hideAutoLootSettings = function () {
	container.hide();
}

var toggleAutoLootSetting = function (sender) {
	var setting = $(sender).data("setting");
	var active = autoLootOptions[setting];
	active = !active;
	autoLootOptions[setting, active];
}

var syncSettingButtons = function () {
	$("#auto-loot-enabled-settings").find("button").each(function() {
		var btn = $(this);
		var active = autoLootOptions[btn.data("setting")];
		if (active) {
			btn.removeClass("btn-outline-primary").addClass("btn-primary");
		} else {
			btn.removeClass("btn-primary").addClass("btn-outline-primary");
		}
	});
}

var renderAutoLootSettings = function () {
	var html = [
'<div id="auto-loot-settings-container" style="display: none">',
'<div class="row row-deck">',
'<div class="col-md-12">',
'<div class="block block-rounded block-link-pop border-top border-settings border-4x">',
'<div class="block-content">',
'<h2 class="content-heading border-bottom mb-4 pb-2">Auto Loot Settings</h2>',
'<div class="row push">',
'<div class="col-3">',
'<p class="font-size-sm text-muted">Enabled Features</p>',
'</div>',
'<div class="col-9" id="auto-loot-enabled-settings">',
'<button type="button" data-setting="gatherCombatLoot" class="btn btn-outline-primary js-tooltip-enabled" onclick="toggleAutoLootSetting(this);" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="Gather all loot from Combat!"><img src="assets/media/bank/leather.svg" height="32px" width="32px"></button>',
'<button type="button" data-setting="eatCombatFood" class="btn btn-outline-primary js-tooltip-enabled" onclick="toggleAutoLootSetting(this);" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="Eat food to replenish your health during combat!"><img src="assets/media/bank/shrimp_cooked.svg" height="32px" width="32px"></button>',
'<button type="button" data-setting="eatThievingFood" class="btn btn-outline-primary js-tooltip-enabled" onclick="toggleAutoLootSetting(this);" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="Eat food to replenish your health during thieving!"><img src="assets/media/bank/sardine_cooked.svg" height="32px" width="32px"></button>',
'</div>',
'</div>',
'</div>',
'</div>',
'</div>',
'</div>',
'</div>'
	].join("");
	
	var container = $(html);
	$("#main-container").prepend(container);
	return container;
}
var startAutoLoop = function () {
	autoLoopTimer = setTimeout(runAutomationLoop, autoLootOptions.autoRunTimer * 1000);
}

renderHeaderButton();

}

autoLoot();
