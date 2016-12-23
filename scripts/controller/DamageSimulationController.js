lolDmgApp.controller('DamageSimulationController', function($scope, RiotApi) {
  //$scope.currentchampion = {};
  RiotApi.getChampionList().then( function(response) {
    $scope.champions = response.data.data;
   // console.log($scope.champions);
  });

  RiotApi.getItemList().then( function(response) {
     $scope.items = response.data;
     $scope.displayitems = $scope.items;
     console.log($scope.items);
  });  
});

lolDmgApp.controller('CurrentChampionController', function($scope) {
  $scope.currentchampion = {};
});

lolDmgApp.controller('ChampionStatusController', function($scope){
  $scope.currentchampion.displaystats1 = [{}, {}, {}, {}, {}, {}, {}, {}];
  $scope.currentchampion.displaystats2 = [{}, {}, {}, {}, {}, {}, {}, {}];
  $scope.currentchampion.items = [{}, {}, {}, {}, {}, {}];

  $scope.DisplayStatus = function() {
    console.log($scope.champions);
    console.log($scope.currentchampion);
    //console.log($scope.champions[$scope.currentchampion.key].stats);
  };
});

lolDmgApp.controller('ChampionCollectionController', function($scope, $filter, RiotApi, ngDialog) {
  $scope.category = "";
  $scope.currentitem = {};
  $scope.view = "1";
  $scope.buildfromitemtree = [];
  $scope.selectedItemIndex = "";
  $scope.baseItemImageUrl = "https://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/"
  $scope.selectView = function(viewValue) {
    $scope.view = viewValue;
    //console.log($scope.view);
  };

  $scope.showItemDetail = function (item) {
    $scope.buildfromitemtree = getBuildFromItems(item, $scope.items);
    $scope.currentitem = item;
    //console.log(item);
  };

  //change current item with selected item from "Build into panel"
  $scope.showItemDetailWithID = function(item_id) {
    //console.log($scope.items.data[item_id]);
    $scope.currentitem = $scope.items.data[item_id];
    $scope.buildfromitemtree = getBuildFromItems($scope.currentitem, $scope.items);
  };

  // buy item from Items List
  $scope.buyItem = function(item) {
    var itemCapacity = 6;
    var itemAdded = false;
    for( var i = 0; i < itemCapacity && itemAdded === false; i++) {
      if(angular.equals({}, $scope.currentchampion.items[i])) {
        $scope.currentchampion.items[i] = item;
        itemAdded = true;
      }
    }
    if (itemAdded === false)
      $scope.buyitemerror = "Items are full";
  };

  // select item from champion itemset.
  $scope.selectChampionItem = function( item_index, item) {
    $scope.selectedItemIndex = item_index;
    $scope.currentitem = item;
    $scope.buildfromitemtree = getBuildFromItems($scope.currentitem, $scope.items);
    console.log(item);
  };

  // sell an item
  $scope.sellItem = function(item_index, item) {
    $scope.selectedItemIndex = "";
    $scope.currentitem = {};
    $scope.buildfromitemtree = {};
    $scope.currentchampion.items[item_index] = {};
    $scope.buyitemerror = "";
  };

  // get build-from-items tree for selected item
  // the output tree will looks like:
  // [[{item: item, colspan: colspan}],[],[]...]
  getBuildFromItems = function(item, items) {
    $scope.currentitem.buildFromItems = [];
    var itemStructure = [];
    var itemFromOutput = [];
    var itemFromStack = [];
    var maxspan = 1;    
    var currentLevelItemStructure = [];
    // Initial item from array
    itemFromOutput.push([item.id.toString()]);
    itemStructure.push([{"item": item, "colspan": 1}]);
    if(item.from){
      itemFromOutput.push(item.from);
      itemFromStack.push(item.from);
    //  $scope.currentitem.buildFromItems.push(item.from);
    }
    var itemsFromSameLevel = [];
    while(itemFromStack.length > 0) {
      var itemFrom = itemFromStack[0];
      var currentlevelspan = 0;

      itemFromStack.splice(0, 1);
      //console.log(itemFrom);
      itemsFromSameLevel = [];
      currentLevelItemStructure = [];
      for(var i = 0; i < itemFrom.length; i++) {
        //console.log(itemFrom[i]);

        //console.log(items.data[itemFrom[i]]);
        if(itemFrom[i].length > 0 && items.data[itemFrom[i]].from) {
          currentLevelItemStructure.push({"item": items.data[itemFrom[i]], "colspan": items.data[itemFrom[i]].from.length});
          currentlevelspan += items.data[itemFrom[i]].from.length;
          itemsFromSameLevel.push(items.data[itemFrom[i]].from);
        //  $scope.currentitem.buildFromItems.push(items.data[itemFrom[i]].from);
        }else {
          currentLevelItemStructure.push({"item": items.data[itemFrom[i]], "colspan": 1}); 
          currentlevelspan += 1;
          itemsFromSameLevel.push([]);
        }
      }

      itemStructure.push(currentLevelItemStructure);
      if(itemsFromSameLevel.join('') != '') {
        itemFromStack.push(itemsFromSameLevel.join().split(','));
      }
      if(currentlevelspan > maxspan)
        maxspan = currentlevelspan;
    }
    //console.log(itemFromOutput);
    itemStructure[0][0].colspan = maxspan;
    //console.log(itemStructure);
    //console.log($scope.currentitem.buildFromItems);
    return itemStructure;
  }

  // change display item base on item's category
  $scope.changeDisplayItems = function(category) {
    $scope.category = category;
    $scope.currentitem = {};
  };

  // check if this item available if Summoner's Rift
  $scope.summonerRiftItem = function( item ) {
    return item.gold.purchasable && item.tags != null; //item.maps["11"] && 
  };

  $scope.getItemList = function() {
    ngDialog.open({ 
      template: '/templates/pages/dmgSimulation/partial/championStatus/itemListPopup.html', 
      className: 'ngdialog-theme-default',
      scope: $scope,
      width: 950
    });    

  };
});

