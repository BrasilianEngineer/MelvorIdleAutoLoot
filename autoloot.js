// ==UserScript==
// @name         Melvor Idle Auto Loot
// @namespace    http://www.reddit.com/r/melvoridle
// @version      0.1.0
// @description  Melvor Idle Auto Loot for Melvor Idle v0.08.2
// @author       BrasilianEngineer
// @match        https://melvoridle.com/
// @grant        none
// @copyright   2019, BrasilianEngineer
// ==/UserScript==

(function() {
    'use strict';

    var game;
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

        autoLoopTimer = setTimeout(runAutomationLoop, autoLootOptions.autoRunTimer * 1000);
    }

    var eatCombatFoodIfNecessary = function () {
        if (!autoLootOptions.eatCombatFood) return;

        var eatButton = $("#combat-food-container").find("button:first");
        if (!eatButton.is(":visible")) return;


        var hpCurrentLabel = $("#combat-player-hitpoints-current");
        var hpMaxLabel = $("#combat-player-hitpoints-max");
        var max = +hpMaxLabel.text();
        var current = +hpCurrentLabel.text();
        var foodText = eatButton.text();
        foodText = foodText.substr(foodText.indexOf("+") + 1);
        var food = +foodText.substr(0, foodText.length - 3);
        if (max - current >= food) {
            console.log("Eating Attack Food");
            eatButton.click();
        }
    }

    var eatThievingFoodIfNecessary = function () {
        if (!autoLootOptions.eatThievingFood) return;

        var eatButton = $("#thieving-food-container").find("button:first");
        if (!eatButton.is(":visible")) return;

        var hpCurrentLabel = $("#thieving-player-hitpoints-current");
        var hpMaxLabel = $("#thieving-player-hitpoints-max");
        var max = +hpMaxLabel.text();
        var current = +hpCurrentLabel.text();
        var foodText = eatButton.text();
        foodText = foodText.substr(foodText.indexOf("+") + 1);
        var food = +foodText.substr(0, foodText.length - 3);
        if (max - current >= food) {
            console.log("Eating Thief Food");
            eatButton.click();
        }
    }

    var gatherCombatLoot = function () {
        if (!autoLootOptions.gatherLoot) return;

        var container = $("#combat-loot-container");
        container.find("button").each(function () {
            console.log("Gathering Loot!");
            $(this).click();
        });
    }

    var showAutoLootSettings = function () {
        var container = $("#auto-loot-settings-container");
        if (!container.length) {
            container = renderAutoLootSettings();
        }
        if (container.is(":visible")) {
            container.hide();
        } else {
            container.show();
            syncSettingButtons();
        }
    }

    var hideAutoLootSettings = function () {
        var container = $("#auto-loot-settings-container");
        container.hide();
    }

    var toggleAutoLootSetting = function () {
        var setting = $(this).data("setting");
        var active = autoLootOptions[setting];
        active = !active;
        autoLootOptions[setting] = active;
        if (active) {
            $(this).removeClass("btn-outline-primary").addClass("btn-primary");
        } else {
            $(this).removeClass("btn-primary").addClass("btn-outline-primary");
        }
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
        $("#auto-loot-run-count").val(autoLootOptions.autoRunTimer);
    }

    var renderAutoLootSettings = function () {
        var html = [
            '<div id="auto-loot-settings-container" style="display: none">',
            '<div class="row row-deck">',
            '<div class="col-md-12">',
            '<div class="block block-rounded block-link-pop border-top border-settings border-4x">',
            '<div class="block-content">',
            '<h2 class="content-heading border-bottom mb-4 pb-2">Auto Loot Settings <a class="float-right" href="javascript:void(0)" id="auto-loot-settings-close">X</a></h2>',

            '<div class="row push">',
            '<div class="col-3">',
            '<p class="font-size-sm text-muted">Enabled Features</p>',
            '</div>',
            '<div class="col-9" id="auto-loot-enabled-settings">',
            '<button type="button" data-setting="gatherCombatLoot" class="btn btn-outline-primary js-tooltip-enabled auto-loot-button" data-toggle="tooltip" data-html="true" data-placement="bottom" title="Gather all loot from Combat!"><img src="assets/media/bank/leather.svg" height="32px" width="32px"></button>',
            '<button type="button" data-setting="eatCombatFood" class="btn btn-outline-primary js-tooltip-enabled auto-loot-button" data-toggle="tooltip" data-html="true" data-placement="bottom" title="Eat food to replenish your health during combat!"><img src="assets/media/skills/combat/attack.svg" height="32px" width="32px"><img src="assets/media/bank/shrimp_cooked.svg" height="32px" width="32px"></button>',
            '<button type="button" data-setting="eatThievingFood" class="btn btn-outline-primary js-tooltip-enabled auto-loot-button" data-toggle="tooltip" data-html="true" data-placement="bottom" title="Eat food to replenish your health during thieving!"><img src="assets/media/skills/thieving/thieving.svg" height="32px" width="32px"><img src="assets/media/bank/sardine_cooked.svg" height="32px" width="32px"></button>',
            '</div>',
            '</div>',

            '<div class="row push">',
            '<div class="col-3">',
            '<p class="font-size-sm text-muted">Frequency</p>',
            '</div>',
            '<div class="col-3" id="auto-loot-enabled-settings">',
            '<div class="input-group">',
            '<input type="number" id="auto-loot-run-count" min="0" max="300" class="form-control">',
            '<div class="input-group-append">',
            '<button type="button" id="auto-loot-run-start" class="btn btn-primary">Start</button>',
            '</div>',
            '</div>',
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
        $(".auto-loot-button").on("click", toggleAutoLootSetting);
        $(".auto-loot-button").popover()
        $("#auto-loot-run-start").on("click", setRunTimerSetting);
        $("#auto-loot-settings-close").on("click", hideAutoLootSettings);
        return container;
    }

    var setRunTimerSetting = function () {
        var value = +$("#auto-loot-run-count").val();
        $("#auto-loot-run-start").text("Update");
        autoLootOptions.autoRunTimer = value;
        startAutoLoop();
    }

    var renderHeaderButton = function () {
        if ($("#auto-loot-settings-button").length) return;

        var containerRef = $(".content-side ul.nav-main li.nav-main-heading:last");

        var li = $('<li class="nav-main-item"></li>');
        containerRef.before(li);
        var button = $([
            '<a id="#auto-loot-settings-button" class="nav-main-link" href="javascript:void(0);">',
            '<img class="nav-img" src="assets/media/main/question.svg">',
            '<span class="nav-main-link-name">AutoLoot Settings</span>',
            '</a>'
        ].join(""));
        li.append(button);
        button.on("click", showAutoLootSettings);
    }

    var startAutoLoop = function () {
        if (autoLoopTimer) {
            clearTimeout(autoLoopTimer);
        }

        runAutomationLoop();
    }

    var loadTest = function() {
       if ($("#page-header-user-dropdown").length === 0 || !$("#page-header-user-dropdown").is(":visible")) {
           // Test if  game is already loaded or wait 2s and try again
            setTimeout(function(){
                loadTest();
            }, 2000);
           console.log("Game not loaded, waiting...");
       } else {
           // Game loaded, init auto loot
           console.log("Loaded, now rendering");
           renderHeaderButton();
        }
    }

    loadTest();
})();
