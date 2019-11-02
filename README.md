# Melvor Idle AutoLoot

Adds a few auto loot / auto eat options to https://melvoridle.com/


# INSTALLATION:
Option 1:
Use a userscript manager (I use https://www.tampermonkey.net/)
Then install the script by opening this link and clicking install:
http://cdn.jsdelivr.net/gh/BrasilianEngineer/MelvorIdleAutoLoot@master/autoloot.user.js

Option 2:
Add a bookmark. 
Paste the following into the url field. 
javascript:(function(){var d=document,s=d.createElement('script');s.src='https://cdn.jsdelivr.net/gh/BrasilianEngineer/MelvorIdleAutoLoot@master/autoloot.user.js';d.body.appendChild(s);})();
Open Melvor Idle, then from the same tab open the bookmark.


# FEATURES:
Adds a link in the sidebar below Settings, called 'AutoLoot Settings'
There are currently 3 features you can turn on and off.
White background = off, Blue background = on.
By default everything is off.
1: The leather icon turns on Automatic Looting during combat.
2: The sword shrimp turns on Automatic Eating during combat.
3: The thief sardine turns on Automatic Eating during thieving.
The frequency is how often (in seconds) AutoLoot will run. Minimum value is once per second, maximum value is once every 300 seconds, default value is once every 5 seconds.
Nothing will happen until you click start.

The automatic eating functions will check whether you are missing enough health to maximize the selected food. (If you have shrimp selected, it will wait until you are missing 3 or more HP before eating). It will use whatever food type you have selected.