lolDmgApp.controller('ChampionSelectedController', function($scope, ngDialog, RiotApi){
  $scope.message = "this is champion selected controller.";
  //console.log($scope.currentchampion);

  $scope.resetLevel = function() {
    if($scope.currentchampion.level) {
      $scope.currentchampion.level = 1;
      updateStatsWithLevel($scope.currentchampion.displaystats1);
      updateStatsWithLevel($scope.currentchampion.displaystats2);      
    }
  };

  $scope.maxLevel = function() {
    if($scope.currentchampion.level) {
     $scope.currentchampion.level = 18;
      updateStatsWithLevel($scope.currentchampion.displaystats1);
      updateStatsWithLevel($scope.currentchampion.displaystats2);     
   }
  };

  $scope.upLevel = function() {
    if($scope.currentchampion.level < 18) {
      $scope.currentchampion.level += 1;
      updateStatsWithLevel($scope.currentchampion.displaystats1);
      updateStatsWithLevel($scope.currentchampion.displaystats2);
    }
  };

  $scope.downLevel = function() {
    if($scope.currentchampion.level > 1) {
      $scope.currentchampion.level -= 1;
      updateStatsWithLevel($scope.currentchampion.displaystats1);
      updateStatsWithLevel($scope.currentchampion.displaystats2);      
    }
  };

  // calculate new stats when champion level changes
  function updateStatsWithLevel(stats) {
    for(var i = 0; i < stats.length; i++) {
      stat = stats[i].name;
      statperlevel = stat + "perlevel";
     // console.log(statperlevel);      
      if($scope.champions[$scope.currentchampion.key].stats[statperlevel]){
        if(statperlevel === 'attackspeedperlevel') {
          base = 0.625/(1+$scope.champions[$scope.currentchampion.key].stats["attackspeedoffset"]);
          growth = base * $scope.champions[$scope.currentchampion.key].stats[statperlevel]/100;
        }
        else {
          base = $scope.champions[$scope.currentchampion.key].stats[stat];
          growth = $scope.champions[$scope.currentchampion.key].stats[statperlevel];
        }
      level = $scope.currentchampion.level;
      //calculate new stats base on formula  
      //newStatistic = b + g * (n - 1) * (0.685 + 0.0175 * n)
      //where b is base, g is growth, n is current level
      newstat = base + growth * (level - 1) * (0.685 + 0.0175 * level);
     //   console.log(newstat);
      stats[i].content = newstat.toFixed(3);
      }
    }
  };

  $scope.DisplayCurrentChampion = function() {
    console.log($scope.something);
    console.log($scope.currentchampion);
    console.log($scope.champions);
  };
  $scope.DisplayChampion = function() {

    //$scope.champions = $scope.championList.data;

    console.log($scope.message);
    ngDialog.open({ 
      template: '/templates/pages/dmgSimulation/partial/championSelected/championListPopup.html', 
      className: 'ngdialog-theme-default',
      //controller: ['$scope', function($scope) {
        //RiotApi.getChampionList().then(function(response){
        //console.log(response);
        //  $scope.champions = response.data.data;
       // });
      //}],
      scope: $scope,
      width: 850
    });
  };
});



