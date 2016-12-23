lolDmgApp.directive('statusBar', function(){
  return {
    restrict: 'E',
    templateUrl: '/templates/pages/dmgSimulation/partial/championStatus/statusBar.html',
    scope: '='
  };
});

lolDmgApp.directive('championStatus', function(){
  return {
    restrict: 'E',
    templateUrl: '/templates/pages/dmgSimulation/championStatus.html',
    controller: 'ChampionStatusController',
    scope: {
      champions: '=',
      currentchampion: '=',
      items: '='
    }
  };
});

lolDmgApp.directive('championCollection', function() {
  return {
    restrict: 'E',
    templateUrl: '/templates/pages/dmgSimulation/partial/championStatus/championCollection.html',
    controller: 'ChampionCollectionController',
    scope: '='
  };
});

lolDmgApp.directive('item', function() {
  return {
    restrict: 'E',
    templateUrl: '/templates/pages/dmgSimulation/partial/championStatus/item.html',
    scope: '='
  }
});

lolDmgApp.directive('itemSet', function() {
  return {
    restrict: 'E',
    templateUrl: '/templates/pages/dmgSimulation/partial/championStatus/itemSet.html'
  }
});

lolDmgApp.directive('itemDisplay', function() {
  return {
    restrict: 'E',
    templateUrl: '/templates/pages/dmgSimulation/partial/championStatus/itemDisplay.html'
  }
});

lolDmgApp.directive('itemList', function() {
  return {
    restrict: 'E',
    templateUrl: '/templates/pages/dmgSimulation/partial/championStatus/itemList.html'
  }
});

lolDmgApp.directive('itemCategory', function() {
  return {
    restrict: 'E',
    templateUrl: '/templates/pages/dmgSimulation/partial/championStatus/itemCategory.html',
    scope: '='
  }
});

lolDmgApp.directive('itemDetail', function() {
  return {
    restrict: 'E',
    templateUrl: '/templates/pages/dmgSimulation/partial/championStatus/itemDetail.html',
    scope: '='
  }
});

lolDmgApp.directive('active', function() {
  return {
    restrict: 'E',
    templates: '<p class="text-info"></p>'
  }
});

lolDmgApp.directive('buildIntoItems', function() {
  return {
    restrict: 'E',
    templateUrl: '/templates/pages/dmgSimulation/partial/championStatus/buildIntoItems.html'
  }
});

lolDmgApp.directive('buildFromItems', function() {
  return {
    restrict: 'E',
    templateUrl: '/templates/pages/dmgSimulation/partial/championStatus/buildFromItems.html'
  }
});

lolDmgApp.directive('buildFromItemsDetailTd', function() {
  return {
    restrict: 'A',
    templateUrl: '/templates/pages/dmgSimulation/partial/championStatus/buildFromItemsDetailTd.html'
  }
});

lolDmgApp.directive('buildFromItemsDetailTr', function() {
  return {
    restrict: 'A',
    templateUrl: '/templates/pages/dmgSimulation/partial/championStatus/buildFromItemsDetailTr.html'
  }
});

lolDmgApp.directive('runes', function() {
  return {
    restrict: 'E',
    templateUrl: '/templates/pages/dmgSimulation/partial/championStatus/runes.html',
    scope: {}
  }
});

lolDmgApp.directive('masteries', function() {
  return {
    restrict: 'E',
    templateUrl: '/templates/pages/dmgSimulation/partial/championStatus/masteries.html',
    scope: {}
  }
});

lolDmgApp.directive('championSelected', function(){
  return {
    restrict: 'E',
    templateUrl: '/templates/pages/dmgSimulation/ChampionSelected.html',
    controller: 'ChampionSelectedController',
    scope: {
      champions: '=',
      currentchampion: '=currentchampion'
    }
  };
});


lolDmgApp.directive('championLevel', function() {
  return {
    restrict: 'E',
    templateUrl: '/templates/pages/dmgSimulation/partial/championSelected/championLevel.html'
  };
});

lolDmgApp.directive('championList', function() {
  return {
    restrict: 'E',
    templateUrl: '/templates/pages/dmgSimulation/partial/championSelected/championList.html',
    controller: 'ChampionListController'
  };
})

lolDmgApp.directive('championDisplay', function() {
  return {
    restrict: 'E',
    templateUrl: '/templates/pages/dmgSimulation/partial/championSelected/championDisplay.html'
  };
});

lolDmgApp.directive('championImage', function() {
  return {
    restrict: 'E',
    templateUrl: '/templates/pages/dmgSimulation/partial/championSelected/championImage.html'
  };
});

lolDmgApp.directive('championSkill', function() {
  return {
    restrict: 'E',
    templateUrl: '/templates/pages/dmgSimulation/partial/championSelected/championSkill.html',
    scope: '='
  };
});


lolDmgApp.directive('championSkillSet', function() {
  return {
    restrict: 'E',
    templateUrl: '/templates/pages/dmgSimulation/partial/championSelected/championSkillSet.html',
    controller: 'ChampionSkillSetController',
    scope: '='
  };
});

lolDmgApp.directive('damagePanel', function() {
  return {
    restrict: 'E',
    templateUrl: '/templates/pages/dmgSimulation/damagePanel.html',
    controller: 'DamgePanelController'
  };
});