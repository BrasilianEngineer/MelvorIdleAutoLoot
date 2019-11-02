var autoLootOptions = {
	gatherCombatLoot: false,
	eatCombatFood: false,
	eatThievingFood: false,
	autoRunTimer: 5
}
renderHeaderButton();

function runAutomationLoop() {
	eatCombatFoodIfNecessary();
	eatThievingFoodIfNecessary();
	gatherCombatLoot();
}

function eatCombatFoodIfNecessary() {
	if (!autoClickerOptions.eatCombatFood) return;
	
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

function eatThievingFoodIfNecessary() {
	if (!autoClickerOptions.eatThievingFood) return;
	
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

function gatherCombatLoot() {
if (!autoClickerOptions.gatherLoot) return;

	var container = $("#combat-loot-container");
	container.find("button").each(function () {
		$(this).click();
}

function renderHeaderButton() {
	if ($("#auto-loot-settings-button").length) return;
	
	var containerRef = $(".content-side ul.nav-main li.nav-main-heading:last");
	containerRef.appendBefore($("<li class=\"nav-main-item\">
		<a class=\"nav-main-link\" href=\"javascript:showAutoLootSettings();\">
			<img class=\"nav-img\" src=\"assets/media/main/question.svg\">
			<span class=\"nav-main-link-name\">AutoLoot Settings</span>
		</a>
	</li>"));
}

function showAutoLootSettings() {
	var container = $("#auto-loot-settings-container");
	if (!container.length) {
		container = renderAutoLootSettings();
	}
	container.show();
	syncSettingButtons();
}

function hideAutoLootSettings() {
	container.hide();
}

function toggleAutoLootSetting(sender) {
	var setting = $(sender).data("setting");
	var active = autoLootOptions[setting];
	active = !active;
	autoLootOptions[setting, active];
}

function syncSettingButtons() {
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

function renderAutoLootSettings() {
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
	].join();
	
	var container = $(html);
	$("#main-container").prepend(container);
	return container;
}