lolDmgApp.controller('ChampionListController', function($scope) {
  $scope.baseImageUrl = "https://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/";
  $scope.currentchampion.loadingImage = "https://dummyimage.com/160x240/000/fff";
  $scope.baseLoadingImageUrl = "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/";
  //console.log($scope);
  // select champion from popup window, and set currentchampion stats(name, images, stats)
  $scope.selectChampion = function(champion_name, champion_key) {
    //console.log($scope.champions)
    //console.log($scope.champions);
    //console.log(champion_name);
    // console.log($scope.champions[champion_name]);
    //$scope.currentChampion = $scope.champions[champion_name];
    $scope.currentchampion.name = champion_name;
    $scope.currentchampion.key = champion_key;
    $scope.currentchampion.level = 1;
    $scope.currentchampion.loadingImage = $scope.baseLoadingImageUrl + champion_key + "_1.jpg";
    $scope.currentchampion.thumbnail = $scope.baseImageUrl + $scope.champions[champion_key].image.full;
    //console.log("current champion: " + $scope.currentChampion.name);
    formattedCurrentChampionStats($scope.champions[$scope.currentchampion.key].stats);
    $scope.closeThisDialog("closing champion selection");
  };

  // private function to get current champion stats
  function formattedCurrentChampionStats(stats) {
    var statsiconlocation = "/images/stats_icons/";
    $scope.currentchampion.displaystats1 = [];
    $scope.currentchampion.displaystats1.push({name: "hpregen", content: stats.hpregen, icon: statsiconlocation + "hpregen.png"});
    $scope.currentchampion.displaystats1.push({name: "mpregen", content: stats.mpregen, icon: statsiconlocation + "mpregen.png"});
    $scope.currentchampion.displaystats1.push({name: "armorpen", content: "0 | 0%", icon: statsiconlocation + "armorpen.png"});
    $scope.currentchampion.displaystats1.push({name: "magicpen", content: "0 | 0%", icon: statsiconlocation + "magicpen.png"});
    $scope.currentchampion.displaystats1.push({name: "lifesteal", content: "0", icon: statsiconlocation + "lifesteal.png"});
    $scope.currentchampion.displaystats1.push({name: "spellsteal", content: "0", icon: statsiconlocation + "spellsteal.png"});
    $scope.currentchampion.displaystats1.push({name: "attackrange", content: stats.attackrange, icon: statsiconlocation + "attackrange.png"});
    $scope.currentchampion.displaystats1.push({name: "tenacity", content: "0", icon: statsiconlocation + "tenacity.png"});

    $scope.currentchampion.displaystats2 = [];
    $scope.currentchampion.displaystats2.push({name: "attackdamage", content: stats.attackdamage, icon: statsiconlocation + "attackdamage.png"});
    $scope.currentchampion.displaystats2.push({name: "spelldamage", content: "0", icon: statsiconlocation + "spelldamage.png"});
    $scope.currentchampion.displaystats2.push({name: "armor", content: stats.armor, icon: statsiconlocation + "armor.png"});
    $scope.currentchampion.displaystats2.push({name: "spellblock", content: stats.spellblock, icon: statsiconlocation + "spellblock.png"});
    $scope.currentchampion.displaystats2.push({name: "attackspeed", content: (0.625/(1+stats.attackspeedoffset)).toFixed(3), icon: statsiconlocation + "attackspeed.png"});
    $scope.currentchampion.displaystats2.push({name: "cooldown", content: 0, icon: statsiconlocation + "cooldown.png"});
    $scope.currentchampion.displaystats2.push({name: "crit", content: stats.crit, icon: statsiconlocation + "crit.png"});
    $scope.currentchampion.displaystats2.push({name: "movespeed", content: stats.movespeed, icon: statsiconlocation + "movespeed.png"});
  }
});

lolDmgApp.controller('ChampionSkillSetController', function($scope) {
  $scope.skillSet = [
    {icon: 'https://dummyimage.com/30x30/000/fff', identify: 'Q'},
    {icon: 'https://dummyimage.com/30x30/000/fff', identify: 'W'},
    {icon: 'https://dummyimage.com/30x30/000/fff', identify: 'E'},
    {icon: 'https://dummyimage.com/30x30/000/fff', identify: 'R'}
  ];
});

lolDmgApp.controller('DamgePanelController', function($scope) {

});